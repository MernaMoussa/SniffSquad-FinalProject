import React, { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Box,
  Button,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { baseUrl } from "./baseurl";
import { formatNotificationDate } from "../components/schedule-playdate/formateDate.utility";

export default function Notification() {
  const [Badge, setBadge] = useState(null);
  const [userNotifications, setUserNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function fetchUserNotifications() {
    try {
      const response = await fetch(`${baseUrl}/send-invitation`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user's notifications data");
      }

      const userNotificationsdata = await response.json();

      if (userNotificationsdata.length !== 0) {
        const notificationsWithSenderNames = await Promise.all(
          userNotificationsdata.map(async (notification) => {
            try {
              const senderResponse = await fetch(
                `${baseUrl}/users/${notification.SenderId}`,
                {
                  method: "GET",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  credentials: "include",
                }
              );

              if (!senderResponse.ok) {
                throw new Error("Failed to fetch sender's name");
              }

              const senderData = await senderResponse.json();
              const senderName = `${senderData.first_name} ${senderData.last_name}`;

              return { ...notification, senderName };
            } catch (error) {
              console.error("Error fetching sender's name:", error);
              return { ...notification, senderName: "Unknown" };
            }
          })
        );

        setUserNotifications(notificationsWithSenderNames);
        console.log(notificationsWithSenderNames);
      }
    } catch (error) {
      console.error("Error fetching user's notifications data:", error);
    }
  }

  useEffect(() => {
    fetchUserNotifications();
  }, []);

  return (
    <>
      <IconButton
        aria-label="notification"
        id="notification-button"
        aria-controls={open ? "notification-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <StyledBadge
          badgeContent={userNotifications?.length}
          sx={{ color: "primary.main" }}
        >
          <NotificationsIcon sx={{ color: "primary.main" }} />
        </StyledBadge>
      </IconButton>
      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "notification-button",
        }}
      >
        {userNotifications.map((userNotification) => (
          <Box marginTop={4} marginBottom={4} key={userNotification?.id}>
            <MenuItem onClick={handleClose}>
              <Typography variant="subtitle2" color="neutral.dark">
                <strong>{userNotification?.senderName} .</strong>
              </Typography>
              <Typography variant="body2" color="textPrimary">
                invited you to a playdate:
                {userNotification?.content}
              </Typography>
              <Grid container justifyContent="space-between">
                <Grid item xs={3}>
                  <div>
                    <Typography variant="caption" color="neutral.dark">
                      <strong>
                        {formatNotificationDate(userNotification?.date)}
                      </strong>
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="caption" color="neutral.dark">
                      <strong>{userNotification?.time}</strong>
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </MenuItem>
            <Grid container spacing={5} justifyContent="center">
              <Grid item>
                <Button
                  variant="outlined"
                  sx={{
                    color: "primary.main",
                    borderColor: "primary.main",
                    fontSize: "12px",
                  }}
                  onClick={() => handleClick("login")}
                >
                  Reject
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  sx={{
                    color: "white",
                    bgcolor: "secondary.main",
                    fontSize: "12px",
                  }}
                  onClick={() => handleClick("register")}
                >
                  Confirm
                </Button>
              </Grid>
            </Grid>
            <br />
            <Divider />
          </Box>
        ))}
      </Menu>
    </>
  );
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
