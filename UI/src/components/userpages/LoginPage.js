import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  Container,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import image from "../../assets/image.png";
import { useContext } from "react";
import UserContext from "./context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import ForgotPassword from "./ForgotPassword";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const BackgroundImage = styled("img")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: -1,
});

const LoginCard = styled(Card)(({ theme }) => ({
  width: 400,
  maxWidth: "100%",
  padding: theme.spacing(4),
  position: "absolute",
  top: "50%",
  left: "70%",
  borderRadius: theme.shape.borderRadius,
  transform: "translate(-50%, -50%)",
}));

const LoginPage = () => {
  const { setUser } = useContext(UserContext);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [errors, setErrors] = useState({ Email: "", Password: "" });
  const navigate = useNavigate(); // Initialize useNavigate
  const [forgotPassword, showForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const validate = () => {
    let valid = true;
    const newErrors = { Email: "", Password: "" };

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!Email) {
      newErrors.Email = "Email is required";
      valid = false;
    } else if (!emailPattern.test(Email)) {
      newErrors.Email = "Invalid email format";
      valid = false;
    }

    if (!Password) {
      newErrors.Password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    //alert(`${process.env.REACT_APP_BASEURL}/users/login2`);
    e.preventDefault();
    var validated = validate(); // returning either false or true
   // alert(validated);
    //please call the below code when validate() is true. #####bug-fixed
if(validated)
{
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/users/login`,
        {
          Email: Email,
          Password: Password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const { token } = response.data;
        const decodedToken = jwtDecode(token);
        const RoleID = decodedToken.RoleID;
        const userData = {
          UserID: decodedToken.UserID,
          FullName: decodedToken.FullName,
          Email: decodedToken.Email,
          RoleID: decodedToken.RoleID,
          token,
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);

        console.log(userData);

        if (RoleID === 1) {
          navigate("/introduction");
        } else {
          navigate("/Overview");
        }
      } else {
        toast.error("Login failed . Please checky your email and password");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert(error.response.status);
        toast.error("Unauthorized: Incorrect email or password.");
      } else {
        alert(error.response.status);
        toast.error("Login error. Please try again later.");
      }
    }
  }

  };

  const hadnleForgotPasswordClick = () => {
    showForgotPassword(true);
  };

  const hadnleCloseForgotPassword = () => {
    showForgotPassword(false);
  };

  return (
    <Container>
      <BackgroundImage src={image} alt="Background" />
      <LoginCard sx={{ borderRadius: 8, padding: "3px", width: "30vw" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              id="Email"
              name="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(errors.Email)}
              helperText={errors.Email}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(errors.Password)}
              helperText={errors.Password}
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleSubmit}
            >
              Login
            </Button>
            <Box mt={2} textAlign="center">
              <Link
                onClick={hadnleForgotPasswordClick}
                variant="body2"
                style={{ cursor: "pointer" }}
              >
                Forgot Password?
              </Link>
            </Box>
          </form>
        </CardContent>
      </LoginCard>
      <ForgotPassword
        open={forgotPassword}
        onClose={hadnleCloseForgotPassword}
      />
      <ToastContainer />
    </Container>
  );
};
export default LoginPage;
