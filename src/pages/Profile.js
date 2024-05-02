import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  Container,
  Grid,
  Divider,
} from "@mui/material";
import { UserContext } from "../context/UserProvider";
import { baseUrl } from "../constants/baseurl";
import UserDogsList from "../components/profile/dogs/UserDogsList";
import UploadUserPhoto from "../components/profile/user/UploadUserPhoto";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(user);
  const [dogs, setuserDogs] = useState([]);
  const [editUserMode, setEditUserMode] = useState(false);
  const [editDogMode, setEditDogMode] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  async function fetchUserDogsData() {
    try {
      const response = await fetch(`${baseUrl}/user-dogs`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch dog data");
      }

      const userDogsdata = await response.json();

      if (userDogsdata.length !== 0) {
        setuserDogs(userDogsdata);
      }
    } catch (error) {
      console.error("Error fetching dog data:", error);
    }
  }

  useEffect(() => {
    setUserData(user || {});
    fetchUserDogsData();
  }, [user]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleEditUser = () => {
    setEditUserMode(true);
  };

  const handleSaveUser = () => {
    setEditUserMode(false);
    fetch(`${baseUrl}/edit-user`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          console.log(userData);
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then((updatedData) => {
        console.log("Data updated:", updatedData);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const handleChangeUser = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleDeleteDog = async (dogId) => {
    try {
      const response = await fetch(`${baseUrl}/dogs/${dogId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete dog");
      }

      console.log("Successfully deleted dog with ID:", dogId);
      fetchUserDogsData();
    } catch (error) {
      console.error("Error deleting dog:", error);
    }
  };

  const handleCancel = () => {
    setEditUserMode(false);
  };

  return (
    <Container sx={{ marginTop: 4, marginBottom: 4 }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Typography variant="h6" gutterBottom>
        {`Hello, ${userData?.first_name || "Guest"} ${
          userData?.last_name || ""
        }!`}
      </Typography>
      <Box marginBottom={4}>
        <Container maxWidth="xl">
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="stretch"
            style={{ minHeight: "100%" }}
          >
            <Grid item xs={12} md={4} lg={3}>
              <UploadUserPhoto />
            </Grid>
            <Grid item xs={12} md={8} lg={9} justifyContent="center">
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": {
                    m: 2,
                    width: "100%",
                    "@media (min-width: 600px)": {
                      width: "25ch",
                    },
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    required={editUserMode}
                    label="First Name"
                    name="first_name"
                    value={userData?.first_name || ""}
                    onChange={handleChangeUser}
                    variant="outlined"
                    fullWidth
                    disabled={!editUserMode}
                  />
                  <TextField
                    required={editUserMode}
                    label="Last Name"
                    name="last_name"
                    value={userData?.last_name || ""}
                    onChange={handleChangeUser}
                    variant="outlined"
                    fullWidth
                    disabled={!editUserMode}
                  />
                </div>
                <div>
                  <TextField
                    required={editUserMode}
                    label="Phone Number"
                    name="phone_number"
                    value={userData?.phone_number || ""}
                    onChange={handleChangeUser}
                    variant="outlined"
                    fullWidth
                    disabled={!editUserMode}
                  />
                  <TextField
                    required={editUserMode}
                    label="Date of Birth"
                    name="date_of_birth"
                    value={userData?.date_of_birth || ""}
                    onChange={handleChangeUser}
                    variant="outlined"
                    fullWidth
                    disabled={!editUserMode}
                  />
                </div>
              </Box>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 2 },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    required={editUserMode}
                    label="Email Address"
                    name="email"
                    value={userData?.email || ""}
                    onChange={handleChangeUser}
                    variant="outlined"
                    fullWidth
                    disabled={!editUserMode}
                  />
                  <TextField
                    required={editUserMode}
                    label="Password"
                    name="password"
                    value={userData?.password || ""}
                    onChange={handleChangeUser}
                    variant="outlined"
                    fullWidth
                    type="password"
                    disabled={!editUserMode}
                  />
                </div>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box marginBottom={4} sx={{ textAlign: "right" }}>
        {editUserMode ? (
          <>
            <Button variant="contained" onClick={handleCancel} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSaveUser} sx={{ ml: 1 }}>
              Save
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={handleEditUser}>
            Edit Profile
          </Button>
        )}
      </Box>
      <Divider />

      <UserDogsList
        dogs={dogs}
        editDogMode={editDogMode}
        setEditDogMode={setEditDogMode}
        handleDeleteDog={handleDeleteDog}
      />
    </Container>
  );
};

export default Profile;
