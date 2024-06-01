import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { baseUrl } from "../../../constants/baseurl";
import { Snackbar } from "@mui/material";

export default function MessageDialog({
  handleClose,
  open,
  dog,
  owner,
  setSuccessMessage,
  setSnackbarOpen,
}) {
  const [formData, setFormData] = React.useState({
    content: "",
    date: "",
    time: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/${owner?.id}/send-invitation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to send invitation");
      }
      setSuccessMessage("Invitation sent successfully");
      setSnackbarOpen(true);
      handleClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>
          Invite {owner?.first_name} to a playdate with {dog?.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your message, date, and time for the playdate invitation.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="message"
            name="content"
            label="Message"
            type="text"
            fullWidth
            variant="standard"
            value={formData.content}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="date"
            name="date"
            label="Date"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.date}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="time"
            name="time"
            label="Time"
            type="time"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.time}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Send Invitation</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
