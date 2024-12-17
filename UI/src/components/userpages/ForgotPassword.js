import {
  Modal,
  Typography,
  Paper,
  Button,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ForgotPassword = ({ onClose, open }) => {
  const [Email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    //validatiofn is required #####bug
    //support true
    // any one can use postman and passthe email of other and can reset. security issue #####bug
    try {
      const response = await axios.post(
        "process.env.REACT_APP_BASEURL + `/users/sendForgetCode",
        {
          Email,
        }
      );

        if (response.status === 200) {
          toast.success("A reset link has been sent to you email");
        }
        else {
        }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <Modal
      open={open}
      onClose={(_, reason) => {
        if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
          onClose();
        }
      }}
      disableEscapeKeyDown
    >
      <Box
        component={Paper}
        elevation={3}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 4,
          p: 4,
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" gutterBottom>
          Enter Your Email ID
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          value={Email}
          onChange={handleEmailChange}
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#415a77",
            "&:hover": {
              backgroundColor: "#1b263b",
            },
          }}
          onClick={handleSubmit}
          fullWidth
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};
export default ForgotPassword;
