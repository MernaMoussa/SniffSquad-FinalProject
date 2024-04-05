import React, { useEffect, useState } from "react";
import bgHero from "../bg-img/bg-hero.png";
import { useParams } from "react-router-dom";
import { Container, Grid, Button, Typography } from "@mui/material";
import { baseUrl } from "../constants/baseurl";
import DogFilterContainer from "../components/DogFilterContainer";

const Profile = ({ handleClick }) => {
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
    <>
      <section style={heroStyle(bgHero)}>
        <Container maxWidth="xl" sx={{ pt: 12 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h1" sx={{ color: "primary.main" }}>
                Welcome {profileData?.firstName} {profileData?.lastName}
              </Typography>
              <Typography variant="body1" sx={{ color: "neutral.dark", pt: 2 }}>
                Ready to find a new playmate for your furry friend?
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  color: "primary.main",
                  borderColor: "primary.main",
                  mt: 3,
                }}
                onClick={() => handleClick("login")}
              >
                Schedule Playdate
              </Button>
            </Grid>
          </Grid>
        </Container>
      </section>
      <section>
        <Container>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="stretch"
            style={{ height: "100%" }}
          >
            <Grid item xs={12} md={6} lg={5}>
              <DogFilterContainer />
            </Grid>
            <Grid item xs={12} md={6} lg={7}>
              hi
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
};

export default Profile;

const heroStyle = (bgImage) => ({
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "500px",
  "@media (max-width: 768px)": {
    backgroundSize: "contain",
  },
});
