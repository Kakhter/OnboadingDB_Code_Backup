import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function PasswordReset({ open, onClose }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordTyped, setPasswordTyped] = useState(false);

  // function to validate password
  const validatePassword = (password) => {
    const strength = checkpasswordStrength(password);
    setPasswordStrength(strength);
    const isValid = strength === "Strong";
    return isValid;
  };

  //function to check the strength of the password
  const checkpasswordStrength = (password) => {
    const lengthCriteria = password.length >= 8;
    const uppercaseCriteria = /[A-Z]/.test(password);
    const lowercaseCriteria = /[a-z]/.test(password);
    const numberCriteria = /[0-9]/.test(password);
    const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (
      lengthCriteria &&
      uppercaseCriteria &&
      lowercaseCriteria &&
      numberCriteria &&
      specialCharCriteria
    ) {
      return "Strong";
    } else if (
      lengthCriteria &&
      (uppercaseCriteria || lowercaseCriteria) &&
      (numberCriteria || specialCharCriteria)
    ) {
      return "Moderate";
    } else if (lengthCriteria) {
      return "Weak";
    } else {
      return "";
    }
  };

  useEffect(() => {
    // Check token and update password change status on mount
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsPasswordChanged(decodedToken.PasswordChanged || false);
      } catch (e) {
        console.error("Failed to decode token:", e);
      }
    }
  }, [open]);

  const handleReset = async () => {
    const token = localStorage.getItem("token")?.trim();

    if (!token) {
      setError("Authentication error, please login again.");
      return;
    }
    if (!validatePassword(newPassword)) {
      setError(
        "Password needs to contain 1 Uppercase,1 lowercase,1 number and 1 sepcial charachter."
      );
      console.log("abhishek");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userID = decodedToken.UserID;
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      const response = await axios.post(
       // "process.env.REACT_APP_BASEURL + `/users/changePassword",
        `${process.env.REACT_APP_BASEURL}/users/changePassword`,
        {
          UserID: userID,
          Password: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password reset successfully");
        onClose();
      } else {
        toast.error(response.data.message || "Error resetting the password");
      }
    } catch (error) {
      console.error("Error resetting the password:", error);
      setError("Error resetting the password, please try again later");
      toast.error("Error resetting the password, please try again later");
    }
  };

  return (
    <Dialog open={open && !isPasswordChanged}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <Typography variant="body1" color="error">
          {error}
        </Typography>
        <TextField
          style={{ minWidth: "550px" }}
          margin="dense"
          label="New Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          variant="outlined"
          value={newPassword}
          onChange={(e) => {
            const value = e.target.value;
            setNewPassword(value);
            setPasswordTyped(value.length > 0);
            validatePassword(value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {passwordTyped && passwordStrength && (
          <FormHelperText error={passwordStrength === "Very Weak"}>
            Password Strength: {passwordStrength || " "}
          </FormHelperText>
        )}
        <TextField
          style={{ minWidth: "550px" }}
          margin="dense"
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReset} color="primary">
          Change Password
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PasswordReset;
