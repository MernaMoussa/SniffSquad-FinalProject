import React, { useEffect, useState } from "react";
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
import { Snackbar, Stack } from "@mui/material";
import { baseUrl } from "../../../constants/baseurl";
import MessageDialog from "../invitation/MessageDialog";

const DogCard = ({ dog, owner }) => {
  const [dogPicture, setDogPicture] = useState(null);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    fetchDogPicture();
  }, [dog?.id]);

  const fetchDogPicture = async () => {
    try {
      const response = await fetch(`${baseUrl}/dogs/${dog.id}/photo`, {
        method: "GET",
        credentials: "include",
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch dog picture");
      }

      const data = await response.json();
      console.log(data);

      const photoUrl = data?.pictureUrl;
      console.log(photoUrl);
      setDogPicture(photoUrl);
    } catch (error) {
      console.error("Error fetching dog picture:", error);
    }
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={successMessage}
      />
      <Card key={dog?.id} sx={{ maxWidth: 250, minWidth: 250 }}>
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
          image={dogPicture}
          alt="Dog image"
        />
        <CardContent>
          <Typography variant="body2" fontWeight="bold" color="secondary.main">
            {dog?.name}
          </Typography>
          <Stack direction="column" spacing={1} sx={{ mt: 1 }}>
            <Typography variant="caption" color="neutral.dark">
              Gender: <strong>{dog?.gender}</strong>
            </Typography>
            <Typography variant="caption" color="neutral.dark">
              Size: <strong>{dog?.size}</strong>
            </Typography>
            <Typography variant="caption" color="neutral.dark">
              Age: <strong>{dog?.age}</strong>
            </Typography>
            <Typography variant="caption" color="neutral.dark">
              Energy Level: <strong>{dog?.energy_level}</strong>
            </Typography>
          </Stack>
        </CardContent>
        <CardActions disableSpacing style={{ justifyContent: "flex-end" }}>
          <IconButton
            aria-label="message"
            sx={{ color: "secondary.main" }}
            onClick={handleClickOpen}
          >
            <EmailOutlinedIcon />
          </IconButton>
        </CardActions>
      </Card>
      {open && (
        <MessageDialog
          handleClose={handleClose}
          open={open}
          dog={dog}
          owner={owner}
          setSuccessMessage={setSuccessMessage}
          setSnackbarOpen={setSnackbarOpen}
        />
      )}
    </>
  );
};

export default DogCard;
