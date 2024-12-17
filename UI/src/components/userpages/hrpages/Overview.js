import React, { useContext } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext"; // Adjust the path to the UserContext
import { Files, IdentificationCard, List } from "@phosphor-icons/react";
import {
  DocumentScanner,
  FormatAlignCenterOutlined,
} from "@mui/icons-material";

// Styled component for card animation
const AnimatedCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: `0 4px 8px ${theme.palette.grey?.[500] || "#9e9e9e"}`, // Fallback color
  },
  backgroundColor: theme.palette.grey?.[100] || "#f5f5f5", // Fallback color
}));

// Animation for username
const AnimatedTypography = styled(Typography)(({ theme }) => ({
  animation: `$fadeIn 2s ease-in-out`,
  "@keyframes fadeIn": {
    "0%": { opacity: 0, transform: "translateY(-20px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
}));

const Overview = () => {
  const { user } = useContext(UserContext); // Fetch user context
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <Box sx={{ padding: 8 }}>
      {/* Hello, Username */}
      <AnimatedTypography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", marginBottom: 4 }} // Add gap between username and cards
      >
        Hello, {user?.FullName} , Good To see you
      </AnimatedTypography>

      {/* Cards in a single row */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <AnimatedCard
            onClick={() => handleCardClick("/forms")}
            sx={{ cursor: "pointer", height: "100%", borderRadius: 3 }}
          >
            <CardContent>
              <Typography variant="h6">Forms</Typography>
              <Typography variant="body2">
                View and manage your forms.
              </Typography>
            </CardContent>
          </AnimatedCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <AnimatedCard
            onClick={() => handleCardClick("/Preonboarding")}
            sx={{ cursor: "pointer", height: "100%", borderRadius: 3 }}
          >
            <CardContent>
              <Stack
                direction="row"
                sx={{
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
                spacing={3}
              >
                <Stack spacing={1}>
                  <Typography variant="h6">Pre-Onboarding List</Typography>
                  <Typography variant="body2">
                    Manage the pre-onboarding process.
                  </Typography>
                </Stack>
                <Avatar
                  sx={{
                    height: "46px",
                    width: "46px",
                    backgroundColor: "lightgreen",
                  }}
                >
                  <List size={20} />
                </Avatar>
              </Stack>
            </CardContent>
          </AnimatedCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <AnimatedCard
            onClick={() => handleCardClick("/UsersSubmitted")}
            sx={{ cursor: "pointer", height: "100%", borderRadius: 3 }}
          >
            <CardContent>
              <Stack
                direction="row"
                sx={{
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
                spacing={3}
              >
                <Stack spacing={1}>
                  <Typography variant="h6">Submitted Forms Approver</Typography>
                  <Typography variant="body2">
                    Approve and review submitted forms.
                  </Typography>
                </Stack>
                <Avatar
                  sx={{
                    height: "46px",
                    width: "46px",
                    backgroundColor: "lightblue",
                  }}
                >
                  <Files size={20} />
                </Avatar>
              </Stack>
            </CardContent>
          </AnimatedCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <AnimatedCard
            onClick={() => handleCardClick("/ApprovedCandidates")}
            sx={{ cursor: "pointer", height: "100%", borderRadius: 3 }}
          >
            <CardContent>
              <Stack
                direction="row"
                sx={{
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
                spacing={3}
              >
                <Stack spacing={1}>
                  <Typography variant="h6">Approved Candidates</Typography>
                  <Typography variant="body2">
                    Enter the employee Number for the apporved candidates.
                  </Typography>
                </Stack>
                <Avatar
                  sx={{
                    height: "46px",
                    width: "46px",
                    backgroundColor: "lightblue",
                  }}
                >
                  <IdentificationCard size={20} />
                </Avatar>
              </Stack>
            </CardContent>
          </AnimatedCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <AnimatedCard
            onClick={() => handleCardClick("/additional2")}
            sx={{ cursor: "pointer", height: "100%", borderRadius: 3 }}
          >
            <CardContent>
              <Typography variant="h6">Additional Card 2</Typography>
              <Typography variant="body2">
                Description for additional card 2.
              </Typography>
            </CardContent>
          </AnimatedCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <AnimatedCard
            onClick={() => handleCardClick("/additional3")}
            sx={{ cursor: "pointer", height: "100%", borderRadius: 3 }}
          >
            <CardContent>
              <Typography variant="h6">Additional Card 3</Typography>
              <Typography variant="body2">
                Description for additional card 3.
              </Typography>
            </CardContent>
          </AnimatedCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Overview;
