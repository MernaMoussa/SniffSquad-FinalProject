import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import FeatureCards from "./FeatureCards";
import twinDog from "../../bg-img/twin-dog.png";
import tripleDog from "../../bg-img/triple-dog.png";
import handPaw from "../../bg-img/hand-paw.png";
import pawCalender from "../../bg-img/paw-calender.png";

const FeatureContainer = () => {
  return (
    <section>
      <Container
        maxWidth="xl"
        sx={{ minHeight: "100vh", alignContent: "center" }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "secondary.main",
            fontSize: "25px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Discover What Awaits You
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "neutral.dark",
            textAlign: "center",
          }}
        >
          Your Journey with SniffSquad Begins Here!
        </Typography>
        <Grid
          container
          justifyContent="center"
          spacing={2}
          sx={{ mt: 4, display: "flex", flexWrap: "wrap" }}
        >
          <Grid item xs={12} sm={6} md={2}>
            <FeatureCards
              title="WoofLink"
              description="
              Facilitating seamless connections between 
              dogs and their human companions."
              imgSrc={handPaw}
              imgAlt="hand and paw img"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FeatureCards
              title="PupSocial"
              description="Enhancing the social experience for dogs, 
              elevating their interactions to new heights."
              imgSrc={twinDog}
              imgAlt="twin dog"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FeatureCards
              title="PlaydatePro"
              description="Streamlining the process of arranging playdates, making it easier than ever before."
              imgSrc={pawCalender}
              imgAlt="paw calender"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FeatureCards
              title="CanineCommunity"
              description="Cultivating a sense of belonging and camaraderie within the dog-loving community."
              imgSrc={tripleDog}
              imgAlt="triple dog"
            />
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default FeatureContainer;
