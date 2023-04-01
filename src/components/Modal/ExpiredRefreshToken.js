import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const ExpiredRefreshToken = ({ openDialog, setopenDialog }) => {
    const navigate = useNavigate()
    const handleGoToLogin = () => {
        setopenDialog(false)
        navigate('/')
    }
    const handleDialogClose = () => {
  setopenDialog(false);
};
    return (
      <div>
            
      <Dialog open={openDialog} keepMounted
           onClose={handleDialogClose}
           fullWidth PaperComponent={Paper}>
        <DialogTitle>Expired Refresh Token</DialogTitle>
        <DialogContent>
          <p>Your refresh token has expired! please login again to continue</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGoToLogin}>Login</Button>
        </DialogActions>
            </Dialog>
      </div>
            
  );
};

export default ExpiredRefreshToken;
