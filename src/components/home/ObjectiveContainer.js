import React, { useEffect, useRef, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import communicateDog from "../../bg-img/communicate-dog.png";
import ObjectiveTypography from "./ObjectiveTypography";
import { ObjectiveData } from "./ObjectivesData";
//import PawLottie from "../../lotties/paw.json";
//import Lottie from "react-lottie";

const ObjectiveContainer = () => {
  /* const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: PawLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };*/
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const imgElement = imgRef.current;
      const containerOffset = imgElement.offsetTop;
      const scrollPosition = window.scrollY + window.innerHeight;
      if (scrollPosition > containerOffset && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      const imgElement = imgRef.current;
      imgElement.classList.add("slide-in");
    }
  }, [isVisible]);

  return (
    <section>
      <Container
        maxWidth="xl"
        sx={{ minHeight: "100vh", alignContent: "center" }}
      >
        <Grid container justifyContent="center" spacing={4}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid
              container
              sx={{ mt: 4 }}
              justifyContent="center"
              alignItems="center"
            >
              <Typography
                variant="h2"
                sx={{
                  textAlign: "center",
                  color: "neutral.light",
                  fontSize: "25px",
                  fontWeight: "bold",
                  bgcolor: "glowEffect.main",
                  padding: "20px",
                  width: "300px",
                  border: "solid 3px black",
                  borderRadius: "20px",
                }}
              >
                Our Objectives
              </Typography>
            </Grid>
            <Grid container sx={{ px: 4, py: 4 }}>
              <Typography variant="body1" color="neutral.lighter">
                At SniffSquad, we're all about enhancing your experience,
                prioritizing safety, and growing our vibrant community of dog
                lovers. Here's how we're doing it:
              </Typography>
              {ObjectiveData.map((item, index) => (
                <Grid item key={index} xs={12} sm={12} md={12} sx={{ mt: 5 }}>
                  <div style={{ display: "block" }}>
                    <ObjectiveTypography
                      index={index + 1}
                      title={item.title}
                      description={item.description}
                    />
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <img
              ref={imgRef}
              src={communicateDog}
              alt="communicate dog"
              style={{
                width: "100%",
                borderRadius: "20px",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default ObjectiveContainer;
