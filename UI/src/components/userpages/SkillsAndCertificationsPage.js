import React, { useState, useEffect } from "react";
import {
  userUtility_isSubmitted,
  userUtility_isGyansysEmp,
} from "../../utility/user-utility";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";

// Styled component for the form card

const FormCard = styled(Card)(({ theme }) => ({
  width: "90%",
  margin: theme.spacing(2, "auto"),
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
}));

const NavigationRow = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(1),
  marginTop: "auto",
}));

const DocumentPreview = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: theme.spacing(2),
  gap: theme.spacing(2),
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(1),
  "& .MuiInputBase-root": {
    height: "40px", // Adjust the height of the input field
  },
}));

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
  padding: "8px 16px",
};

const SkillsAndCertificationsPage = () => {
  const [certifications, setCertifications] = useState([
    {
      Skills: "",
      CertificationName: "",
      CertificateLink: "",
      file: null,
    },
  ]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState(null);
  const [IsSubmitted, setIsSubmitted] = useState(true);

  const formSubmitted = async () => {
    setIsSubmitted(await userUtility_isSubmitted());
    console.log(IsSubmitted);
    return IsSubmitted;
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCertifications = [...certifications];
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [name]: value,
    };
    setCertifications(updatedCertifications);
  };

  const handleFileChange = (index, e) => {
    const { name, files } = e.target;
    const updatedCertifications = [...certifications];
    if (files.length) {
      updatedCertifications[index] = {
        ...updatedCertifications[index],
        [name]: files[0],
      };
      setCertifications(updatedCertifications);
    }
  };

  const handleRemoveFile = (index) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index].file = null;
    setCertifications(updatedCertifications);
  };

  const handleAddCertification = () => {
    setCertifications([
      ...certifications,
      {
        Skills: "",
        CertificationName: "",
        CertificateLink: "",
        file: null,
      },
    ]);
  };
  const navigate = useNavigate();
  // Check form status and disable the form if it's already submitted
  //1 UE
  useEffect(() => {
    formSubmitted();
    const storedUserData = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    setToken(storedToken);

    // Check if the form has already been submitted
    // #### **** we can not take from localStorage. need new code
    // const formSubmitted = localStorage.getItem("formSubmitted");
    // if (formSubmitted === "true") {
    //   setIsEditable(false);
    //   setIsDisabled(true);
    //   toast.info(
    //     "You have already submitted this form. Please wait for HR's response."
    //   );
    //   return; // No need to fetch if already marked as submitted
    //}

    if (storedUserData && storedToken) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);

      const fetchFormStatus = async () => {
        if (!parsedUserData.UserID || !storedToken) return;

        try {
          const response = await fetch(
            //process.env.REACT_APP_BASEURL + `/userforms/markallsubmitted/${parsedUserData.UserID}`,
            `${process.env.REACT_APP_BASEURL}/userforms/markallsubmitted/${parsedUserData.UserID}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();

            // If form already submitted, disable form and notify user
            if (data.submitted) {
              //**** commented below three line by me */
              // setIsEditable(false);
              // setIsDisabled(true);
              //localStorage.setItem("formSubmitted", "true"); // Save this status locally
              toast.info(
                "You have already submitted this form. Please wait for HR's response."
              );
            }
          } else {
            throw new Error("Failed to fetch form submission status");
          }
        } catch (error) {
          console.error("Error checking form submission status:", error);
        }
      };

      // fetchFormStatus();
    }
  }, []);
  // 2nd UE  --1
  useEffect(() => {
    const fetchCertificationsAndSkills = async () => {
      const storedUserData = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);

      if (!storedUserData || !storedToken) {
        console.error("User data or token not found");
        return;
      }

      const parsedUserData = JSON.parse(storedUserData);
      const userID = parsedUserData.UserID;

      if (!userID) {
        console.error("UserID not found");
        return;
      }

      try {
        const response = await fetch(
          //process.env.REACT_APP_BASEURL + `/skills/getskillsbyuserid/${userID}`,
          `${process.env.REACT_APP_BASEURL}/skills/getskillsbyuserid/${userID}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch skills and certifications");
        }

        const data = await response.json();
        console.log("Fetched data:", data); // Log the fetched data to see its structure

        if (Array.isArray(data) && data.length > 0) {
          // Map the data to fit the structure of the form fields
          const formattedCertifications = data.map((item) => ({
            Skills: item.Skills || "",
            CertificationName: item.CertificateName || "",
            CertificateLinkr: item.CertificateLink || "",
            file: null, // Assuming the file upload is manual and won't come from API
          }));

          // Set the mapped data to the form state
          setCertifications(formattedCertifications);
        } else {
          // If no data, initialize with one empty certification entry
          setCertifications([
            {
              Skills: "",
              CertificationName: "",
              CertificateLink: "",
              file: null,
            },
          ]);
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    // Fetch data once userData and token are available
    if (userData && token) {
      fetchCertificationsAndSkills();
    }
  }, [userData, token]);
  //3 UE
  useEffect(() => {
    // Retrieve the user data from localStorage
    const storedUserData = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (storedUserData && storedToken) {
      // Parse the JSON string into an object
      const parsedUserData = JSON.parse(storedUserData);

      const decodedToken = jwtDecode(storedToken);
      //console.log('Decoded Token:', decodedToken);

      // Set userData in state and log it
      setUserData(parsedUserData);
      //console.log('User Data:', parsedUserData);
      //console.log('User ID:', parsedUserData.UserID);
    }
  }, []);
  //UF 4
  useEffect(() => {
    const fetchData = async () => {
      if (!userData?.UserID || !token) {
        return;
      }

      try {
        console.log(
          "Fetching skills and certifications for user ID:",
          userData.UserID
        ); // Logging UserID before making the request

        //test code working using DB first approach
        // const response2 = await fetch(

        //   `${process.env.REACT_APP_BASEURL}/userforms/getPersonalDetailByID`,
        //   {
        //     method: "GET",
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );
        // const response22 = await response2.json();

        // -------end of test code

        // Fetch skills
        const skillsResponse = await fetch(
          // process.env.REACT_APP_BASEURL + `/skills/getskillsbyuserid/${userData.UserID}`,
          `${process.env.REACT_APP_BASEURL}/skills/getskillsbyuserid/${userData.UserID}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!skillsResponse.ok) {
          throw new Error("Failed to fetch skills");
        }

        const skillsData = await skillsResponse.json();
        console.log("Fetched skills:", skillsData); // Log the fetched skills data

        // Fetch certifications
        const certificationsResponse = await fetch(
          // process.env.REACT_APP_BASEURL + `/certificates/getCertificateByUserId/${userData.UserID}`,
          `${process.env.REACT_APP_BASEURL}/certificates/getCertificateByUserId/${userData.UserID}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!certificationsResponse.ok) {
          throw new Error("Failed to fetch certifications");
        }

        const certificationsData = await certificationsResponse.json();
        console.log("Fetched certifications:", certificationsData); // Log the fetched certifications data

        // Check if either skills or certifications contain data
        if (skillsData?.Skills?.length > 0 || certificationsData?.length > 0) {
          //commented by me ####
          // toast.success(
          //   "The skills and certifications have already been submitted."
          // );

          // setIsEditable(false); // Disable form fields
          // setIsDisabled(true); // Disable the submit button

          //#### change for button enable/disable,
          //Here we will check for submitted value
          //below two line commented by me ####
          // setIsEditable(true); // Disable form fields
          // setIsDisabled(false); // Disable the submit button

          // Update form data with fetched skills and certifications
          // below code is comented by me ####
          // setCertifications(certificationsData); // added
          setCertifications((certifications) =>
            certificationsData.map((cert, index) => ({
              ...cert,
              // Skills: skillsData?.Skills?.join(", ") || "", #### Skill commented
              Skills: certificationsData[index]?.Skills || "",
              CertificationName:
                certificationsData[index]?.CertificateName || "",
              CertificateLink: certificationsData[index]?.CertificateLink || "",
            }))
          );

          // Mark as submitted
          //below one line commented by me ####
          // localStorage.setItem("formSubmitted", "true");
        } else {
          console.log("No skills or certifications found for this user.");
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        toast.error("Failed to load skills and certifications.");
      }
    };

    // Fetch data once userData and token are available
    if (userData && token) {
      fetchData();
    }
  }, [userData, token, navigate]);

  const handleRemoveCertification = (index) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(updatedCertifications);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const userID = user ? user.UserID : null;

    if (!userID || !token) {
      console.error("UserID or token not found in localStorage");
      return;
    }

    // prepare arry for Certifications
    // #### added Skills:certification.Skills, by me
    const formattedCertifications = certifications.map((certification) => ({
      CertificationName: certification.CertificationName,
      Skills: certification.Skills,
      CertificateLink: certification.CertificateLink,
      UserID: userID,
      CreatedBy: userID,
      UpdatedBy: userID,
    }));

    // Prepare Skills -- Ignore it
    const allUserSkills = {
      Skills: certifications.map((cert) => cert.Skills).join(","),
      UserID: userID,
    };

    try {
      // Save certifications
      await axios.post(
        //process.env.REACT_APP_BASEURL + `/certificates`,
        `${process.env.REACT_APP_BASEURL}/certificates`,
        formattedCertifications,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Save skills
      // await axios.post(process.env.REACT_APP_BASEURL + `/skills/add`, allUserSkills, {
      await axios.post(
        `${process.env.REACT_APP_BASEURL}/skills/add`,
        allUserSkills,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Mark the form as submitted
      //The blow code should be moved to separate Final Submit button #### temporary commented
      // await axios.put(
      //  // process.env.REACT_APP_BASEURL + `/userforms/markallsubmitted/${userID}`,
      //  `${process.env.REACT_APP_BASEURL}/userforms/markallsubmitted/${userID}`,
      //   {},
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      // // Mark the form as submitted in localStorage
      // localStorage.setItem("formSubmitted", "true");

      toast.success("The forms have been submitted successfully");
      // setIsEditable(false);
      // setIsDisabled(true);

      //The above code should be moved to separate Final Submit button ####
    } catch (error) {
      toast.error("Error saving certifications or skills:", error);
    }
  };
  const finalSubmit = async () => {
    // Mark the form as submitted
    //The blow code should be moved to separate Final Submit button #### temporary commented
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userID = decoded.UserID;
    await axios.put(
      // process.env.REACT_APP_BASEURL + `/userforms/markallsubmitted/${userID}`,
      `${process.env.REACT_APP_BASEURL}/userforms/markallsubmitted/${userID}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setIsSubmitted(true);
    toast.info("You have submitted this form. Please wait for HR's response.");
  };

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", minHeight: "80vh" }}
    >
      <FormCard sx={{ width: "70%" }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom align="center">
            Skills and Certifications
          </Typography>
          <form onSubmit={handleSave}>
            {certifications.map((certification, index) => (
              <Card
                key={index}
                sx={{ marginBottom: 2, padding: 2, position: "relative" }}
              >
                {index > 0 && (
                  <IconButton
                  disabled={IsSubmitted}
                    aria-label="delete"
                    onClick={() => handleRemoveCertification(index)}
                    sx={{ position: "absolute", right: 16, top: 8 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
                <Grid
                  container
                  spacing={2}
                  sx={{ marginTop: index > 0 ? 4 : 0 }}
                >
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      label="Skills"
                      name="Skills"
                      variant="outlined"
                      fullWidth
                      type="string"
                      value={certification.Skills}
                      onChange={(e) => handleInputChange(index, e)}
                      InputProps={{ readOnly: !isEditable }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      label="Certification Name"
                      name="CertificationName"
                      variant="outlined"
                      fullWidth
                      type="string"
                      value={certification.CertificationName}
                      // value={IsSubmitted}
                      onChange={(e) => handleInputChange(index, e)}
                      InputProps={{ readOnly: !isEditable }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      label="Certificate Link"
                      name="CertificateLink"
                      variant="outlined"
                      fullWidth
                      type="string"
                      value={certification.CertificateLink}
                      onChange={(e) => handleInputChange(index, e)}
                      InputProps={{ readOnly: !isEditable }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* Upload Certificate hide by me #### */}
                    {/* <Button
                      variant="outlined"
                      component="label"
                      disabled={!isEditable}
                    >
                      Upload Certificate
                      <input
                        type="file"
                        hidden
                        name="file"
                        onChange={(e) => handleFileChange(index, e)}
                      />
                    </Button> */}
                    {certification.file && (
                      <DocumentPreview>
                        <Typography>{certification.file.name}</Typography>
                        <Button
                          size="small"
                          variant="contained"
                          color="secondary"
                          onClick={() => handleRemoveFile(index)}
                          disabled={!isEditable}
                        >
                          Remove
                        </Button>
                      </DocumentPreview>
                    )}
                  </Grid>
                </Grid>
              </Card>
            ))}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 2,
              }}
            >
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleAddCertification}
                disabled={IsSubmitted}
              >
                Add Certification
              </Button>

              <Button
                variant="contained"
                sx={{ mt: 2 , paddingLeft:7 , paddingRight:7 }}
                type="submit"
                disabled={IsSubmitted} // need to check from API i.e. formSubmitted is true or false
              >
                 Save
              </Button>
            </Box>

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
              >
              <Button
                variant="contained"
                sx={{ mt: 2, bgcolor: "orange" }}
                onClick={finalSubmit}
                //type="submit"
                disabled={IsSubmitted} // need to check from API i.e. formSubmitted is true or false
              >
                Final Submit
              </Button>
            </Box>
          </form>
        </CardContent>
      </FormCard>

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
        {/* <Link to="/SourceInformationPage" style={linkStyle} underline="none">
            Source Information
          </Link> */}
        <Link
          to="/SkillsAndCertificationsPage"
          style={linkStyle}
          underline="none"
        >
          Skills and Certifications
        </Link>
      </NavigationRow>

      <ToastContainer />
    </Container>
  );
};

export default SkillsAndCertificationsPage;
