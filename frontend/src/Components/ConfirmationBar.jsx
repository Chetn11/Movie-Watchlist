import React from "react";
import { Snackbar, Alert } from "@mui/material";

function ConfirmationBar({ open, onClose, message, severity }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      color="red"
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default ConfirmationBar;
