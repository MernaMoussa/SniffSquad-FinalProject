import React from "react";
import bgHero from "../bg-img/bg-hero.png";
import { Container, Grid, Button, Typography } from "@mui/material";

const Hero = ({ handleClick }) => {
  return (
    <section style={heroStyle(bgHero)}>
      <Container maxWidth="xl" sx={{ pt: 12 }}>
        <Grid container>
          <Grid item>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <Typography variant="h1" sx={{ color: "primary.main" }}>
                  Dogs meet
                </Typography>
                <Typography variant="h1" sx={{ color: "primary.main" }}>
                  and owners Greet
                </Typography>
              </Grid>
              <Grid item>
                <Grid container item xs={12} sm={6}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "neutral.dark",
                    }}
                  >
                    Owning a pet brings boundless joy, a loyal companion, and a
                    constant source of happiness. With our diverse range of 200+
                    pets, find the ideal match for your furry friend today
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={5} sx={{ pt: 6 }}>
              <Grid item>
                <Button
                  variant="outlined"
                  sx={{
                    color: "primary.main",
                    borderColor: "primary.main",
                  }}
                  onClick={() => handleClick("login")}
                >
                  Login
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  sx={{ color: "white", bgcolor: "secondary.main" }}
                  onClick={() => handleClick("register")}
                >
                  Register Now
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Hero;

const heroStyle = (bgImage) => ({
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "500px",
  "@media (max-width: 768px)": {
    backgroundSize: "contain",
  },
});
