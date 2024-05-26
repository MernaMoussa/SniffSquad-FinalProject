import React, { useContext, useEffect, useState } from "react";
import { baseUrl } from "../../../constants/baseurl";
import Button from "@mui/material/Button";
import UploadButton from "../UploadButton";
import { UserContext } from "../../../context/UserProvider";
const UploadUserPhoto = () => {
  const { userPicture, setUserPicture } = useContext(UserContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);

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

      const responseData = await response.json();
      console.log(responseData);
      const uploadedPhotoUrl = responseData.pictureUrl;

      setUserPicture(uploadedPhotoUrl);
      setFileSelected(false);
      console.log("Upload success");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {userPicture && (
        <div style={{ marginBottom: "20px" }}>
          <img
            src={userPicture}
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
