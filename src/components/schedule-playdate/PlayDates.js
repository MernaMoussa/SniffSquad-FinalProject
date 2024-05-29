import React, { useContext, useEffect, useRef, useState } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import { baseUrl } from "../../constants/baseurl";
import { formatDate } from "./formateDate.utility";
import { Snackbar, Typography } from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { UserContext } from "../../context/UserProvider";

function PlayDates() {
  const { user } = useContext(UserContext);
  const calendarRef = useRef(null);
  const [allUsersExceptReq, setAllUsersExceptReq] = useState([]);
  const [playdates, setPlaydates] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const userEvents = playdates;

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllUsersExceptReq();
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserPlaydates();
    };

    fetchData();
  }, []);

  const fetchUserPlaydates = async () => {
    try {
      const response = await fetch(`${baseUrl}/playdates`, {
        method: "GET",
        credentials: "include",
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to fetch user's playdates");
      }

      const playdates = await response.json();
      if (playdates?.length === 0) {
        console.log("User doesn't have any playdates.");
        setPlaydates([]);
        return;
      }
      const playdatesWithParticipants = await Promise.all(
        playdates.map(async (playdate) => {
          const playdateId = playdate?.id;
          const participantResponse = await fetch(
            `${baseUrl}/playdates/${playdateId}`,
            {
              method: "GET",
              credentials: "include",
            }
          );

          if (!participantResponse.ok) {
            throw new Error(
              `Failed to fetch participants for playdate ${playdateId}`
            );
          }

          const { playdate: updatedPlaydate, otherParticipant } =
            await participantResponse.json();
          return { ...updatedPlaydate, otherParticipant };
        })
      );

      console.log("Playdates with participants:", playdatesWithParticipants);

      const formattedData = playdatesWithParticipants.map((playdateData) =>
        formatDate(playdateData)
      );

      setPlaydates(formattedData);
    } catch (error) {
      console.error("Error fetching Playdates:", error);
    }
  };

  const fetchAllUsersExceptReq = async () => {
    try {
      const userResponse = await fetch(`${baseUrl}/users/except-requester`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await userResponse.json();
      console.log(userData);
      const options = userData?.map((user) => {
        return {
          admin_id: user.id,
          email: `${user.email || ""}`,
        };
      });
      setAllUsersExceptReq(options);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleConfirm = async (event, action) => {
    console.log("handleConfirm =", action, event.title);
    return new Promise((res, rej) => {
      if (action === "edit") {
        fetch(`${baseUrl}/playdates/${event.event_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to edit event");
            }
            return response.json();
          })
          .then((data) => {
            res({
              ...event,
              ...data,
              event_id: event.event_id,
            });
          })
          .catch((error) => {
            console.error("Error editing event:", error);
            rej("Ops... Failed");
          });
      } else if (action === "create") {
        const InvitationFormat = {
          content: event?.title,
          date: event?.start?.toDateString(),
          time: event?.start?.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        fetch(`${baseUrl}/${event?.admin_id}/send-invitation`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(InvitationFormat),
          credentials: "include",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to send invitation");
            }
            setSuccessMessage("Invitation sent successfully");
            setSnackbarOpen(true);
            res({
              ...event,
            });
          })
          .catch((error) => {
            console.error("Error sending invitation:", error);
            rej("Ops... Failed");
          });
      }
    });
  };

  const handleDelete = async (deletedId) => {
    try {
      const response = await fetch(`${baseUrl}/playdates/${deletedId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete playdate");
      }
      return new Promise((res, rej) => {
        setTimeout(() => {
          res(deletedId);
        }, 3000);
      });
    } catch (error) {
      console.error("Error deleting playdate:", error);
      throw error;
    }
  };

  return (
    <>
      {allUsersExceptReq.length > 0 && (
        <>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message={successMessage}
          />
          <Scheduler
            ref={calendarRef}
            events={userEvents}
            onDelete={handleDelete}
            onConfirm={handleConfirm}
            fields={[
              {
                name: "admin_id",
                type: "select",
                options: allUsersExceptReq.map((option) => ({
                  id: option.admin_id,
                  text: option.email,
                  value: option.admin_id,
                })),
                config: { label: "Participant", required: true },
              },
              {
                name: "location",
                type: "input",
                config: { label: "Location", required: true },
              },
            ]}
            viewerExtraComponent={(fields, event) => {
              return (
                <div>
                  {fields.map((field, i) => {
                    if (field.name === "admin_id") {
                      const admin = field.options.find(
                        (fe) => fe.id === event.admin_id
                      );
                      return (
                        <Typography
                          key={i}
                          style={{ display: "flex", alignItems: "center" }}
                          color="textSecondary"
                          variant="caption"
                          noWrap
                        >
                          <PersonRoundedIcon /> {admin.text}
                        </Typography>
                      );
                    } else {
                      return "";
                    }
                  })}
                </div>
              );
            }}
          />
        </>
      )}
    </>
  );
}

export default PlayDates;
