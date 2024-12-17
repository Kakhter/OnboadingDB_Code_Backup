import { UserContext } from "./context/UserContext";
import {userUtility_isSubmitted,userUtility_isGyansysEmp} from "../../utility/user-utility";
import React, { useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { format, parseISO } from "date-fns";
import axios from "axios";
import {
  Box,
  Autocomplete,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  MenuItem,
  Container,
  // Link,
} from "@mui/material";

import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
// Styled component for the form card

const FormCard = styled(Card)(({ theme }) => ({
  width: "90%",
  margin: theme.spacing(2, "auto"),
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  // backgroundColor: '#f5f5f5', // Background color of the card
  boxShadow: theme.shadows[3], // Card shadow
}));

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
  padding: "8px 16px",
};

const PersonalInformationPage = () => {
  const { user } = useContext(UserContext);
  const[newCandidate, setNewCandidate] =useState(true);

  const [formData, setFormData] = useState({
    UserID: user ? user.UserID : 0,
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Gender: "",
    BirthCountryID: 0,
    BloodGroup: "",
    MaritalStatus: "",
    DOB: "",
    BirthPlaceCityID: 0,
    BirthStateID: 0,
    Nationality: "",
    FatherName: "",
    SpouseName: "",
    GuardianName: "",
    AadharNo: "",
    Submitted: false,
    PanNo: "",
    CreatedBy: 0,
    CreatedDate: "",
    UpdatedBy: 0,
    UpdatedDate: "",
    OnSiteExperience: false,
    photo: null,
    PermanentAddress:"",
    CurrentAddress:"",
    PassportNumber:"",
    ContactNumber:"",
    NewCandidate:false,
  });

  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const NavigationRow = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    marginTop: theme.spacing(4),
    // backgroundColor: '#e0e0e0', // Background color of the navigation row
    padding: theme.spacing(1, 0), // Padding for the navigation row
  }));

  const [userData, setUserData] = useState(null);
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [nationalities, setNationalities] = useState([]);
  const [isEditable, setIsEditable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");
  const [isValid, setIsValid] = useState({ aadhaar: true, pan: true });
  

  const [IsSubmitted, setIsSubmitted] = useState(true);
 

  // useEffect(async()=> {
  //    IsSubmitted=  await userUtility_isSubmitted();
  //    console.log(IsSubmitted);
  // },[IsSubmitted])
  

 // new code ####
 // for phot reload

const formSubmitted =async ()=>{
  setIsSubmitted(await userUtility_isSubmitted());
  console.log(IsSubmitted);
  return IsSubmitted;
}

 useEffect(() => {
  

  const fetchData = async () => {
    
    setIsDisabled(formSubmitted());

    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }
   //#### update url
    try {
      const response = await axios.get(
       // `http://localhost:3000/users/getUserFormsDetails/${user.UserID}`,
        `${process.env.REACT_APP_BASEURL}/users/getUserFormsDetails/${user.UserID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const documents = response.data?.formData?.documents || [];

        const personalPhoto = documents.find(
          (doc) => doc.DocumentTypeMaster?.DocType === "Personal Photo"
        );

        if (personalPhoto && personalPhoto.DocScanned?.data) {
          const blob = new Blob(
            [new Uint8Array(personalPhoto.DocScanned.data)],
            { type: personalPhoto.mimeType }
          );
          const url = URL.createObjectURL(blob);

          console.log(url);
          setFormData((prev) => ({
            ...prev,
            photo: url,
          }));
        } else {
          console.error("Personal photo not found in documents");
        }
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  fetchData();
}, [user.UserID]);

  useEffect(() => {
    // Retrieve the user data from localStorage
    const storedUserData = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (storedUserData && storedToken) {
      // Parse the JSON string into an object
      const parsedUserData = JSON.parse(storedUserData);

      const decodedToken = jwtDecode(storedToken);
      // console.log('Decoded Token:', decodedToken);

      setUserData(parsedUserData);

      const fullName = parsedUserData.FullName || "";
      const nameParts = fullName.trim().split(" ");

      let firstName = "";
      let middleName = "";
      let lastName = "";

      if (nameParts.length > 0) {
        firstName = nameParts[0];
        if (nameParts.length > 2) {
          lastName = nameParts[nameParts.length - 1];
          middleName = nameParts.slice(1, -1).join(" ");
        } else if (nameParts.length === 2) {
          lastName = nameParts[1];
        }
      }

      setFormData({
        FirstName: firstName || "",
        MiddleName: middleName || "",
        LastName: lastName || "",
      });
    }
  }, []);

  // #### new use effect


  useEffect(() => {
    const fetchData = async () => {
      if (!user?.UserID || !token) return;

      try {
        const response = await fetch(
         // process.env.REACT_APP_BASEURL + `/personaldetails/${user.UserID}`,
          `${process.env.REACT_APP_BASEURL}/personaldetails/${user.UserID}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const existingData = await response.json();
          console.log(existingData, "pppp");
          setFormData(existingData);
          //new code ####
          setNewCandidate(false);

          if (existingData.Submitted) {
            setIsDisabled(IsSubmitted);  
          }

          //Hot fixing ## we should allow to exit but take time ####
          // if (existingData.UserID) {
          //   setIsDisabled(true);  
          // }
          setSelectedCountry(existingData.BirthCountryID);
          setSelectedState(existingData.BirthStateID);
          setSelectedCity(existingData.BirthPlaceCityID);

          setFormData((prev) => ({
            ...prev,
            DOB: existingData.DOB
              ? format(parseISO(existingData.DOB), "yyyy-MM-dd")
              : "",
            Nationality: existingData.Nationality,
          }));

          setIsEditable(true);
        }
      } catch (error) {
        console.error("Error fetching personal details:", error);
      }
    };

    fetchData();
  }, [user, token]);

  const validateAadhaar = (number) => {
    const numericValue = number.replace(/-/g, "");
    return /^\d{12}$/.test(numericValue);
  };
  const validatePan = (number) => {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(number);
  };

 // const COUNTRY_API_URL = "process.env.REACT_APP_BASEURL + `/countries";
  const COUNTRY_API_URL = `${process.env.REACT_APP_BASEURL}/countries`;
  
  useEffect(() => {
    const fetchCountries = async () => {
      const token = user?.token;
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await fetch(COUNTRY_API_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCountries(data);
        setNationalities([
          ...new Set(
            data.map((country) => ({
              NationalityID: country.CountryID,
              Nationality: country.Nationality,
            }))
          ),
        ]);

       
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, [user]);

  useEffect(() => {
    if (selectedCountry) {
      const fetchStates = async () => {
        const token = user?.token;
        if (!token) {
          console.error("No token found");
          return;
        }

        try {
          const response = await fetch(
            //process.env.REACT_APP_BASEURL + `/states/country/${selectedCountry}`,
            `${process.env.REACT_APP_BASEURL}/states/country/${selectedCountry}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          setStates(data);
        } catch (error) {
          console.error("Error fetching states:", error);
        }
      };

      fetchStates();
    }
  }, [selectedCountry, user]);

  useEffect(() => {
    if (selectedState) {
      const fetchCities = async () => {
        const token = user?.token;
        if (!token) {
          console.error("No token found");
          return;
        }

        try {
          const response = await fetch(
            `${process.env.REACT_APP_BASEURL}/cities/state/${selectedState}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          setCities(data);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      };

      fetchCities();
    }
  }, [selectedState, user]);
  const handleCountryChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : "";
    setSelectedCountry(value);
    setSelectedState("");
    setSelectedCity("");
    setFormData((prevFormData) => ({
      ...prevFormData,
      BirthCountryID: value,
    }));
  };
  const handleStateChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : "";
    setSelectedState(value);
    setSelectedCity("");
    setFormData((prevFormData) => ({
      ...prevFormData,
      BirthStateID: value,
    }));
  };
  const handleCityChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : "";
    setSelectedCity(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      BirthPlaceCityID: value,
    }));
  };
  const handleNationalityChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : "";
    setFormData((prevFormData) => ({
      ...prevFormData,
      Nationality: value,
    }));
  };
  const validate = () => {
    const newErrors = {};
    let valid = true;
    [
      "FirstName",
      "LastName",
      "BloodGroup",
      "MaritalStatus",
      "DOB",
      "Gender",
      "Nationality",
    ].forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
        valid = false;
      }
    });
    const cleanedAadharNo = formData.AadharNo
      ? formData.AadharNo.replace(/-/g, "")
      : "";
    if (cleanedAadharNo && !/^\d{12}$/.test(cleanedAadharNo)) {
      newErrors.AadharNo = "Aadhaar Number must be 12 digits";
      valid = false;
    }

    if (formData.PanNo && !/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(formData.PanNo)) {
      newErrors.PanNo =
        "PAN Number must be 10 characters in the format AAAAA9999A";
      valid = false;
    }

    if (formData.BirthCountryID) {
      if (!formData.BirthStateID) {
        newErrors.BirthState = "Please select a state";
        valid = false;
      }
      if (!formData.BirthPlaceCityID) {
        newErrors.BirthCity = "Please select a city";
        valid = false;
      }
    }
    if (!formData.photo) {
      newErrors.photo = "Passport photo is required";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "AadharNo") {
      const numericValue = value.replace(/\D/g, "");
      formattedValue = numericValue
        .replace(/(\d{4})(?=\d)/g, "$1-")
        .slice(0, 14);
      setIsValid((prevState) => ({
        ...prevState,
        aadhaar: validateAadhaar(numericValue),
      }));
    } else if (name === "PanNo") {
      formattedValue = value.toUpperCase();
      setIsValid((prevState) => ({
        ...prevState,
        pan: validatePan(formattedValue),
      }));
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: formattedValue,
      UserID: user.UserID,
      CreatedBy: user.UserID,
      UpdatedBy: user.UserID,
      OnSiteExperience: false,
    }));
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       photo: file,
  //     }));
  //   }
  // };
// new code ####
// for phot 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        photo: file,
        photoPreview:url
      }));
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate(); // check later
    if (!isValid) {
      console.log("Form has errors.");
      toast.error("Please fix the errors before submitting the form.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const userString = localStorage.getItem("user");
    if (!userString) {
      setError("User data not found in local storage.");
      setIsSubmitting(false);
      return;
    }
    const user = JSON.parse(userString);
    const userId = user.UserID;
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      setError("User ID or token not found.");
      alert("No authentication token and User ID found. Please log in again.");
      setIsSubmitting(false);
      return;
    }

    const personalFormData = {
      ...formData,
    };
    personalFormData.NewCandidate=newCandidate;
    const photoFormData = new FormData();
    photoFormData.append("DocScanned", formData.photo);
    photoFormData.append("DocTypeID", "1");
    photoFormData.append("IDNumber", `USER${user.UserID}P`);
    //photoFormData.append("mimeType","image/png");

    try {
      const personalResponse = await fetch(
       // "process.env.REACT_APP_BASEURL + `/personaldetails",
       `${process.env.REACT_APP_BASEURL}/personaldetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify(personalFormData),
        }
      );

      if (!personalResponse.ok) {
        throw new Error("Personal details submission failed.");
      }

      const photoResponse = await fetch(
        //"process.env.REACT_APP_BASEURL + `/documentTran/add",
        `${process.env.REACT_APP_BASEURL}/documentTran/add`,
        {
          method: "POST",
          body: photoFormData,
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      // commented by khalid ####
      // if (!photoResponse.ok) {
      //   const errorData = await photoResponse.json();
      //   throw new Error(
      //     errorData.message || "An error occurred while uploading the photo."
      //   );
      // }

      // const photoData = await photoResponse.json();
      // console.log("Success:", photoData);

      toast.success("Form saved successfully");

      setTimeout(() => {
        setIsSubmitting(false);
        setFormData((prevState) => ({
          ...prevState,
        }));
        setIsEditable(false);
        setIsDisabled(IsSubmitted);
        navigate("/PreviousWorkDetailsPage");
      }, 2000);
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <FormCard>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Personal Information
          </Typography>
          <form sx={{ margin: "0px  10px" }} onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" gap={2}>
                <TextField
                  label="First Name*"
                  name="FirstName"
                  variant="outlined"
                  fullWidth
                  value={formData.FirstName}
                  onChange={handleChange}
                  InputProps={{ readOnly: !isEditable }}
                  error={!!errors.FirstName}
                  helperText={errors.FirstName}
                />
                <TextField
                  label="Middle Name"
                  name="MiddleName"
                  variant="outlined"
                  fullWidth
                  value={formData.MiddleName}
                  onChange={handleChange}
                  sx={{ width: 300, height: 10 }} 
                  InputProps={{ readOnly: !isEditable }}
                />
              </Box>
              <Box display="flex" gap={2} width="100%">
                <TextField
                  label="Last Name*"
                  name="LastName"
                  variant="outlined"
                  fullWidth
                  value={formData.LastName}
                  onChange={handleChange}
                  error={!!errors.LastName}
                  helperText={errors.LastName}
                  InputProps={{ readOnly: !isEditable }}
                />
                <TextField
                  select
                  label="Gender*"
                  name="Gender"
                  variant="outlined"
                  fullWidth
                  value={formData.Gender}
                  onChange={handleChange}
                  error={!!errors.Gender}
                  helperText={errors.Gender}
                  disabled={!isEditable}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Box>

              <Box sx={{ width: "100%" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      name="BirthCountryID"
                      options={countries.map((country) => ({
                        value: country.CountryID,
                        label: country.CountryName,
                      }))}
                      disabled={!isEditable}
                      value={
                        countries.find(
                          (country) => country.CountryID === selectedCountry
                        )
                          ? {
                              value: countries.find(
                                (country) =>
                                  country.CountryID === selectedCountry
                              ).CountryID,
                              label: countries.find(
                                (country) =>
                                  country.CountryID === selectedCountry
                              ).CountryName,
                            }
                          : null
                      }
                      onChange={(event, newValue) =>
                        handleCountryChange(newValue)
                      }
                      isDisabled={!isEditable}
                      isClearable
                      isSearchable
                      getOptionLabel={(option) => option.label || ""}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Birth Country*"
                          variant="outlined"
                          fullWidth
                          placeholder="Select Birth Country"
                          error={!!errors.BirthCountry}
                          helperText={errors.BirthCountry}
                          onKeyDown={handleKeyDown}
                        />
                      )}
                      sx={{ width: "100%" }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      name="BirthStateID"
                      options={states.map((state) => ({
                        value: state.StateID,
                        label: state.StateName,
                      }))}
                      disabled={!isEditable}
                      value={
                        states.find((state) => state.StateID === selectedState)
                          ? {
                              value: states.find(
                                (state) => state.StateID === selectedState
                              ).StateID,
                              label: states.find(
                                (state) => state.StateID === selectedState
                              ).StateName,
                            }
                          : null
                      }
                      onChange={(event, newValue) =>
                        handleStateChange(newValue)
                      }
                      isDisabled={!isEditable || !selectedCountry}
                      isClearable
                      isSearchable
                      getOptionLabel={(option) => option.label || ""}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Birth State*"
                          variant="outlined"
                          fullWidth
                          placeholder="Select Birth State"
                          error={!!errors.BirthState}
                          helperText={errors.BirthState}
                          onKeyDown={handleKeyDown}
                        />
                      )}
                      sx={{ width: "100%" }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      matchFrom='start'
                      name="BirthPlaceCityID"
                      options={cities.map((city) => ({
                        value: city.CityID,
                        label: city.CityName,
                      }))}
                      disabled={!isEditable}
                      value={
                        cities.find((city) => city.CityID === selectedCity)
                          ? {
                              value: cities.find(
                                (city) => city.CityID === selectedCity
                              ).CityID,
                              label: cities.find(
                                (city) => city.CityID === selectedCity
                              ).CityName,
                            }
                          : null
                      }
                      onChange={(event, newValue) => handleCityChange(newValue)}
                      isDisabled={!isEditable || !selectedState}
                      isClearable
                      isSearchable
                      getOptionLabel={(option) => option.label || ""}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Birth District*"
                          variant="outlined"
                          fullWidth
                          placeholder="Select Birth District"
                          error={!!errors.BirthCity}
                          helperText={errors.BirthCity}
                          onKeyDown={handleKeyDown}
                        />
                      )}
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      name="Nationality"
                      // options={nationalities.map((country) => ({   //nationalities  countries
                      //   value: country.CountryID,
                      //   label: country.Nationality,
                      // }))}
                      options={countries
                        .filter(
                          (value, index, self) =>
                            index ===
                            self.findIndex(
                              (t) => t.Nationality === value.Nationality
                            )
                        )
                        .map((country) => ({
                          value: country.CountryID,
                          label: country.Nationality,
                        }))}
                      disabled={!isEditable}
                      value={
                        countries.find(
                          (country) =>
                            country.CountryID === Number(formData.Nationality)
                        )
                          ? {
                              value: countries.find(
                                (country) =>
                                  country.CountryID === Number(formData.Nationality)
                              ).CountryID,
                              label: countries.find(
                                (country) =>
                                  country.CountryID === Number(formData.Nationality)
                              ).Nationality,
                            }
                          : null
                      }
                      onChange={(event, newValue) =>
                        handleNationalityChange(newValue)
                      }
                      isDisabled={!isEditable}
                      isClearable
                      isSearchable
                      getOptionLabel={(option) => option.label || ""}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Nationality*"
                          variant="outlined"
                          fullWidth
                          placeholder="Select Nationality"
                          error={!!errors.Nationality}
                          helperText={errors.Nationality}
                          onKeyDown={handleKeyDown}
                        />
                      )}
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                </Grid>
              </Box>
              {/* new box code by me #### */}
              
              <Box display="flex" gap={2}>
                <TextField
                  label="Permanent Address"
                  name="PermanentAddress"
                  variant="outlined"
                  fullWidth
                  
                  value={formData.PermanentAddress}
                  onChange={handleChange}
                  InputProps={{ readOnly: !isEditable }}
                  error={!!errors.PermanentAddress}
                  helperText={errors.PermanentAddress}
                />
                <TextField
                  label="Current Address"
                  name="CurrentAddress"
                  variant="outlined"
                  fullWidth
                  value={formData.CurrentAddress}
                  onChange={handleChange}
                  //sx={{ width: 300, height: 10 }} 
                  InputProps={{ readOnly: !isEditable }}
                  error={!!errors.CurrentAddress}
                  helperText={errors.CurrentAddress}
                />
              </Box>

              {/* end of new box code by me #### */}

              <Box display="flex" gap={2}>
                <TextField
                  label="Date of Birth*"
                  name="DOB"
                  id="DOB"
                  variant="outlined"
                  type="date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formData.DOB}
                  onChange={handleChange}
                  error={!!errors.DOB}
                  helperText={errors.DOB}
                  InputProps={{ readOnly: !isEditable }}
                  max={today}
                />
                <TextField
                  select
                  label="Blood Group*"
                  name="BloodGroup"
                  id="BloodGroup"
                  variant="outlined"
                  fullWidth
                  value={formData.BloodGroup}
                  onChange={handleChange}
                  error={!!errors.BloodGroup}
                  helperText={errors.BloodGroup}
                  disabled={!isEditable}
                >
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="AB+">AB+</MenuItem>
                  <MenuItem value="AB-">AB-</MenuItem>
                  <MenuItem value="O+">O+</MenuItem>
                  <MenuItem value="O-">O-</MenuItem>
                </TextField>
              </Box>
              <Box display="flex" gap={2}>
                <TextField
                  select
                  label="Marital Status*"
                  name="MaritalStatus"
                  id="MaritalStatus"
                  variant="outlined"
                  fullWidth
                  value={formData.MaritalStatus}
                  onChange={handleChange}
                  error={!!errors.MaritalStatus}
                  helperText={errors.MaritalStatus}
                  disabled={!isEditable}
                >
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Married">Married</MenuItem>
                  <MenuItem value="Divorced">Divorced</MenuItem>
                  <MenuItem value="Widowed">Widowed</MenuItem>
                </TextField>
              </Box>
              <Box display="flex" gap={2}>
                <TextField
                  label="Aadhaar Number"
                  id="AadharNo"
                  name="AadharNo"
                  variant="outlined"
                  fullWidth
                  value={formData.AadharNo}
                  onChange={handleChange}
                  error={!!errors.AadharNo}
                  helperText={errors.AadharNo}
                  InputProps={{ readOnly: !isEditable }}
                />
                <TextField
                  label="PAN Number"
                  id="PanNo"
                  name="PanNo"
                  variant="outlined"
                  fullWidth
                  value={formData.PanNo}
                  onChange={handleChange}
                  error={!!errors.PanNo}
                  helperText={errors.PanNo}
                  InputProps={{ readOnly: !isEditable }}
                />
              </Box>
              {/* new box code by me #### */}
              
              <Box display="flex" gap={2}>
                <TextField
                  label="Passport Number"
                  id="PassportNumber"
                  name="PassportNumber"
                  variant="outlined"
                  fullWidth
                  value={formData.PassportNumber}
                  onChange={handleChange}
                  InputProps={{ readOnly: !isEditable }}
                  //error={!!errors.PassportNumber}
                  //helperText={errors.PassportNumber}
                />
                <TextField
                  label="Contact Number"
                  name="ContactNumber"
                  variant="outlined"
                  fullWidth
                  value={formData.ContactNumber}
                  onChange={handleChange}
                  //sx={{ width: 300, height: 10 }} 
                  InputProps={{ readOnly: !isEditable }}
                  //error={!!errors.ContactNumber}
                  //helperText={errors.ContactNumber}
                />
              </Box>

              {/* end of new box code by me #### */}
              {/* <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
              >
                <Button variant="contained" component="label">
                  Upload Photo
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>
                {errors.photo && (
                  <p style={{ color: "red", marginTop: "8px" }}>
                    {errors.photo}
                  </p>
                )}
                {formData.photo && (
                  <img
                    src={URL.createObjectURL(formData.photo)}
                    alt="Profile Preview"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                )}
              </Box> */}
              {/*
                 new code ####
                 photot update
              */}

<Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
              >
                {errors.photo && (
                  <p style={{ color: "red", marginTop: "8px" }}>
                    {errors.photo}
                  </p>
                )}
                {formData.photo && (
                  <img
                    loading="lazy"
                    src={formData.photoPreview || formData.photo}
                    alt="Profile Preview"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                )}
                <Button
                  variant="contained"
                  component="label"
                  disabled={IsSubmitted}
                >
                  Upload Photo
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>
              </Box>

              <Box sx={{ display: "flex", gap: 1,flexDirection:"column", alignItems:"flex-end"}}>
                <Button
                  id="btnsubmit"
                  type="submit"
                  disabled={IsSubmitted}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Save and Next
                </Button>
              </Box>
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

export default PersonalInformationPage;


