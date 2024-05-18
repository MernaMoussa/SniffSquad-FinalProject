import React from "react";
import { Container, Grid, Typography, useMediaQuery } from "@mui/material";

const Footer = () => {
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <footer>
      <Container
        maxWidth="xl"
        sx={{
          minHeight: "30vh",
          alignContent: "center",
          bgcolor: "secondary.soft",
        }}
      >
        <Grid
          container
          direction={isMdScreen ? "row" : "column"}
          justifyContent={isMdScreen ? "space-around" : undefined}
          spacing={isMdScreen ? undefined : 2}
          sx={{ paddingLeft: isMdScreen ? "30px" : undefined }}
        >
          <Grid item xs={12} sm={8} md={8}>
            <Grid
              container
              direction={isMdScreen ? "row" : "column"}
              spacing={isMdScreen ? 4 : 2}
            >
              <Grid item xs={12} sm={4}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Our Address
                </Typography>
                <Typography variant="body2">22 examplestrasse,</Typography>
                <Typography variant="body2">Bern,</Typography>
                <Typography variant="body2">CH</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Openning Hours
                </Typography>
                <Typography variant="body2">24/7</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Contact Info.
                </Typography>
                <Typography variant="body2">Phone: 000-000-0000</Typography>
                <Typography variant="body2">Email: info@example.ch</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography variant="body2">
              &copy; 2024 Your Website. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
