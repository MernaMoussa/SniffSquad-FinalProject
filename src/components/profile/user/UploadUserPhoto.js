import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../constants/baseurl";
import Button from "@mui/material/Button";
import UploadButton from "../UploadButton";
const UploadUserPhoto = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);

  useEffect(() => {
    const savedProfilePicture = localStorage.getItem("profilePicture");
    if (savedProfilePicture) {
      setProfilePicture(savedProfilePicture);
    }
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileSelected(true);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("photo", selectedFile);

      const response = await fetch(`${baseUrl}/user/photo`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      const photoUrl = `${baseUrl}/${data?.photoUrl}`;
      console.log("Photo URL received from server:", photoUrl);
      setProfilePicture(photoUrl);
      localStorage.setItem("profilePicture", photoUrl);
      setFileSelected(false);
      console.log("Upload success");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {profilePicture && (
        <div style={{ marginBottom: "20px" }}>
          <img
            src={profilePicture}
            alt="Profile"
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          />
        </div>
      )}
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
          sx={{ color: "white", bgcolor: "secondary.main", fontSize: "12px" }}
          onClick={handleUpload}
          disabled={!fileSelected}
        >
          Upload
        </Button>
      </div>
    </div>
  );
};

export default UploadUserPhoto;
