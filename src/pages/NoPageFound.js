import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Button, Container } from "@mui/material";

const NoPageFound = () => {
  return (
    <Container
      maxWidth="sm"
      style={{
        textAlign: "center",
        marginTop: "50px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Oops!
      </Typography>
      <Typography variant="h5" gutterBottom>
        No Page Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Button
        component={RouterLink}
        to="/"
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default NoPageFound;
