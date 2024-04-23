import React, { useContext, useState } from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import { UserContext } from "../context/UserProvider";

const Profile = () => {
  const { user } = useContext(UserContext);

  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Box marginBottom={2}>
        {editMode ? (
          <>
            <TextField
              label="First Name"
              value={firstName}
              onChange={handleFirstNameChange}
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Last Name"
              value={lastName}
              onChange={handleLastNameChange}
              variant="outlined"
              fullWidth
            />
          </>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              {`Hello, ${firstName} ${lastName}!`}
            </Typography>
          </>
        )}
      </Box>
      <Box>
        {editMode ? (
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        ) : (
          <Button variant="contained" onClick={handleEdit}>
            Edit Profile
          </Button>
        )}
      </Box>
    </div>
  );
};

export default Profile;
