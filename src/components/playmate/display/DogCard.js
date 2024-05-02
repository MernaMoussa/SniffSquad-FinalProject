import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Stack } from "@mui/material";

const DogCard = ({ dog, owner }) => {
  return (
    <Card key={dog?.id} sx={{ minWidth: 250 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="owner">
            {owner?.first_name.charAt(0)}
          </Avatar>
        }
        title={`${owner?.first_name} ${owner?.last_name}`}
        subheader={`${owner?.address?.street}, ${owner?.address?.city}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={dog?.pictureUrl}
        alt="Dog image"
      />
      <CardContent>
        <Typography
          variant="body2"
          fontWeight="bold"
          sx={{ color: "primary.main" }}
        >
          {dog?.name}
        </Typography>
        <Stack direction="column" spacing={1} sx={{ mt: 1 }}>
          <Typography variant="caption" sx={{ color: "neutral.dark" }}>
            Gender: <strong>{dog?.gender}</strong>
          </Typography>
          <Typography variant="caption" sx={{ color: "neutral.dark" }}>
            Size: <strong>{dog?.size}</strong>
          </Typography>
          <Typography variant="caption" sx={{ color: "neutral.dark" }}>
            Age: <strong>{dog?.age}</strong>
          </Typography>
          <Typography variant="caption" sx={{ color: "neutral.dark" }}>
            Energy Level: <strong>{dog?.energy_level}</strong>
          </Typography>
        </Stack>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="message">
          <EmailOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default DogCard;
