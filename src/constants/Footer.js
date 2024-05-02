import React from "react";
import { Container, Typography } from "@mui/material";

const Footer = () => {
  const containerStyle = {
    textAlign: "center",
    bottom: 0,
    width: "100%",
    paddingTop: "1rem",
  };

  return (
    <footer
      style={{ backgroundColor: "#4caf50", color: "#fff", ...containerStyle }}
    >
      <Container>
        <Typography variant="body2">
          &copy; 2024 Your Website. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
