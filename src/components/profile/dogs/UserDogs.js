import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  IconButton,
  Button,
  Divider,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadButton from "../UploadButton";
import { baseUrl } from "../../../constants/baseurl";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  ageOptions,
  energyLevelOptions,
  genderOptions,
  sizeOptions,
} from "../../../common/DogOptions";
import SuccessMessage from "../../../constants/SuccessMessage";

const UserDogs = ({
  dog,
  editDogMode,
  handleEditDog,
  handleDeleteDog,
  setEditDogMode,
  addMode,
  setAddMode,
}) => {
  const [dogData, setDogData] = useState({});
  const [dogPicture, setDogPicture] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);

  useEffect(() => {
    if (addMode) {
      setDogData({
        name: "",
        breed: "",
        gender: "",
        age: "",
        energy_level: "",
        size: "",
      });
    } else {
      setDogData({ ...dog });
    }
  }, [addMode]);

  useEffect(() => {
    if (!addMode) {
      fetchDogPicture();
    }
  }, [dogData?.id]);

  const fetchDogPicture = async () => {
    try {
      const response = await fetch(`${baseUrl}/dogs/${dog?.id}/photo`, {
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

  const handleEdit = () => {
    setEditDogMode(dog?.id);
    handleEditDog(dog?.id);
  };

  const openDialog = () => {
    setOpen(true);
  };

  const handelDelete = () => {
    handleDeleteDog(dog?.id);
    setOpen(false);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSave = () => {
    handleSaveDog(dog?.id);
  };

  const handleDogChange = (e) => {
    const { name, value } = e.target;
    setDogData((prevDog) => ({
      ...prevDog,
      [name]: value,
    }));
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileSelected(true);
  };

  const handleUploadDogPhoto = async () => {
    try {
      const formData = new FormData();
      formData.append("dogphoto", selectedFile);

      const response = await fetch(`${baseUrl}/dogs/${dog?.id}/photo`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      await fetchDogPicture();

      setFileSelected(false);
      console.log("Upload success");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSaveDog = async (dogId) => {
    setEditDogMode(false);
    try {
      const response = await fetch(`${baseUrl}/dogs/${dogId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dogData),
        credentials: "include",
      });

      if (!response.ok) {
        console.log(dogData);
        throw new Error(`HTTP error ${response.status}`);
      }

      const updatedData = await response.json();
      console.log("Data updated:", updatedData);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const saveNewDog = async () => {
    try {
      const response = await fetch(`${baseUrl}/dogs`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dogData),
      });

      if (response.ok) {
        const updatedData = await response.json();
        console.log("Saved Dog:", updatedData);
        return updatedData;
      } else {
        throw new Error(`HTTP error ${response.status}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  const handelSaveNewDog = async () => {
    const savedDog = await saveNewDog();
    if (savedDog) {
      console.log(savedDog);
      setDogData(savedDog);
      setSuccessMessageOpen(true);
      console.log(successMessageOpen);
      console.log(successMessageOpen);
      console.log(successMessageOpen);
    }
    setAddMode(false);
  };

  return (
    <>
      <SuccessMessage
        setSuccessMessageOpen={setSuccessMessageOpen}
        successMessageOpen={successMessageOpen}
        successMessage="User registered successfully!"
      />
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete "{`${dogData.name}`}" ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handelDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {!addMode ? (
        <Box marginBottom={4} sx={{ textAlign: "right" }}>
          {!editDogMode || editDogMode !== dog.id ? (
            <div>
              <IconButton onClick={handleEdit}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={openDialog}>
                <DeleteIcon />
              </IconButton>
            </div>
          ) : (
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          )}
        </Box>
      ) : (
        ""
      )}
      <Container maxWidth="xl" sx={{ marginBottom: 4 }}>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="stretch"
          style={{ minHeight: "25ch" }}
        >
          <Grid item xs={12} md={4} lg={3}>
            {dogPicture && (
              <div style={{ marginBottom: "20px" }}>
                <img
                  src={dogPicture}
                  alt="Profile"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
            {!addMode && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ marginRight: "10px" }}>
                  <UploadButton
                    onChange={handleFileChange}
                    setFileSelected={setFileSelected}
                    fileSelected={fileSelected}
                  />
                </div>

                <Button
                  variant="contained"
                  sx={{
                    color: "white",
                    bgcolor: "secondary.main",
                    fontSize: "12px",
                  }}
                  onClick={handleUploadDogPhoto}
                  disabled={!fileSelected}
                >
                  Upload
                </Button>
              </div>
            )}
          </Grid>
          <Grid item xs={12} md={8} lg={9} justifyContent="center">
            <Grid
              justifyContent="center"
              sx={{
                m: 2,
                display: "flex",
                gap: 2,
              }}
            >
              <Grid item xs={12} md={4} lg={4}>
                <TextField
                  required={editDogMode === dog?.id}
                  label="Name"
                  name="name"
                  value={dogData?.name || ""}
                  onChange={handleDogChange}
                  variant="outlined"
                  fullWidth
                  disabled={editDogMode !== dog?.id}
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <FormControl
                  required={editDogMode === dog?.id}
                  disabled={editDogMode !== dog?.id}
                  fullWidth
                >
                  <InputLabel
                    id={dogData?.id ? `gender-${dogData?.id}` : `gender`}
                  >
                    Gender
                  </InputLabel>
                  <Select
                    labelId={dogData?.id ? `gender-${dogData?.id}` : `gender`}
                    id={
                      dogData?.id
                        ? `select-gender-${dogData?.id}`
                        : `select-gender`
                    }
                    name="gender"
                    value={dogData?.gender || ""}
                    label="gender"
                    onChange={handleDogChange}
                  >
                    {genderOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              justifyContent="center"
              sx={{
                m: 2,
                display: "flex",
                gap: 2,
              }}
            >
              <Grid item xs={12} md={4} lg={4}>
                <TextField
                  required={editDogMode === dog?.id}
                  label="Breed"
                  name="breed"
                  value={dogData?.breed || ""}
                  onChange={handleDogChange}
                  variant="outlined"
                  fullWidth
                  disabled={editDogMode !== dog?.id}
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <FormControl
                  required={editDogMode === dog?.id}
                  disabled={editDogMode !== dog?.id}
                  fullWidth
                >
                  <InputLabel id={dogData?.id ? `age-${dogData?.id}` : `age`}>
                    Age
                  </InputLabel>
                  <Select
                    labelId={dogData?.id ? `age-${dogData?.id}` : `age`}
                    id={
                      dogData?.id ? `select-age-${dogData?.id}` : `select-age`
                    }
                    name="age"
                    value={dogData?.age || ""}
                    label="age"
                    onChange={handleDogChange}
                  >
                    {ageOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              justifyContent="center"
              sx={{
                m: 2,
                display: "flex",
                gap: 2,
              }}
            >
              <Grid item xs={12} md={4} lg={4}>
                <FormControl
                  required={editDogMode === dog?.id}
                  disabled={editDogMode !== dog?.id}
                  fullWidth
                >
                  <InputLabel
                    id={
                      dogData?.id
                        ? `energy-level-${dogData?.id}`
                        : `energy-level`
                    }
                  >
                    Energy Level
                  </InputLabel>
                  <Select
                    labelId={
                      dogData?.id
                        ? `energy-level-${dogData?.id}`
                        : `energy-level`
                    }
                    id={
                      dogData?.id
                        ? `select-energy-level-${dogData?.id}`
                        : `select-energy-level`
                    }
                    name="energy_level"
                    value={dogData?.energy_level || ""}
                    label="energy_level"
                    onChange={handleDogChange}
                  >
                    {energyLevelOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <FormControl
                  required={editDogMode === dog?.id}
                  disabled={editDogMode !== dog?.id}
                  fullWidth
                >
                  <InputLabel id={dogData?.id ? `size-${dogData?.id}` : `size`}>
                    Size
                  </InputLabel>
                  <Select
                    labelId={dogData?.id ? `size-${dogData?.id}` : `size`}
                    id={
                      dogData?.id ? `select-size-${dogData?.id}` : `select-size`
                    }
                    name="size"
                    value={dogData?.size || ""}
                    label="size"
                    onChange={handleDogChange}
                  >
                    {sizeOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      {addMode && (
        <Box marginTop={4} marginBottom={4} sx={{ textAlign: "right" }}>
          <Button
            variant="contained"
            sx={{ bgcolor: "secondary.main" }}
            onClick={handelSaveNewDog}
          >
            Save New Dog
          </Button>
        </Box>
      )}
      <Divider />
    </>
  );
};

export default UserDogs;
