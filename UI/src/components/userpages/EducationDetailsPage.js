///new code
import React, { useState, useEffect, useContext } from "react";
import {userUtility_isSubmitted,userUtility_isGyansysEmp} from "../../utility/user-utility";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/material/styles";

import {
  CardContent,
  Button,
  TextField,
  Typography,
  Box,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  Alert,
  FormControl,
  Autocomplete,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import UserContext from "./context/UserContext";
import { toast, ToastContainer } from "react-toastify";

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
  padding: "8px 16px",
};

const NavigationRow = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(1),

  // marginTop: 'auto',
  marginTop: "50px",
}));

const EducationDetailsPage = () => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  
  const [educationSections, setEducationSections] = useState([
    {
      UserID: user.UserID,
      EducDescription: "SSLC / X",
      CountryID: "",
      StateID: "",
      BoardORUniversity: "",
      InstituteName: "",
      PassedOn: "",
      PercentageMarks: "",
      CGPA: "",
    },
    {
      UserID: user.UserID,
      EducDescription: "PUC / XII",
      CountryID: "",
      StateID: "",
      BoardORUniversity: "",
      InstituteName: "",
      PassedOn: "",
      PercentageMarks: "",
      CGPA: "",
    },
    {
      UserID: user.UserID,
      EducDescription: "Graduate",
      CountryID: "",
      StateID: "",
      BoardORUniversity: "",
      InstituteName: "",
      Degree: "",
      Branch: "",
      PassedOn: "",
      PercentageMarks: "",
      CGPA: "",
    },
    {
      UserID: user.UserID,
      EducDescription: "Post Graduate",
      CountryID: "",
      StateID: "",
      BoardORUniversity: "",
      InstituteName: "",
      Degree: "",
      Branch: "",
      PassedOn: "",
      PercentageMarks: "",
      CGPA: "",
    },
  ]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [submitted, setSubmitted] = useState(false);

  // merge all useEffect
  console.log("calling:::::::::::::::::::", user?.UserID);
  
const [IsSubmitted, setIsSubmitted] = useState(true);
			
const formSubmitted =async ()=>{
setIsSubmitted(await userUtility_isSubmitted());
console.log(IsSubmitted);
return IsSubmitted;
}

  useEffect(() => {
    formSubmitted();


    const fetchCountries = async () => {
      console.log("cdvjcvdcb country");
      try {
        const response = await axios.get(
          //"process.env.REACT_APP_BASEURL + `/countries/",
          `${process.env.REACT_APP_BASEURL}/countries/`,
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Failed to fetch countries", error);
      }
    };
    console.log(countries.length);
    fetchCountries();

    const fetchEducationDetails = async () => {
      // if (!user?.UserID || !user?.token) {
      //   return;
      // }

      console.log("API");

      try {
        const educationResponse = await axios.get(
          //process.env.REACT_APP_BASEURL + `/edu/getbyuser/${user.UserID}`,
          `${process.env.REACT_APP_BASEURL}/edu/getbyuser/${user.UserID}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        console.log("useefect calling");

        if (educationResponse.status === 200) {
          
          const sortedData = educationResponse.data.sort(
            (a, b) =>
              (a.EducationID) -
              (b.EducationID)
          );
          
          setEducationSections(sortedData);
          const educationData = educationResponse.data;
          educationData.forEach((section, index) => {
            if (section.CountryID) {
              fetchStates(section.CountryID, index);
            }
          });
          setSubmitted(false);
          //toast("Form has been submited");

          // setTimeout(() => {
          //   navigate("/SkillsAndCertificationsPage");
          // }, 3000);
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    // fetchPersonalDetails();
    fetchEducationDetails();
  }, []);

  const fetchStates = async (CountryID, index) => {
    try {
      const response = await axios.get(
        // process.env.REACT_APP_BASEURL + `/states/country/${CountryID}`
        `${process.env.REACT_APP_BASEURL}/states/country/${CountryID}`,
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );

      setStates((prevStates) => ({
        ...prevStates,
        [index]: response.data,
      }));
    } catch (error) {
      console.error("Failed to fetch states", error);
    }
  };

  const handleStateChange = (index, newValue) => {
    if (submitted) return;

    const updatedSections = [...educationSections];

    updatedSections[index].StateID = newValue ? newValue.value : "";

    setEducationSections(updatedSections);
  };

  const handleChange = (index, field, value) => {
    if (submitted) return;

    const updatedSections = [...educationSections];
    updatedSections[index][field] = value;
    setEducationSections(updatedSections);

    if (field === "CountryID") {
      fetchStates(value, index);
    }
  };

  const validateRequiredFields = () => {
    let isValid = true;

    //  (SSLC, PUC, and Graduate)
    for (let i = 0; i < 3; i++) {
      const section = educationSections[i];

      // Validate required fields
      const requiredFields = [
        "CountryID",
        "StateID",
        "BoardORUniversity",
        "InstituteName",
        "PassedOn",
      ];
      for (const field of requiredFields) {
        if (!section[field]) {
          isValid = false;
          setSnackbarMessage(
            `${section.EducDescription}: ${field} is required.`
          );
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
          break;
        }
      }

      if (!isValid) break;

      if (!section.PercentageMarks && !section.CGPA) {
        isValid = false;

        setSnackbarMessage(
          `${section.EducDescription}: Either PercentageMarks or CGPA is required.`
        );
        // setSnackbarSeverity("error");

        setSnackbarOpen(true);
        break;
      }

      if (section.PercentageMarks) {
        const percentage = parseFloat(section.PercentageMarks);
        if (isNaN(percentage) || percentage < 1 || percentage > 100) {
          isValid = false;
          setSnackbarMessage(
            `${section.EducDescription}: PercentageMarks must be between 1 and 100.`
          );
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
          break;
        }
      }
      if (section.CGPA) {
        const cgpa = parseFloat(section.CGPA);
        if (isNaN(cgpa) || cgpa < 1 || cgpa > 10) {
          isValid = false;
          setSnackbarMessage(
            `${section.EducDescription}: CGPA must be between 1 and 10.`
          );
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
          break;
        }
      }
    }

    return isValid;
  };


  const handleSubmit = async () => {
    if (!validateRequiredFields()) {
      return;
    }

    
    try {

      if (educationSections[0].EducationID) {
        educationSections.forEach((education, index) => {
          //console.log(education.EducationID);
           axios.put(
            `${process.env.REACT_APP_BASEURL}/edu/${education.EducationID}`,
            education,
            {
              // post
              headers: { Authorization: `Bearer ${user?.token}` },
            }
          );
        });
      } 
      
      else {
        console.log("Submitted Education Details:", educationSections);
        //await axios.post("process.env.REACT_APP_BASEURL + `/edu", educationSections, {
        await axios.post(
          `${process.env.REACT_APP_BASEURL}/edu`,
          educationSections,
          {
            // post
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        );
      }
      toast.success(
        "Education details saved successfully!"
      );
      // setSnackbarMessage("Education details saved successfully!");
      // setSnackbarSeverity("success");
      setSubmitted(false);

      // Save the submitted status in local storage

      localStorage.setItem("educationDetailsSubmitted", "true");

      //setSnackbarOpen(true);

      // Delay navigation by 2 seconds
      setTimeout(() => {
        navigate("/SkillsAndCertificationsPage");
      }, 2000);
    } catch (error) {
      console.error("Error during submission:", error);
      setSnackbarOpen(true);
      setSnackbarMessage("Failed to save education details.");
      setSnackbarSeverity("error");
    }

    // Open Snackbar
    //setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: "20px", width: "90%", margin: "0 auto" }}>
      {educationSections.map((section, index) => (
        <Accordion key={index} sx={{ marginBottom: "20px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography variant="h6">{section.EducDescription}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" required>
                    <Autocomplete
                      name="CountryID"
                      options={countries.map((country) => ({
                        value: country.CountryID,
                        label: country.CountryName,
                      }))}
                      value={
                        countries.find(
                          (country) =>
                            country.CountryID ===
                            educationSections[index].CountryID
                        )
                          ? {
                              value: countries.find(
                                (country) =>
                                  country.CountryID ===
                                  educationSections[index].CountryID
                              ).CountryID,
                              label: countries.find(
                                (country) =>
                                  country.CountryID ===
                                  educationSections[index].CountryID
                              ).CountryName,
                            }
                          : null
                      }
                      onChange={(event, newValue) =>
                        handleChange(
                          index,
                          "CountryID",
                          newValue ? newValue.value : ""
                        )
                      }
                      isDisabled={submitted}
                      isClearable
                      isSearchable
                      getOptionLabel={(option) => option.label || ""}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Country"
                          variant="outlined"
                          fullWidth
                          placeholder="Select Country"
                        />
                      )}
                      sx={{ width: "100%" }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    options={
                      states[index]?.map((state) => ({
                        value: state.StateID,
                        label: state.StateName,
                      })) || []
                    }
                    value={
                      states[index]?.find(
                        (state) => state.StateID === section.StateID
                      )
                        ? {
                            value: states[index].find(
                              (state) => state.StateID === section.StateID
                            ).StateID,
                            label: states[index].find(
                              (state) => state.StateID === section.StateID
                            ).StateName,
                          }
                        : null
                    }
                    onChange={(event, newValue) =>
                      handleStateChange(index, newValue)
                    }
                    isDisabled={!section.CountryID || submitted}
                    isClearable
                    isSearchable
                    getOptionLabel={(option) => option.label || ""}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="State*"
                        variant="outlined"
                        fullWidth
                        placeholder="Select State"
                      />
                    )}
                    sx={{ width: "100%" }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Board/University"
                    value={section.BoardORUniversity}
                    onChange={(e) =>
                      handleChange(index, "BoardORUniversity", e.target.value)
                    }
                    variant="outlined"
                    required
                    InputProps={{ readOnly: submitted }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Institute Name"
                    value={section.InstituteName}
                    onChange={(e) =>
                      handleChange(index, "InstituteName", e.target.value)
                    }
                    variant="outlined"
                    required
                    InputProps={{ readOnly: submitted }}
                  />
                </Grid>

                {(section.EducDescription === "PUC" ||
                  section.EducDescription === "Graduate" ||
                  section.EducDescription === "Post Graduate") && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Degree"
                        value={section.Degree}
                        onChange={(e) =>
                          handleChange(index, "Degree", e.target.value)
                        }
                        variant="outlined"
                        InputProps={{ readOnly: submitted }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={
                          section.EducDescription === "PUC"
                            ? "Subject"
                            : "Branch"
                        }
                        value={section.Branch}
                        onChange={(e) =>
                          handleChange(index, "Branch", e.target.value)
                        }
                        variant="outlined"
                        InputProps={{ readOnly: submitted }}
                      />
                    </Grid>
                  </>
                )}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Passed On"
                    InputLabelProps={{ shrink: true }}
                    value={
                      section.PassedOn ? section.PassedOn.split("T")[0] : ""
                    }
                    onChange={(e) =>
                      handleChange(index, "PassedOn", e.target.value)
                    }
                    variant="outlined"
                    required
                    InputProps={{ readOnly: submitted }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Percentage Marks"
                    value={section.PercentageMarks}
                    onChange={(e) =>
                      handleChange(index, "PercentageMarks", e.target.value)
                    }
                    variant="outlined"
                    InputProps={{ readOnly: submitted }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="CGPA"
                    value={section.CGPA}
                    onChange={(e) =>
                      handleChange(index, "CGPA", e.target.value)
                    }
                    variant="outlined"
                    InputProps={{ readOnly: submitted }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </AccordionDetails>
        </Accordion>
      ))}
    <Box sx={{ display: "flex", gap: 1,flexDirection:"column", alignItems:"flex-end"}}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={IsSubmitted}
        sx={{ marginTop: "20px" }}
      >
        Save and Next
      </Button>
      </Box>
      <NavigationRow>
        <Link to="/PersonalInformation" style={linkStyle} underline="none">
          PersonalInformationPage
        </Link>
        <Link to="/PreviousWorkDetailsPage" style={linkStyle} underline="none">
          Previous Work Details
        </Link>
        <Link to="/EducationDetailsPage" style={linkStyle} underline="none">
          Education Details
        </Link>

        <Link
          to="/SkillsAndCertificationsPage"
          style={linkStyle}
          underline="none"
        >
          Skills and Certifications
        </Link>
      </NavigationRow>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Center and top
        sx={{ "& .MuiSnackbarContent-root": { borderRadius: "8px" } }} // Optional: rounded corners
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <ToastContainer />
    </Box>
  );
};

export default EducationDetailsPage;
