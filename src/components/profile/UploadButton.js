import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function UploadButton({
  onChange,
  setFileSelected,
  fileSelected,
}) {
  const handleFileChange = (event) => {
    if (onChange) {
      onChange(event);
    }
  };

  const handleInputChange = (event) => {
    if (event.target.files.length === 0) {
      setFileSelected(false);
    }
  };
  return (
    <div>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        sx={{
          fontSize: "12px",
          bgcolor: "primary.main",
        }}
        disabled={fileSelected}
      >
        {fileSelected ? "Photo selected" : "Choose photo"}
        <VisuallyHiddenInput
          type="file"
          onChange={(e) => {
            handleFileChange(e);
            handleInputChange(e);
          }}
        />
      </Button>
    </div>
  );
}
