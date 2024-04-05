import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { baseUrl } from "../constants/baseurl";

const Profile = () => {
  const { userId } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${baseUrl}/profile`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        console.log("API response:", response);

        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("An unexpected error occurred");
      }
    };

    fetchProfileData();
  }, [userId]);

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4">Profile</Typography>
      <Typography variant="body1">
        Name: {profileData?.firstName} {profileData?.lastName}
      </Typography>
      <Typography variant="body1">Email: {profileData?.email}</Typography>
    </Container>
  );
};

export default Profile;
