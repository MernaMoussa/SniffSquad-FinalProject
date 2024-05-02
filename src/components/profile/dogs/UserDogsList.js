import React, { useEffect } from "react";
import { Box } from "@mui/material";
import UserDogs from "./UserDogs";
import { baseUrl } from "../../../constants/baseurl";

const UserDogsList = ({
  dogs,
  editDogMode,
  handleDeleteDog,
  setEditDogMode,
}) => {
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

  return (
    <>
      {dogs.map((dog) => (
        <Box marginTop={4} marginBottom={4} key={dog.id}>
          <UserDogs
            dog={dog}
            editDogMode={editDogMode}
            handleEditDog={() => handleEditDog(dog?.id)}
            handleDeleteDog={handleDeleteDog}
            setEditDogMode={setEditDogMode}
          />
        </Box>
      ))}
    </>
  );
};

export default UserDogsList;
