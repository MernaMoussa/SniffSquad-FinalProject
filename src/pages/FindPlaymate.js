import React, { useContext } from "react";
import bgHero from "../bg-img/bg-hero.png";
import { Container, Grid, Button, Typography } from "@mui/material";
import DogFilterContainer from "../components/DogFilterContainer";
import { UserContext } from "../context/UserProvider";

const FindPlaymate = ({ handleClick }) => {
  const { user } = useContext(UserContext);

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
