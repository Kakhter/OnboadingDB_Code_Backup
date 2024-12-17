import React, { useState, useEffect } from "react";
import { Card, Typography, Button, Container } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import Icon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import UserContext from "./context/UserContext";
import { useContext } from "react";
import PasswordReset from "./PasswordReset";
import { jwtDecode } from "jwt-decode";

// Define the fadeIn animation
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Style for the animated card
const AnimatedCard = styled(Card)(({ theme }) => ({
  width: "95%",
  margin: theme.spacing(2, "auto"),
  padding: theme.spacing(4),
  textAlign: "center",
  borderRadius: theme.shape.borderRadius,
  //backgroundColor: "#f2f3f5",
  animation: `${fadeIn} 1.5s ease-in`,
}));

// Wrapper container
const ContainerWrapper = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: "100vh",
  justifyContent: "center",
}));

const IntroductionPage = () => {
  const { user } = useContext(UserContext);
  const [showPasswordReset, setShowPasswordReset] = useState(true); // change####

  const handleButtonClick = () => {
    console.log("Get Started button clicked");
    navigation("/PersonalInformation");
  };
  useEffect(() => {
    if (user) {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      // If password has not been changed, show the password reset dialog
      setShowPasswordReset(decodedToken.PasswordChanged ? true : true); //####
      // console.log(showPasswordReset);
    }
  }, [user]);

  const navigation = useNavigate();
  return (
    <ContainerWrapper>
      <PasswordReset
        open={showPasswordReset}
        onClose={() => {
          setShowPasswordReset(false);
        }}
      />

      <AnimatedCard
        sx={{
          borderRadius: 4,
          boxShadow:
            " rgba(0, 0, 0, 0.15) 0px 2px 8px;rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;",
        }}
      >
        <Icon style={{ fontSize: 60 }} />
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          // sx={{
          //   boxShadow:
          //     " rgba(0, 0, 0, 0.15) 0px 2px 8px;rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;",
          // }}
        >
          Hello {user.FullName},
          <br />
          We are excited to welcome you to our GyanSys family.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleButtonClick}>
          Get Started
        </Button>
      </AnimatedCard>

      <AnimatedCard
        sx={{
          borderRadius: 4,
          boxShadow:
            " rgba(0, 0, 0, 0.15) 0px 2px 8px;rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;",
        }}
      >
        <Typography variant="h6" component="div" gutterBottom>
          Introduction
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "justify" }}>
          Welcome to GyanSys! We are thrilled to have you onboard. GyanSys is a
          leading global system integrator company supporting enterprise
          customers. As a recognized innovator in digital and process
          transformation, GyanSys is a global systems integrator & professional
          services firm with leading capabilities in SAP, Salesforce, Microsoft,
          ServiceNow, DevOps, and Data & Analytics. Combining unmatched
          experience and specialized skills across 15+ industries, we offer
          advisory, implementation, and managed service solutions. Our 3000+
          employees deliver on the promise of technology serving more than 350
          customers. We embrace the power of change to create value and shared
          success for our clients, employees, and communities. We are
          headquartered in Indianapolis, Indiana, with delivery centers
          worldwide. 19+ Years of Growth 750+ Projects 98%+ Customer Retention
        </Typography>
      </AnimatedCard>

      <AnimatedCard
        sx={{
          borderRadius: 4,
          boxShadow:
            " rgba(0, 0, 0, 0.15) 0px 2px 8px;rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;",
        }}
      >
        <Typography variant="h6" component="div" gutterBottom>
          What’s Next?
        </Typography>
        <Typography variant="body1">
          After completing the onboarding process, you will receive an email
          with further instructions. Please follow the guidelines provided and
          feel free to reach out to the HR department if you have any questions.
        </Typography>
      </AnimatedCard>
    </ContainerWrapper>
  );
};

export default IntroductionPage;
