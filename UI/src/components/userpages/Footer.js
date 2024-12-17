import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{

        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px 20px",
        // backgroundColor: '#f5f5f5',
        backgroundColor: "#4565F3",
        // height: "10vh",
        mt: 2,
        backgroundColor: theme.palette.mode === "dark" ? "black" : "#4565F3",
        color: theme.palette.mode === "dark" ? "white" : "black",

      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ color: "white" }}
      >
        &copy; {currentYear} by GyanSys. All Rights Reserved |{" "}
        <Link href="/privacy-policy" color="inherit" textcolor="black">
          Privacy Policy
        </Link>
      </Typography>
      <Box>
        <IconButton
          aria-label="Twitter"
          href="https://twitter.com"
          target="_blank"
          color="white"
        >
          <TwitterIcon sx={{ color: "white" }} />
        </IconButton>
        <IconButton
          aria-label="Instagram"
          href="https://www.instagram.com/gyansys.global?igsh=cjNnYzdsZDZlbHEx"
          target="_blank"
          color="white"
        >
          <InstagramIcon sx={{ color: "white" }} />
        </IconButton>
        <IconButton
          aria-label="LinkedIn"
          href="https://www.linkedin.com/company/gyansys/"
          target="_blank"
          color="white"
        >
          <LinkedInIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
