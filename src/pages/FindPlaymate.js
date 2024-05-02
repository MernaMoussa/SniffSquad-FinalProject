import React, { useContext, useEffect, useState } from "react";
import bgHero from "../bg-img/bg-hero.png";
import { Container, Grid, Button, Typography } from "@mui/material";
import { UserContext } from "../context/UserProvider";
import DogFilterContainer from "../components/playmate/filter/DogFilterContainer";
import DogList from "../components/playmate/display/DogList";
import { baseUrl } from "../constants/baseurl";

const FindPlaymate = ({ handleClick }) => {
  const { user } = useContext(UserContext);
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetchDogsData();
  }, []);

  async function fetchDogsData() {
    try {
      const response = await fetch(`${baseUrl}/dogs`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch dog data");
      }

      const data = await response.json();
      setDogs(data);
    } catch (error) {
      console.error("Error fetching dog data:", error);
    }
  }

  return (
    <>
      <section style={heroStyle(bgHero)}>
        <Container maxWidth="xl" sx={{ pt: 12 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h1" sx={{ color: "primary.main" }}>
                Welcome {user?.first_name} {user?.last_name}
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
        <Container maxWidth="xl">
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="stretch"
            style={{ minHeight: "100%" }}
          >
            <Grid item xs={12} md={4} lg={3}>
              <DogFilterContainer />
            </Grid>
            <Grid item xs={12} md={8} lg={9} justifyContent="center">
              <DogList dogs={dogs} />
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
};

export default FindPlaymate;

const heroStyle = (bgImage) => ({
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "500px",
  "@media (maxWidth: 768px)": {
    backgroundSize: "contain",
  },
});
