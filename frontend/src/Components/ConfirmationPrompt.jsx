import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, CircularProgress } from '@mui/material';

function ConfirmationPrompt({ open, onClose, onConfirm, change,loading,title }) {
  return (
    <Dialog
    open={open}
      onClose={onClose}
    >
      <DialogTitle>{`${title} Movie`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this movie?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => onConfirm(change)} color="primary" autoFocus>
         {loading?<CircularProgress size={24}/>:"Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationPrompt;
