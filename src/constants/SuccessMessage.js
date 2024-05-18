import { Alert, Box, Snackbar } from "@mui/material";
import React from "react";
import Lottie from "react-lottie";
import Success from "../lotties/success.json";

const SuccessMessage = ({
  successMessageOpen,
  setSuccessMessageOpen,
  successMessage,
}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Success,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCloseSuccessMessage = () => {
    setSuccessMessageOpen(false);
  };

  return (
    <>
      <Snackbar
        open={successMessageOpen}
        autoHideDuration={8000}
        onClose={handleCloseSuccessMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Box sx={{ position: "relative", width: "100%" }}>
          <Alert
            onClose={handleCloseSuccessMessage}
            variant="filled"
            severity="success"
            sx={{
              zIndex: 1,
              position: "relative",
              width: "auto",
            }}
          >
            {successMessage}
          </Alert>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: -1,
              width: "150%",
              height: "200%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Lottie options={defaultOptions} width="100%" height="100%" />
          </Box>
        </Box>
      </Snackbar>
    </>
  );
};

export default SuccessMessage;
