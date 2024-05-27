import React, { useEffect, useRef, useState } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import { baseUrl } from "../../constants/baseurl";
import { formatDate } from "./formateDate.utility";
import { Typography } from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

function PlayDates() {
  const calendarRef = useRef(null);
  const [allUsersExceptReq, setAllUsersExceptReq] = useState([]);
  const [playdates, setPlaydates] = useState([]);
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
      console.log("Playdates:", playdates);
      const playdatesWithParticipants = await Promise.all(
        playdates.map(async (playdate) => {
          const playdateId = playdate.id;
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

  const handleDelete = async (deletedId) => {
    try {
      const response = await fetch(`${baseUrl}/playdates/${deletedId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete playdate");
      }

      setPlaydates((prevPlaydates) =>
        prevPlaydates.filter((playdate) => playdate.id !== deletedId)
      );

      return deletedId;
    } catch (error) {
      console.error("Error deleting playdate:", error);
      throw error;
    }
  };

  return (
    <>
      {allUsersExceptReq.length > 0 && (
        <Scheduler
          ref={calendarRef}
          events={userEvents}
          onDelete={handleDelete}
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
      )}
    </>
  );
}

export default PlayDates;
