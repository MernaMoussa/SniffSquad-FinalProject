import React from "react";
import { Typography } from "@mui/material";

const ObjectiveTypography = ({ index, title, description }) => {
  return (
    <>
      <Typography
        variant="h3"
        sx={{
          color: "secondary.main",
          fontSize: "25px",
          marginBottom: "16px",
        }}
      >
        {index}. {title}
      </Typography>
      <Typography variant="body1" color="neutral.darker">
        {description}
      </Typography>
    </>
  );
};

export default ObjectiveTypography;
