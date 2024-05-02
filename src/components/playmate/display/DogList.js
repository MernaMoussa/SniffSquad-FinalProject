import React, { useEffect, useState } from "react";
import DogCard from "./DogCard";
import { Grid } from "@mui/material";
import { baseUrl } from "../../../constants/baseurl";

const DogList = ({ dogs }) => {
  const [dogsWithUserData, setDogsWithUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const dogsWithUserData = [];
      for (const dog of dogs) {
        try {
          const userResponse = await fetch(`${baseUrl}/users/${dog?.UserId}`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          if (!userResponse.ok) {
            throw new Error("Failed to fetch user data");
          }

          const userData = await userResponse.json();
          dogsWithUserData.push({ ...dog, user: userData });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setDogsWithUserData(dogsWithUserData);
    };

    fetchUserData();
  }, [dogs]);

  return (
    <Grid container spacing={2}>
      {dogsWithUserData.map((dog) => (
        <Grid key={dog.id} item>
          <DogCard dog={dog} owner={dog?.user} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DogList;
