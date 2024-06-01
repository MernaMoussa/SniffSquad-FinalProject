import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Snackbar } from "@mui/material";
import UserDogs from "./UserDogs";
import { baseUrl } from "../../../constants/baseurl";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SuccessMessage from "../../../constants/SuccessMessage";
const UserDogsList = ({
  dogs,
  editDogMode,
  handleDeleteDog,
  setEditDogMode,
  fetchUserDogsData,
}) => {
  const [addMode, setAddMode] = useState(false);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);

  const handleAddDog = () => {
    setAddMode(true);
    setEditDogMode(null);
  };

  const handleEditDog = async (dogId) => {
    try {
      const response = await fetch(`${baseUrl}/dogs/${dogId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch dog details");
      }

      await response.json();
    } catch (error) {
      console.error("Error editing dog:", error);
    }
  };

  useEffect(() => {
    const fetchDogDetails = async () => {
      dogs.forEach((dog) => {
        handleEditDog(dog.id);
      });
    };

    fetchDogDetails();
  }, [dogs]);

  useEffect(() => {
    fetchUserDogsData();
  }, [addMode]);

  return (
    <>
      {!addMode && (
        <>
          <SuccessMessage
            setSuccessMessageOpen={setSuccessMessageOpen}
            successMessageOpen={successMessageOpen}
            successMessage="Dog saved successfully!"
          />
          <Box marginTop={4} marginBottom={4} sx={{ textAlign: "right" }}>
            <Button
              variant="contained"
              sx={{ bgcolor: "secondary.main" }}
              startIcon={<AddCircleIcon />}
              onClick={handleAddDog}
            >
              Add New Dog
            </Button>
          </Box>
          <Divider />
        </>
      )}
      {addMode && (
        <Box marginTop={4} marginBottom={4}>
          <UserDogs
            addMode={addMode}
            setAddMode={setAddMode}
            setSuccessMessageOpen={setSuccessMessageOpen}
          />
        </Box>
      )}
      {dogs.map((dog) => (
        <Box marginTop={4} marginBottom={4} key={dog.id}>
          <UserDogs
            dog={dog}
            editDogMode={editDogMode}
            handleEditDog={() => handleEditDog(dog?.id)}
            handleDeleteDog={handleDeleteDog}
            setEditDogMode={setEditDogMode}
            setSuccessMessageOpen={setSuccessMessageOpen}
          />
        </Box>
      ))}
    </>
  );
};

export default UserDogsList;
