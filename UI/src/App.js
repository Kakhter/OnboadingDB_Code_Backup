import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import Navbar from "./components/userpages/Navbar";
import Footer from "./components/userpages/Footer";
import LoginPage from "./components/userpages/LoginPage";
import IntroductionPage from "./components/userpages/IntroductionPage";
import PersonalInformationPage from "./components/userpages/PersonalInformation";
import PreviousWorkDetailsPage from "./components/userpages/PreviousWorkDetailsPage";
import SkillsAndCertificationsPage from "./components/userpages/SkillsAndCertificationsPage";

import EducationDetailsPage from "./components/userpages/EducationDetailsPage";
import { UserProvider } from "./components/userpages/context/UserContext";

import Overview from "./components/userpages/hrpages/Overview";
import TestForm from "./components/userpages/hrpages/TestForms";
import PreOnboardingList from "./components/userpages/hrpages/PreOnboardingList";


import UsersSubmitted from "./components/userpages/hrpages/UsersSubmitted";
import { ToastContainer } from "react-toastify";
import SubmitedFormsDetail from "./components/userpages/hrpages/SubmitedFormsDetail";
import ApprovedCandidates from "./components/userpages/hrpages/ApprovedCandidates";
function App() {
  return (
    <UserProvider>
     
      <Router>
        <Box
        
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",

          }}
        >
          <Navbar />
          <Box
            sx={{
              flex: 1, // This will push the footer to the bottom
            }}
          >
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/introduction" element={<IntroductionPage />} />
              <Route
                path="/PersonalInformation"
                element={<PersonalInformationPage />}
              />
              <Route
                path="/PreviousWorkDetailsPage"
                element={<PreviousWorkDetailsPage />}
              />
              <Route
                path="/SkillsAndCertificationsPage"
                element={<SkillsAndCertificationsPage />}
              />

              <Route
                path="/EducationDetailsPage"
                element={<EducationDetailsPage />}
              />
              <Route path="/Overview" element={<Overview />} />
              <Route path="/forms" element={<TestForm />} />
              <Route path="/Preonboarding" element={<PreOnboardingList />} />
              <Route path="/UsersSubmitted" element={<UsersSubmitted />} />
              <Route
                path="/SubmitedFormsDetail/:UserID"
                element={<SubmitedFormsDetail />}
              />
              <Route
                path="/ApprovedCandidates"
                element={<ApprovedCandidates />}
              />
            </Routes>
          </Box>
          <Footer />
 
        </Box>
      </Router>
    </UserProvider>
  );
}

export default App;
