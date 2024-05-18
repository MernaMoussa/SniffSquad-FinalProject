import React from "react";
import {
  Container,
  Grid,
  Stack,
  Typography,
  Paper,
  useMediaQuery,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { OfferingsData } from "./OfferringsData";
import HappyDogs from "../../lotties/happy-dogs.json";
import Lottie from "react-lottie";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 300,
  height: 300,
  padding: theme.spacing(2),
  backgroundColor: "transparent",
  border: "solid 2px black",
  borderRadius: "20PX",
}));

const OfferingsContainer = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: HappyDogs,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <section>
      <Container
        maxWidth="xl"
        sx={{ minHeight: "100vh", alignContent: "center" }}
      >
        <Grid container justifyContent="center" spacing={4}>
          <Stack direction={isMdScreen ? "row" : "column"} spacing={12}>
            {OfferingsData.map((item, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <DemoPaper elevation={3}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      color: "secondary.main",
                      fontSize: "25px",
                      marginBottom: "16px",
                      textAlign: "center",
                    }}
                  >
                    {index + 1}. {item.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 3 }}>
                    {item.description}
                  </Typography>
                </DemoPaper>
              </Grid>
            ))}
          </Stack>
        </Grid>
        <Grid container justifyContent="center" spacing={4} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={6} md={6}>
            <Lottie options={defaultOptions} height={300} width={470} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Grid
              container
              direction={isMdScreen ? "row" : "column"}
              justifyContent={isMdScreen ? "space-evenly" : undefined}
              alignItems="center"
              sx={isMdScreen ? { minHeight: "300px" } : undefined}
            >
              <Typography
                variant="body1"
                gutterBottom
                sx={{
                  color: "secondary.main",
                  fontSize: "25px",
                  fontWeight: "bold",
                }}
              >
                Let's get started!
              </Typography>
              <Button
                variant="contained"
                sx={{
                  color: "white",
                  bgcolor: "glowEffect.main",
                }}
              >
                Register Now
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default OfferingsContainer;
