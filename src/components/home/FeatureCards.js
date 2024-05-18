import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function FeatureCards({ title, description, imgSrc, imgAlt }) {
  return (
    <Card sx={{ maxWidth: 340, minHeight: 300, bgcolor: "transparent.main" }}>
      <CardActionArea sx={{ maxWidth: 340, minHeight: 300 }}>
        <CardMedia
          component="img"
          image={imgSrc}
          alt={imgAlt}
          style={{ width: "100%", height: "140px", objectFit: "contain" }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              color: "secondary.main",
              textAlign: "center",
            }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="neutral.darker">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
