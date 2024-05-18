import React, { Fragment, useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import { Scheduler } from "@aldabil/react-scheduler";
import { RESOURCES, EVENTS } from "./data";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

function Copy() {
  const calendarRef = useRef(null);

  const [allUsersExceptReq, setAllUsersExceptReq] = useState([]);

  useEffect(() => {
    const fetchUserPlaydates = async () => {
      try {
        const options = RESOURCES.map((res) => ({
          admin_id: res.admin_id,
          title: res.title,
          mobile: res.mobile,
        }));
        console.log("options:", options);

        setAllUsersExceptReq(options);
        console.log("allUsersExceptReq after set:", allUsersExceptReq);
      } catch (error) {
        console.error("Error fetching user playdates:", error);
      }
    };

    fetchUserPlaydates();
  }, []);

  return (
    <Fragment>
      {allUsersExceptReq.length > 0 && (
        <Scheduler
          ref={calendarRef}
          events={EVENTS}
          fields={[
            {
              name: "admin_id",
              type: "select",
              options: allUsersExceptReq.map((res) => ({
                id: res.admin_id,
                text: `${res.title} (${res.mobile})`,
                value: res.admin_id,
              })),
              config: { label: "Assignee", required: true },
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
    </Fragment>
  );
}

export default Copy;
