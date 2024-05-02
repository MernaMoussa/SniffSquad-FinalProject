import React, { useState } from "react";  
import {
  Box,
  Container,
  Grid,
  TextField,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const UserDogs = ({
  dog,
  editDogMode,
  handleEditDog,
  handleDeleteDog,
  setEditDogMode,
}) => {
  const [dogData, setDogData] = useState({ ...dog });

  const handleEdit = () => {
    setEditDogMode(dog?.id);
    handleEditDog(dog?.id);
  };

  const handleDelete = () => {
    handleDeleteDog(dog?.id);
  };

  const handleDogChange = (e) => {
    const { name, value } = e.target;
    setDogData((prevDog) => ({
      ...prevDog,
      [name]: value,
    }));
  };

  return (
    <>
      <Box marginBottom={4} sx={{ textAlign: "right" }}>
        {!editDogMode || editDogMode !== dog.id ? (
          <div>
            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </div>
        ) : (
          <Button variant="contained">Save</Button>
        )}
      </Box>
      <Container maxWidth="xl" sx={{ marginBottom: 4 }}>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="stretch"
          style={{ minHeight: "25ch" }}
        >
          <Grid item xs={12} md={4} lg={3}>
            picture
          </Grid>
          <Grid item xs={12} md={8} lg={9} justifyContent="center">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": {
                  m: 2,
                  width: "45%",
                },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  required={editDogMode === dog.id}
                  label="Name"
                  name="name"
                  value={dogData?.name || ""}
                  onChange={handleDogChange}
                  variant="outlined"
                  fullWidth
                  disabled={editDogMode !== dog.id}
                />
                <TextField
                  required={editDogMode === dog.id}
                  label="Gender"
                  name="gender"
                  value={dogData?.gender || ""}
                  onChange={handleDogChange}
                  variant="outlined"
                  fullWidth
                  disabled={editDogMode !== dog.id}
                />
              </div>
              <div>
                <TextField
                  required={editDogMode === dog.id}
                  label="Breed"
                  name="breed"
                  value={dogData?.breed || ""}
                  onChange={handleDogChange}
                  variant="outlined"
                  fullWidth
                  disabled={editDogMode !== dog.id}
                />
                <TextField
                  required={editDogMode === dog.id}
                  label="Age"
                  name="age"
                  value={dogData?.age || ""}
                  onChange={handleDogChange}
                  variant="outlined"
                  fullWidth
                  disabled={editDogMode !== dog.id}
                />
              </div>
              <div>
                <TextField
                  required={editDogMode === dog.id}
                  label="Energy Level"
                  name="energy_level"
                  value={dogData?.energy_level || ""}
                  onChange={handleDogChange}
                  variant="outlined"
                  fullWidth
                  disabled={editDogMode !== dog.id}
                />
                <TextField
                  required={editDogMode === dog.id}
                  label="Size"
                  name="size"
                  value={dogData?.size || ""}
                  onChange={handleDogChange}
                  variant="outlined"
                  fullWidth
                  type="password"
                  disabled={editDogMode !== dog.id}
                />
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Divider />
    </>
  );
};

export default UserDogs;
