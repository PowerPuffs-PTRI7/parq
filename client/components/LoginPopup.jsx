import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import "../styles.scss";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Login } from './Login.jsx'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ 
      position: "relative",
      marginLeft: "1.7rem",
      marginTop: "1rem",
      p: 2 ,
      color:"#BBD1D1",
      fontSize: "800",
      fontWeight: "bold"}} {...other}>
      <div className='closeIcon' sx={{ padding: "5px" }}>
      welcome to parq
      </div>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: "#BBD1D1",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function LoginPopup(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (<>
    <Button color="inherit" onClick={handleClickOpen} sx={{ flexGrow: 1 }}>
      <Typography
        variant="h6"
        component="div"
        sx={{
          textTransform: "none",
          fontWeight: "light",
          color: "#36454F",
        }}
      >
        <div>
          <div color="inherit" sx={{ flexGrow: 1 }}>
          <Typography
              variant="h6"
              component="div"
              sx={{
                textTransform: "none",
                fontWeight: "light",
                color: "#36454F",
              }}>
              <div className='nav-text'>
                log in
             </div>
            </Typography>
          </div>
        </div>
      </Typography>
    </Button>
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        
      </BootstrapDialogTitle> 
      <DialogContent dividers> 
        <Login handleClose={handleClose} setOpen={setOpen} setUserInfo={props.setUserInfo} />
      </DialogContent>
    </BootstrapDialog>
    </>
  );
}
