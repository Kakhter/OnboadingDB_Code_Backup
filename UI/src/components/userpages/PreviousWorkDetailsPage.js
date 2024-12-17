///////
import React, { useState, useEffect } from "react";
import {userUtility_isSubmitted,userUtility_isGyansysEmp} from "../../utility/user-utility";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Link as MuiLink,
  Autocomplete,
  Popper,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { Select, MenuItem, FormControl } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Delete as DeleteIcon,
  RemoveRedEye as RemoveRedEyeIcon,
} from "@mui/icons-material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// Styled component for the form card
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { User } from "@phosphor-icons/react";


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
  marginTop: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(1),
}));
const CustomTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(1),
  "& .MuiInputBase-root": {
    height: "40px", // Adjust the height of the input field
  },
}));

const StyledLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.primary, // Change this to your desired color for the link
  padding: "8px 16px",
  "&:hover": {},
}));

const PreviousWorkDetailsPage = () => {
  const [companyDetails, setCompanyDetails] = useState([
    {
      PreviousWorkID: "",
      companyName: "",
      address: "",
      employmentType: "",
      designation: "",
      compensation: "",
      currency: "",
      hrName: "",
      hrMobileNumber: "",
      hrEmail: "",
      hrTelephoneNumber: "",
      reportingManagerName: "",
      reportingManagerMobile: "",
      reportingManagerTelephone: "",
      reportingManagerEmail: "",
      reportingManagerDesignation: "",
      reportingStartDate: "",
      reportingEndDate: "",
      startDate: "",
      endDate: "",
      responsibilities: "",
      releasingLetter: null,
      releasingLetterUrl: null,
      experienceLetter: null,
      experienceLetterUrl: null,
      documentPresent: null,
      expectedDocumentDate: "",
    },
  ]);

  const navigate = useNavigate();
  const [IsSubmitted, setIsSubmitted] = useState(true);
  const uploadDocument = async (docTypeID, file, idNumber,PreviousWorkID) => {
    const formData = new FormData();
    formData.append("DocTypeID", docTypeID);
    formData.append("IDNumber", idNumber);
    formData.append("DocScanned", file);
    formData.append("PreviousWorkID",PreviousWorkID);  //
    //alert(company.PreviousWorkID);
    try {
      const response = await axios.post(
        //"process.env.REACT_APP_BASEURL + `/documentTran/add",
        `${process.env.REACT_APP_BASEURL}/documentTran/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.DocID; //  DocID is returned from the API
    } catch (error) {
      console.error("Error uploading document:", error);
      return null;
    }
  };




  const [expandedEntries, setExpandedEntries] = useState([true]); // Track expanded state for each entry
  const [workedAtGyanSys, setWorkedAtGyanSys] = useState(false); // Checkbox state
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isEditable, setIsEditable] = useState(true);

  const [gyanSysEntry, setGyanSysEntry] = useState({
    companyName: "GyanSys",
    designation: "",
    employeeId: "",
    dateOfJoining: "",
    dateOfRelieving: "",
  });
  const [errors, setErrors] = useState({});

  const formSubmitted =async ()=>{
    setIsSubmitted(await userUtility_isSubmitted());
    console.log(IsSubmitted);
    return IsSubmitted;
  }


  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCompanyDetails = [...companyDetails];
    updatedCompanyDetails[index] = {
      ...updatedCompanyDetails[index],
      [name]: value,
    };
    setCompanyDetails(updatedCompanyDetails);
  };

  const handleFileChange = (index, e) => {
    const { name, files } = e.target;
    const updatedCompanyDetails = [...companyDetails];

    if (files.length) {
      const file = files[0];
      const fileUrl = URL.createObjectURL(file); // Generate the file URL

      //console.log('File URL:', fileUrl);
      updatedCompanyDetails[index] = {
        ...updatedCompanyDetails[index],
        [name]: file,
        [`${name}Url`]: fileUrl, // Store the URL in the state
      };

      setCompanyDetails(updatedCompanyDetails);
    }
  };

  const handleRemoveFile = (index, fileType) => {
    const updatedCompanyDetails = [...companyDetails];
    updatedCompanyDetails[index] = {
      ...updatedCompanyDetails[index],
      [fileType]: null,
    };
    setCompanyDetails(updatedCompanyDetails);
  };
  const handleDocumentChange = (index, event) => {
    const newCompanyDetails = [...companyDetails];
    newCompanyDetails[index].documentPresent = event.target.value;
    setCompanyDetails(newCompanyDetails);
  };

  const handleAddCompany = () => {
    setCompanyDetails([
      ...companyDetails,
      {
        PreviousWorkID: "",
        companyName: "",
        address: "",
        employmentType: "",
        designation: "",
        compensation: "",
        currency: "",
        hrName: "",
        hrMobileNumber: "",
        hrEmail: "",
        hrTelephoneNumber: "",
        reportingManagerName: "",
        reportingManagerMobile: "",
        reportingManagerTelephone: "",
        reportingManagerEmail: "",
        reportingManagerDesignation: "",
        reportingStartDate: "",
        reportingEndDate: "",
        startDate: "",
        endDate: "",
        onsiteProjects: "",
        releasingLetter: null,
        releasingLetterUrl: null,
        experienceLetter: null,
        experienceLetterUrl: null,
        documentPresent: null,
        expectedDocumentDate: "",
      },
    ]);
    setExpandedEntries([...expandedEntries, true]); // Add a new entry for expanded state
  };

  // const fetchCompanyAndDocumentData = async () => {
  const handleRemoveCompany = async (index) => {
    const deleteRecordID = companyDetails[index].PreviousWorkID;
    const updatedCompanyDetails = companyDetails.filter((_, i) => i !== index);

    if (deleteRecordID) {
      // use try catch
      let text = "Press a button!\nEither OK to Delete or Cancel.";
      if (window.confirm(text) == true) {
        fetch(
          `${process.env.REACT_APP_BASEURL}/previousworks/${deleteRecordID}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCompanyDetails(updatedCompanyDetails);
      }
    }
   
  };

  const handleToggleExpand = (index) => {
    const updatedExpandedEntries = [...expandedEntries];
    updatedExpandedEntries[index] = !updatedExpandedEntries[index]; // Toggle the expanded state
    setExpandedEntries(updatedExpandedEntries);
  };

  const handleMoveUp = (index) => {
    if (index > 0) {
      const updatedEntries = [...companyDetails];
      [updatedEntries[index], updatedEntries[index - 1]] = [
        updatedEntries[index - 1],
        updatedEntries[index],
      ];
      setCompanyDetails(updatedEntries);

      // Move the expanded state along with the entry
      const updatedExpandedEntries = [...expandedEntries];
      [updatedExpandedEntries[index], updatedExpandedEntries[index - 1]] = [
        updatedExpandedEntries[index - 1],
        updatedExpandedEntries[index],
      ];
      setExpandedEntries(updatedExpandedEntries);
    }
  };

  const handleMoveDown = (index) => {
    if (index < companyDetails.length - 1) {
      const updatedEntries = [...companyDetails];
      [updatedEntries[index], updatedEntries[index + 1]] = [
        updatedEntries[index + 1],
        updatedEntries[index],
      ];
      setCompanyDetails(updatedEntries);

      // Move the expanded state along with the entry
      const updatedExpandedEntries = [...expandedEntries];
      [updatedExpandedEntries[index], updatedExpandedEntries[index + 1]] = [
        updatedExpandedEntries[index + 1],
        updatedExpandedEntries[index],
      ];
      setExpandedEntries(updatedExpandedEntries);
    }
  };
  const validateForm = () => {
    const newErrors = {};

    // Validate company entries
    companyDetails.forEach((entry, index) => {
      if (
        entry.documentPresent === undefined ||
        entry.documentPresent === null
      ) {
        newErrors[`documentPresent_${index}`] = "Select one option";
      } else if (entry.documentPresent === "YES") {
        if (!entry.releasingLetter)
          newErrors[`releasingLetter_${index}`] =
            "Releasing Letter is required";
        if (!entry.experienceLetter)
          newErrors[`experienceLetter_${index}`] =
            "Experience Letter is required";
      } else if (entry.documentPresent === "NO") {
        // Validation for expectedDocumentDate can be added here if required
      }

      if (!entry.companyName)
        newErrors[`companyName_${index}`] = "Company Name is required";
      if (!entry.address) newErrors[`address_${index}`] = "Address is required";
      if (!entry.employmentType)
        newErrors[`employmentType_${index}`] = "Employment Type is required";
      if (!entry.designation)
        newErrors[`designation_${index}`] = "Designation is required";
      if (!entry.compensation)
        newErrors[`compensation_${index}`] = "Compensation is required";
      if (!entry.compensation)
        newErrors[`currency_${index}`] = "Currency is required";
      if (!entry.hrName) newErrors[`hrName_${index}`] = "HR Name is required";
      if (!entry.hrMobileNumber)
        newErrors[`hrMobileNumber_${index}`] = "HR Mobile Number is required";
      if (!entry.hrEmail)
        newErrors[`hrEmail_${index}`] = "HR Email is required";
      if (!entry.reportingManagerName)
        newErrors[`reportingManagerName_${index}`] =
          "Reporting Manager Name is required";
      if (!entry.reportingManagerMobile)
        newErrors[`reportingManagerMobile_${index}`] =
          "Reporting Manager Mobile is required";
      if (!entry.reportingManagerEmail)
        newErrors[`reportingManagerEmail_${index}`] =
          "Reporting Manager Email is required";
      if (!entry.reportingManagerDesignation)
        newErrors[`reportingManagerDesignation_${index}`] =
          "Reporting Manager Designation is required";
      if (!entry.startDate)
        newErrors[`startDate_${index}`] = "Start Date is required";
      if (!entry.endDate)
        newErrors[`endDate_${index}`] = "End Date is required";
    });

    // Conditionally validate GyanSys entry if the checkbox is checked
    if (workedAtGyanSys) {
      if (!gyanSysEntry.designation)
        newErrors["gyanSysDesignation"] = "Designation is required";
      if (!gyanSysEntry.employeeId)
        newErrors["gyanSysEmployeeId"] = "Employee ID is required";
      if (!gyanSysEntry.dateOfJoining)
        newErrors["gyanSysDateOfJoining"] = "Date of Joining is required";
      if (!gyanSysEntry.dateOfRelieving)
        newErrors["gyanSysDateOfRelieving"] = "Date of Relieving is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // use effect for fetching userID and token and then retriving the data from the response of API:
  // EF1 -
  useEffect(() => {
    setIsDisabled(formSubmitted());
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

  //  useeffect for gyansys and company details
  //UE2
  useEffect(() => {
    if (userData) {
      console.log("User Data details:", userData); // can be removed, present only for checking
    }

    const fetchCompanyAndDocumentData = async () => {
      if (!userData?.UserID || !token) return;

      try {
        // Fetch company and document data
        const [previousResponse, documentResponse] = await Promise.all([
          fetch(
            //process.env.REACT_APP_BASEURL + `/previousworks/getallpreviousworkbyuserid/${userData.UserID}`,
            `${process.env.REACT_APP_BASEURL}/previousworks/getallpreviousworkbyuserid/${userData.UserID}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
          fetch(
            // process.env.REACT_APP_BASEURL + `/documentTran/getDocumentTranByUserId/${userData.UserID}`,
            `${process.env.REACT_APP_BASEURL}/documentTran/getDocumentTranByUserId/${userData.UserID}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
        ]);
        
        if (!previousResponse.ok || !documentResponse.ok) {
          console.log(documentResponse);
          //throw new Error("Error fetching company or document data");
        }

        const previousData = await previousResponse.json();
        const documentsData = await documentResponse.json();

        // Map documents to companies by filtering DocTypeID
        const releasingDocs = documentsData.data.filter(
          (doc) => doc.DocumentTypeMaster.DocTypeID === 11
        );
        const experienceDocs = documentsData.data.filter(
          (doc) => doc.DocumentTypeMaster.DocTypeID === 12
        );

        // Fetch documents using their DocID
        const releasingLetterPromises = releasingDocs.map((doc) =>
          // fetch(process.env.REACT_APP_BASEURL + `/documentTran/${doc.DocID}`, {
          fetch(`${process.env.REACT_APP_BASEURL}/documentTran/${doc.DocID}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }).then((res) => res.blob())
        );

        const experienceLetterPromises = experienceDocs.map((doc) =>
          //fetch(process.env.REACT_APP_BASEURL + `/documentTran/${doc.DocID}`, {
          fetch(`${process.env.REACT_APP_BASEURL}/documentTran/${doc.DocID}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }).then((res) => res.blob())
        );
        const releasingLetterBlobs = await Promise.all(releasingLetterPromises);
        const experienceLetterBlobs = await Promise.all(experienceLetterPromises);

        // Create URLs for blobs
        releasingDocs.forEach((doc, index) => {
          const blobUrl = URL.createObjectURL(releasingLetterBlobs[index]);
          doc.documentUrl = blobUrl;
        });

        experienceDocs.forEach((doc, index) => {
          const blobUrl = URL.createObjectURL(experienceLetterBlobs[index]);
          doc.documentUrl = blobUrl;
        });
        //const yahooOnly = JSON.parse(releasingDocs).filter(({PreviousWorkID}) => PreviousWorkID === 153);
        // const releasingDocs3 = releasingDocs.filter((doc) => doc.PreviousWorkID === 153)[0].documentUrl;
        // const test = releasingDocs3[0].documentUrl;
        // const releasingLetter3= releasingDocs[0]?.documentUrl || null;

        // Map previous work data // added by me
        const mappedPreviousWorkData = previousData.map((company, index) => ({
          PreviousWorkID: company.PreviousWorkID || "",
          companyName: company.CompanyName || "",
          address: company.Address || "",
          employmentType: company.EmploymentType || "",
          designation: company.DesignationName || "",
          compensation: company.Compensation || "",
          currency: company.Currency || "",
          hrName: company.HRName || "",
          hrMobileNumber: company.HRMobile || "",
          hrEmail: company.HREmail || "",
          hrTelephoneNumber: company.HRTelePhone || "",
          reportingManagerName: company.ReportingManagerName || "",
          reportingManagerMobile: company.ReportingManagerMobile || "",
          reportingManagerTelephone: company.ReportingManagerTelePhone || "",
          reportingManagerEmail: company.ReportingManagerEmail || "",
          reportingManagerDesignation:
            company.ReportingManagerDesignation || "",
          reportingStartDate: company.ReportingStartDate
            ? company.ReportingStartDate.split("T")[0]
            : "",
          reportingEndDate: company.ReportingEndDate
            ? company.ReportingEndDate.split("T")[0]
            : "",
          startDate: company.StartDate ? company.StartDate.split("T")[0] : "",
          endDate: company.EndDate ? company.EndDate.split("T")[0] : "",
          responsibilities: company.Responsibilities || "",
          expectedDocumentDate: company.ExpectedDocSubmitDate
            ? company.ExpectedDocSubmitDate.split("T")[0]
            : "",
          documentPresent:
          (releasingDocs.filter((doc) => doc.PreviousWorkID === company.PreviousWorkID)[0]?.documentUrl) ? "YES" : "NO",

          // releasingLetter: releasingDocs[index]?.documentUrl || null,
          // releasingLetterMimeType: releasingDocs[index]?.mimeType || null,
          // experienceLetter: experienceDocs[index]?.documentUrl || null,
          // experienceLetterMimeType: experienceDocs[index]?.mimeType || null,

          releasingLetter: releasingDocs.filter((doc) => doc.PreviousWorkID === company.PreviousWorkID)[0]?.documentUrl|| null,
          releasingLetterMimeType: releasingDocs.filter((doc) => doc.PreviousWorkID === company.PreviousWorkID)[0]?.mimeType || null,
          
          experienceLetter: experienceDocs.filter((doc) => doc.PreviousWorkID === company.PreviousWorkID)[0]?.documentUrl|| null,
          experienceLetterMimeType: experienceDocs.filter((doc) => doc.PreviousWorkID === company.PreviousWorkID)[0]?.mimeType || null,

          

        }));

       // setCompanyDetails(mappedPreviousWorkData);

        const sortedData = mappedPreviousWorkData.sort(
          (a, b) =>
            (a.PreviousWorkID) -
            (b.PreviousWorkID)
        );
        setCompanyDetails(sortedData);

        // Handle currency selection and editability
        if (mappedPreviousWorkData.length > 0) {
          setSelectedCurrency(mappedPreviousWorkData[0].currency);

          // setIsEditable(false);
          // setIsDisabled(true);
        } else {
          setIsEditable(true);
          setIsDisabled(IsSubmitted);
        }

        console.log("Populated Previous Work Data:", mappedPreviousWorkData);
        return mappedPreviousWorkData.length > 0;
      } catch (error) {
        console.error("Error fetching company or document data:", error);
        return false;
      }
    };
// end of fetching data
    const fetchGyanSysData = async () => {
      if (!userData?.UserID || !token) return;

      try {
        // Fetch GyanSys data
        const gyanSysResponse = await fetch(
          //process.env.REACT_APP_BASEURL + `/previousGyanSysEmps/${userData.UserID}`,
          `${process.env.REACT_APP_BASEURL}/previousGyanSysEmps/${userData.UserID}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!gyanSysResponse.ok) {
          throw new Error("Error fetching GyanSys data");
        } else {
          const gyanSysData = await gyanSysResponse.json();

          // Map GyanSys data
          if (gyanSysData) {
            const gyanSysDetails = {
              employeeId: gyanSysData.PreviousGyanSysEmpID || "",
              designation: gyanSysData.DesignationWhileRelieving || "",
              dateOfJoining: gyanSysData.DateOfJoining
                ? gyanSysData.DateOfJoining.split("T")[0]
                : "",
              dateOfRelieving: gyanSysData.DateOfRelieving
                ? gyanSysData.DateOfRelieving.split("T")[0]
                : "",
            };

            setGyanSysEntry(gyanSysDetails);
            // below commented by me ####
            setWorkedAtGyanSys(true);
            console.log("Populated GyanSys Data:", gyanSysDetails);
            return true;
          }
        }
      } catch (error) {
        console.error("Error fetching GyanSys data:", error);
        return false;
      }
    };

    // Fetch both sets of data independently
    const fetchAllData = async () => {
      const companyDataPresent = await fetchCompanyAndDocumentData();
      const gyanSysDataPresent = await fetchGyanSysData();

      //hide by me khalid #### Show success message based on presence of data
      // if (companyDataPresent && gyanSysDataPresent) {
      //   toast.success("Form has been already submitted.");
      // } else if (companyDataPresent) {toast.success("Form has been already submitted (Company details present).");
      // } else if (gyanSysDataPresent) {
      //   toast.success(
      //     "Form has been already submitted (GyanSys details present)."
      //   );
      // }
    };

    // Fetch both sets of data independently
    if (userData && token) {
      // fetchCompanyAndDocumentData();
      // fetchGyanSysData();
      fetchAllData();
    }
  }, [userData, token, navigate]);

  // edit option when HR rejects the form and Rejected is True:::
  //UE3
  useEffect(() => {
    const fetchFormData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in local storage.");
        return;
      }

      const decoded = jwtDecode(token);
      const userID = decoded.UserID;

      try {
        const response = await axios.get(
          // process.env.REACT_APP_BASEURL + `/users/getUserFormsDetails/${userID}`,
          `${process.env.REACT_APP_BASEURL}/users/getUserFormsDetails/${userID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;

        if (data.formData && data.formData.personalDetails) {
          const isRejected = data.formData.personalDetails.Rejected;
          console.log("True or False:", isRejected);

          // Correcting the logic here
          // :::::::::::05-11 change
          // ---------------------------------
          // setIsEditable(isRejected); // Editable when rejected is true
          // setIsDisabled(!isRejected); // Disabled when rejected is false
          // ---------------------------------
          // setIsEditable(!isRejected); // Editable when rejected is true ####
          // setIsDisabled(isRejected); // Disabled when rejected is false ####

          //#### new code
          // setIsDisabled(data.formData.personalDetails.onSubmit);
        } else {
          console.error("Unexpected data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching form data:", error.message);
      }

      console.log("IsEdit:", isEditable);
      console.log("IsDisable:", isDisabled);
    };

    fetchFormData();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const formData = {
        workedAtGyanSys: workedAtGyanSys,
        gyanSysEntry: gyanSysEntry,
        companyDetails: companyDetails.map((entry) => ({
          ...entry,
          currency: selectedCurrency,
          previouslyWorkedInGyanSys: workedAtGyanSys,
        })),
      };

      const companyDataPromises = [];
      const documentUploadPromises = [];

      try {
        // Retrieve and decode JWT token
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found in localStorage");
        }
        const decoded = jwtDecode(token);
        const userID = decoded.UserID;

        if (!userID) {
          throw new Error("UserID is not present in the token");
        }

        // Fetch the existing form data to check the rejection status
        const formDataResponse = await axios.get(
          //process.env.REACT_APP_BASEURL + `/users/getUserFormsDetails/${userID}`,
          `${process.env.REACT_APP_BASEURL}/users/getUserFormsDetails/${userID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const isRejected =
          formDataResponse.data.formData.personalDetails.Rejected;

        // Fetch previous work IDs for the user
        const previousWorkResponse = await axios.get(
          //process.env.REACT_APP_BASEURL + `/previousworks/getallpreviousworkbyuserid/${userID}`,
          `${process.env.REACT_APP_BASEURL}/previousworks/getallpreviousworkbyuserid/${userID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const previousWorkIds = previousWorkResponse.data.map(
          (work) => work.PreviousWorkID
        );

        let gyanSysSuccess = false;
        let companySuccess = false;

        // 1. POST API for sending data to database (GyanSys Entry)
        if (workedAtGyanSys) {

          // const previousGyansysDetails = await axios.get(
          //   `${process.env.REACT_APP_BASEURL}/previousGyanSysEmps/${userID}`,
          //   {
          //     headers: {
          //       Authorization: `Bearer ${token}`,
          //     },
          //   }
          // );

          const previousGyansysDetails = await userUtility_isGyansysEmp();
          //const isSubmitted = await userUtility_isSubmitted();
         
          
  
           const IsGyansysEmp = previousGyansysDetails.data;
          // previousGyansysDetails.data.formData.personalDetails.Rejected;





          const gyanSysData = {
            PreviousGyanSysEmpID: gyanSysEntry.employeeId,
            UserID: userID,
            DesignationWhileRelieving: gyanSysEntry.designation,
            DateOfJoining: new Date(gyanSysEntry.dateOfJoining).toISOString(),
            DateOfRelieving: new Date(
              gyanSysEntry.dateOfRelieving
            ).toISOString(),
            CreatedBy: userID,
            UpdatedBy: userID,
          };
          const gyanSysMethod = IsGyansysEmp ? "PUT" : "POST"; //POST
          const gyanSysResponse = await axios({
            method: gyanSysMethod,
            url: IsGyansysEmp
              ? `${process.env.REACT_APP_BASEURL}/previousGyanSysEmps/${gyanSysData.UserID}`
              : `${process.env.REACT_APP_BASEURL}/previousGyanSysEmps`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: gyanSysData,
          });

          console.log("GyanSys Entry Response:", gyanSysResponse.data);
          gyanSysSuccess = true;
        }

        // 3. POST API for sending company details data
        const docIDArray = [];
        var companyResponses=[];
        if (companyDetails.length > 0) {

          
          
          companyDetails.forEach((company, index) => {
            const companyData = {
              PreviousWorkID: company.PreviousWorkID.toString(),
              UserID: userID,
              CompanyName: company.companyName,
              Address: company.address,
              EmploymentType: company.employmentType,
              StartDate: new Date(company.startDate).toISOString(),
              EndDate: new Date(company.endDate).toISOString(),
              DesignationName: company.designation,
              Compensation: parseFloat(company.compensation),
              Currency: company.currency || selectedCurrency,
              HRName: company.hrName,
              HRMobile: company.hrMobileNumber,
              HRTelePhone: company.hrTelephoneNumber,
              HREmail: company.hrEmail,
              ReportingManagerName: company.reportingManagerName,
              ReportingManagerMobile: company.reportingManagerMobile,
              ReportingManagerTelePhone: company.reportingManagerTelephone,
              ReportingManagerEmail: company.reportingManagerEmail,
              ReportingManagerDesignation: company.reportingManagerDesignation,
              ReportingStartDate: new Date(
                company.reportingStartDate
              ).toISOString(),
              ReportingEndDate: new Date(
                company.reportingEndDate
              ).toISOString(),
              Responsibilities: company.responsibilities || null,
              ExpectedDocSubmitDate: company.expectedDocumentDate || null,
              DocID: docIDArray, // Array of uploaded document IDs
              CreatedBy: userID,
              UpdatedBy: userID,
            };

            // const companyMethod = isRejected ? "PUT" : "POST";
            const companyMethod = companyData.PreviousWorkID ? "PUT" : "POST";
            
            if (companyMethod == "POST") {
              //companyData.PreviousWorkID =0; remove PreviousWorkID in case of new entry i.e. POST
              var key = "PreviousWorkID";
              delete companyData[key];
            }
            const companyId = companyData.PreviousWorkID;
             
             
                const res=async()=>{
                 const response=  await axios({
                  method: companyMethod,
                  url: companyId //isRejected
                    ? // ? process.env.REACT_APP_BASEURL + `/previousworks/${companyId}` // company Id
                      // : "process.env.REACT_APP_BASEURL + `/previousworks",
                      `${process.env.REACT_APP_BASEURL}/previousworks/${companyId}` // company Id
                    : `${process.env.REACT_APP_BASEURL}/previousworks`,
  
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                  data: companyData,
                })
                  return(response);
              }

              res()
              .then((response) => {
                console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd");
                console.log(response.data.PreviousWorkID);
                if (company.releasingLetter) {
                  const relDocID = `USER${userID}REL${index + 8}`;
                  documentUploadPromises.push(
                    uploadDocument(11, company.releasingLetter, relDocID,response.data.PreviousWorkID)
                  );
                }
    
                if (company.experienceLetter) {
                  const expDocID = `USER${userID}EXP${index + 8}`;
                  documentUploadPromises.push(
                    uploadDocument(12, company.experienceLetter, expDocID,response.data.PreviousWorkID)
                  );
                }
                
              })
              .catch((error) => {
                console.error("Error during process:", error);
              });


          });



          try {
            companyResponses = await Promise.all(companyDataPromises);
            const documentIDs = await Promise.all(documentUploadPromises);
        
        
            documentIDs.forEach((docID, index) => {
            if (docID) docIDArray.push(docID);
            });


            companyResponses.forEach((response, index) => {
              console.log(
                `Company ${index + 1} Entry Response:`,
                response.data
              );
            });
           // setCompanyDetails(companyResponses);
            console.log(companyResponses);
            companySuccess = true;
          } catch (error) {
            console.error("Error submitting company details:", error);
          }
        }
        // 3 End of sending company details data

        // 2. POST API for uploading documents
       
         companyDetails.forEach((company, index) => {
        //  companyResponses.forEach((company, index) => {
          // if (company.releasingLetter || company.experienceLetter) {
            
          //   console.log("Eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee-code cut")

          //   if (company.releasingLetter) {
          //     const relDocID = `USER${userID}REL${index + 8}`;
          //     documentUploadPromises.push(
          //       uploadDocument(11, company.releasingLetter, relDocID,33)
          //     );
          //   }

          //   if (company.experienceLetter) {
          //     const expDocID = `USER${userID}EXP${index + 8}`;
          //     documentUploadPromises.push(
          //       uploadDocument(12, company.experienceLetter, expDocID,34)
          //     );
          //   }
          // }
        });

        // end of 2

        // Wait for all document uploads to complete
        

        

        //4 Display appropriate toast messages based on success/failure of entries
        if (gyanSysSuccess && companySuccess) {
          toast.success(
            "Both GyanSys entry and other company entries saved successfully!"
          );
          setTimeout(() => {
            setCompanyDetails((prevState) => ({
              ...prevState,
            }));
            setIsEditable(false);
            setIsDisabled(IsSubmitted);
            navigate("/EducationDetailsPage");
          }, 2000);
        } else if (gyanSysSuccess && !companySuccess) {
          toast.success("Data saved successfully");
          setTimeout(() => {
            setCompanyDetails((prevState) => ({
              ...prevState,
            }));
            setIsEditable(false);
            // setIsDisabled(true); :::::::::::05-11 change
            setIsDisabled(IsSubmitted);
            navigate("/EducationDetailsPage");
          }, 2000);
        } else if (!gyanSysSuccess && companySuccess) {
          toast.success("Company entries saved successfully");
          setTimeout(() => {
            setCompanyDetails((prevState) => ({
              ...prevState,
            }));
            setIsEditable(false);
            setIsDisabled(IsSubmitted);
            navigate("/EducationDetailsPage");
          }, 2000);
        
        } else if (!gyanSysSuccess && !companySuccess) {
          toast.success("No previous work experience");
          setTimeout(() => {
            setCompanyDetails((prevState) => ({
              ...prevState,
            }));
            setIsEditable(false);
            setIsDisabled(IsSubmitted);
            navigate("/EducationDetailsPage");
          }, 2000);
        } 
        
        
        
        else {
          toast.error("There was an error submitting the data.");
        }
      } catch (error) {
        console.error("Error submitting data:", error);
        toast.error("There was an error submitting the data.");
      }
    } else {
      // Show error toaster message
      toast.error("Form validation errors:", errors);
    }
  };


  const handleGyanSysChange = (event) => {
    const { name, value } = event.target;
    setGyanSysEntry({ ...gyanSysEntry, [name]: value });
  };
  const today = new Date().toISOString().split("T")[0]; //// max date to be enabled
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setWorkedAtGyanSys(checked);

    if (!checked) {
      // Clear GyanSys related fields when the checkbox is unchecked
      setGyanSysEntry({
        designation: "",
        employeeId: "",
        dateOfJoining: "",
        dateOfRelieving: "",
        relationWithOrganization: "",
      });
    }
  };

  // selecting currency from the dropdown

  const [currencies, setCurrencies] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("");
  //UF4
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(
          "https://openexchangerates.org/api/currencies.json"
        ); /// need to look for alternative source
        setCurrencies(response.data);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, []);

  // handle the currency change such that form data can get the currency choosed
  // const handleCurrencyChange3 = (event, newValue) => {
  //   // If newValue is not a valid currency, set it to an empty string
  //   const value =
  //     newValue && Object.keys(currencies).includes(newValue.toUpperCase())
  //       ? newValue.toUpperCase()
  //       : "";
  //   console.log("Selected Currency:", value); // Debugging line
  //   setSelectedCurrency(value);
  // };

  const handleCurrencyChange = (event, newValue, index) => {
    const value =
      newValue && Object.keys(currencies).includes(newValue.toUpperCase())
        ? newValue.toUpperCase()
        : "";
 
    const updatedCompanyDetails = [...companyDetails];
    updatedCompanyDetails[index] = {
      ...updatedCompanyDetails[index],
      currency: value,
    };
    setCompanyDetails(updatedCompanyDetails);
  };


  return (
    <Container >
      <FormCard>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Previous Work Details
          </Typography>
          <form onSubmit={handleSubmit}>
           
            <Box display="flex" flexDirection="column" gap={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={workedAtGyanSys}
                    onChange={handleCheckboxChange}
                    disabled={
                      gyanSysEntry.designation ||
                      gyanSysEntry.employeeId ||
                      gyanSysEntry.dateOfJoining ||
                      gyanSysEntry.dateOfRelieving
                    } // Disable if GyanSys details are present
                  />
                }
                label="Previously Worked at GyanSys"
              />
              {workedAtGyanSys && (
                <Box>
                  <Box mb={2}>
                    <CustomTextField
                      label="Company Name"
                      value="GyanSys Infotech"
                      fullWidth
                      disabled
                    />
                  </Box>
                  <Box mb={2}>
                    <CustomTextField
                      label="Designation * "
                      name="designation"
                      variant="outlined"
                      fullWidth
                      error={!!errors["gyanSysDesignation"]}
                      helperText={errors["gyanSysDesignation"]}
                      value={gyanSysEntry.designation}
                      onChange={handleGyanSysChange}
                      placeholder="Enter your designation"
                      InputProps={{ readOnly: !isEditable }}
                    />
                  </Box>
                  <Box mb={2}>
                    <CustomTextField
                      label="GyanSys Employee ID * "
                      name="employeeId"
                      variant="outlined"
                      fullWidth
                      error={!!errors["gyanSysEmployeeId"]}
                      helperText={errors["gyanSysEmployeeID"]}
                      placeholder="Enter your Employee ID"
                      onChange={handleGyanSysChange}
                      InputProps={{ readOnly: !isEditable }}
                      value={gyanSysEntry.employeeId}
                    />
                  </Box>
                  <Box mb={2}>
                    <CustomTextField
                      label="Date Of Joining * "
                      name="dateOfJoining"
                      type="date"
                      variant="outlined"
                      value={gyanSysEntry.dateOfJoining}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      error={!!errors["gyanSysDateOfJoining"]}
                      helperText={errors["gyanSysDateOfJoining"]}
                      onChange={handleGyanSysChange}
                      InputProps={{ readOnly: !isEditable }}
                    />
                  </Box>
                  <Box mb={2}>
                    <CustomTextField
                      label="Date Of Relieving * "
                      name="dateOfRelieving"
                      type="date"
                      variant="outlined"
                      fullWidth
                      value={gyanSysEntry.dateOfRelieving}
                      InputLabelProps={{ shrink: true }}
                      error={!!errors["gyanSysDateOfRelieving"]}
                      helperText={errors["gyanSysDateOfRelieving"]}
                      onChange={handleGyanSysChange}
                      InputProps={{ readOnly: !isEditable }}
                    />
                  </Box>
                </Box>
              )}
              <Typography variant="h6" component="div" gutterBottom>
                Employment Details (as per Recent Company)
              </Typography>
              {companyDetails.map((company, index) => (
                <Card
                  key={index}
                  sx={{ marginBottom: 2, padding: 2, position: "relative"}}
                >
                  <Box display="flex" alignItems="center" mb={2}>
                    <Typography variant="h6" component="div" flexGrow={1}>
                      Company {index + 1}
                    </Typography>
                    <IconButton
                      aria-label="expand"
                      onClick={() => handleToggleExpand(index)}
                    >
                      {expandedEntries[index] ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </IconButton>
                    <IconButton
                      aria-label="move-up"
                      onClick={() => handleMoveUp(index)}
                      sx={{ marginLeft: 1 }}
                    >
                      <ArrowUpwardIcon />
                    </IconButton>
                    <IconButton
                      aria-label="move-down"
                      onClick={() => handleMoveDown(index)}
                      sx={{ marginLeft: 1 }}
                    >
                      <ArrowDownwardIcon />
                    </IconButton>
                    <IconButton
                      disabled={IsSubmitted}
                      aria-label="delete"
                      onClick={() => handleRemoveCompany(index)}
                      sx={{ marginLeft: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>

                  {expandedEntries[index] && (
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <CustomTextField
                          label="Company Name * "
                          name="companyName"
                          variant="outlined"
                          fullWidth
                          value={companyDetails[index]?.companyName || ""}
                          onChange={(e) => handleInputChange(index, e)}
                          InputProps={{ readOnly: !isEditable }}
                          error={!!errors[`companyName_${index}`]}
                          helperText={errors[`companyName_${index}`] || ""}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CustomTextField
                          label="Address * "
                          name="address"
                          variant="outlined"
                          fullWidth
                          value={companyDetails[index]?.address || ""}
                          onChange={(e) => handleInputChange(index, e)}
                          InputProps={{ readOnly: !isEditable }}
                          error={!!errors[`address_${index}`]}
                          helperText={errors[`address_${index}`] || ""}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl
                          variant="outlined"
                          fullWidth
                          error={!!errors[`employmentType_${index}`]}
                        >
                          <InputLabel>Employment Type *</InputLabel>
                          <Select
                            label="Employment Type *"
                            name="employmentType"
                            value={companyDetails[index]?.employmentType || ""}
                            onChange={(e) => handleInputChange(index, e)}
                            inputProps={{ readOnly: !isEditable }}
                          >
                            <MenuItem value="Internship">Internship</MenuItem>
                            <MenuItem value="Full-time">Full-time</MenuItem>
                            <MenuItem value="Contractual">Contractual</MenuItem>
                          </Select>
                          {errors[`employmentType_${index}`] && (
                            <FormHelperText>
                              {errors[`employmentType_${index}`]}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <CustomTextField
                          label="Designation * "
                          name="designation"
                          variant="outlined"
                          fullWidth
                          value={companyDetails[index]?.designation || ""}
                          onChange={(e) => handleInputChange(index, e)}
                          InputProps={{ readOnly: !isEditable }}
                          error={!!errors[`designation_${index}`]}
                          helperText={errors[`designation_${index}`] || ""}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CustomTextField
                          label="Start Date * "
                          name="startDate"
                          type="date"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          value={companyDetails[index]?.startDate || ""}
                          onChange={(e) => handleInputChange(index, e)}
                          InputProps={{ readOnly: !isEditable }}
                          error={!!errors[`startDate_${index}`]}
                          helperText={errors[`startDate_${index}`] || ""}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CustomTextField
                          label="End Date * "
                          name="endDate"
                          type="date"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          value={companyDetails[index]?.endDate || ""}
                          onChange={(e) => handleInputChange(index, e)}
                          InputProps={{ readOnly: !isEditable }}
                          error={!!errors[`endDate_${index}`]}
                          helperText={errors[`endDate_${index}`] || ""}
                        />
                      </Grid>

                      {/* handled currency dropdown from API with compensation amount */}
                      <Grid item xs={12} sm={6}>
                        <Grid container spacing={2}>
                          <Grid
                            item
                            xs={6}
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Autocomplete
                              freeSolo
                              options={Object.keys(currencies)} // List of valid currency codes
                              getOptionLabel={(option) =>
                                `${option} - ${currencies[option]}`
                              } // Show currency code and name
                              filterOptions={(options, { inputValue }) =>
                                options.filter((option) =>
                                  option
                                    .toLowerCase()
                                    .startsWith(inputValue.toLowerCase())
                                )
                              } // Filter options based on input value
                              disabled={!isEditable}
                              value={companyDetails[index]?.currency || null}
                              onChange={(event, newValue) =>
                                handleCurrencyChange(event, newValue, index)
                              }
                              //value={selectedCurrency || null} // Set to null if no currency is selected
                              //onChange={(event, newValue) =>
                              //  handleCurrencyChange(event, newValue)
                              //}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Currency * "
                                  variant="outlined"
                                  fullWidth
                                  placeholder="Select currency" // Placeholder message
                                  value={companyDetails[index]?.currency || ''}
                                  //value={selectedCurrency || ""} // Bind value to selectedCurrency
                                  error={!!errors[`currency_${index}`]}
                                  helperText={errors[`currency_${index}`] || ""}
                                  name="currency"
                                  //InputProps={{ readOnly: !isEditable }}

                                  InputProps={{
                                    ...params.InputProps,
                                    style: { height: "40px" },
                                    // Set the desired height here
                                  }}
                                />
                              )}
                              onInputChange={(event, newInputValue) => {
                                if (
                                  Object.keys(currencies).includes(
                                    newInputValue.toUpperCase()
                                  )
                                ) {
                                  handleCurrencyChange(
                                    event,
                                    newInputValue.toUpperCase()
                                  );
                                }
                              }} // Ensure only valid currency codes are allowed
                              disablePortal={true}
                              style={{ width: "100%", height: "70%" }}
                            />
                          </Grid>

                          {/* Compensation Amount Input */}
                          <Grid
                            item
                            xs={6}
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <CustomTextField
                              label="Compensation * "
                              name="compensation"
                              variant="outlined"
                              fullWidth
                              type="number"
                              value={companyDetails[index]?.compensation || ""}
                              onChange={(e) => handleInputChange(index, e)}
                              InputProps={{ readOnly: !isEditable }}
                              error={!!errors[`compensation_${index}`]}
                              helperText={errors[`compensation_${index}`] || ""}
                              style={{ height: "70%" }} // Ensures the CustomTextField fills the Grid item height
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <CustomTextField
                          label="HR Name * "
                          name="hrName"
                          variant="outlined"
                          fullWidth
                          value={companyDetails[index]?.hrName || ""}
                          onChange={(e) => handleInputChange(index, e)}
                          InputProps={{ readOnly: !isEditable }}
                          error={!!errors[`hrName_${index}`]}
                          helperText={errors[`hrName_${index}`] || ""}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CustomTextField
                          label="HR Mobile Number * "
                          name="hrMobileNumber"
                          variant="outlined"
                          fullWidth
                          type="tel" // Ensures the input is numeric
                          value={companyDetails[index]?.hrMobileNumber || ""}
                          onChange={(e) => handleInputChange(index, e)}
                          InputProps={{ readOnly: !isEditable }}
                          error={!!errors[`hrMobileNumber_${index}`]}
                          helperText={errors[`hrMobileNumber_${index}`] || ""}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CustomTextField
                          label="HR Email * "
                          name="hrEmail"
                          variant="outlined"
                          fullWidth
                          value={companyDetails[index]?.hrEmail || ""}
                          onChange={(e) => handleInputChange(index, e)}
                          InputProps={{ readOnly: !isEditable }}
                          error={!!errors[`hrEmail_${index}`]}
                          helperText={errors[`hrEmail_${index}`] || ""}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CustomTextField
                          label="HR Telephone Number"
                          name="hrTelephoneNumber"
                          variant="outlined"
                          fullWidth
                          type="tel" // Ensures the input is numeric
                          value={companyDetails[index]?.hrTelephoneNumber || ""}
                          onChange={(e) => handleInputChange(index, e)}
                          InputProps={{ readOnly: !isEditable }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CustomTextField
                          label="Reporting Manager Name * "
                          name="reportingManagerName"
                          variant="outlined"
                          fullWidth
                          value={
                            companyDetails[index]?.reportingManagerName || ""
                          }
                          onChange={(e) => handleInputChange(index, e)}
                          InputProps={{ readOnly: !isEditable }}
                          error={!!errors[`reportingManagerName_${index}`]}
                          helperText={
                            errors[`reportingManagerName_${index}`] || ""
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CustomTextField
                          label="Reporting Manager Mobile * "
                          name="reportingManagerMobile"
                          variant="outlined"
                          fullWidth
                          type="tel" // Ensures the input is numeric
                          value={
                            companyDetails[index]?.reportingManagerMobile || ""
                          }
                          onChange={(e) => handleInputChange(index, e)}
                          InputProps={{ readOnly: !isEditable }}
                          error={!!errors[`reportingManagerMobile_${index}`]}
                          helperText={
                            errors[`reportingManagerMobile_${index}`] || ""
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CustomTextField
                          label="Reporting Manager Telephone"
                          name="reportingManagerTelephone"
                          variant="outlined"
                          fullWidth
                          type="tel" // Ensures the input is numeric
                          value={
                            companyDetails[index]?.reportingManagerTelephone ||
                            ""
                          }
                          onChange={(e) => handleInputChange(index, e)}
                          InputProps={{ readOnly: !isEditable }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CustomTextField
                          label="Reporting Manager Email * "
                          name="reportingManagerEmail"
                          variant="outlined"
                          fullWidth
                          value={
                            companyDetails[index]?.reportingManagerEmail || ""
                          }
                          onChange={(e) => handleInputChange(index, e)}
                          InputProps={{ readOnly: !isEditable }}
                          error={!!errors[`reportingManagerEmail_${index}`]}
                          helperText={
                            errors[`reportingManagerEmail_${index}`] || ""
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CustomTextField
                          label="Reporting Manager Designation * "
                          name="reportingManagerDesignation"
                          variant="outlined"
                          fullWidth
                          value={
                            companyDetails[index]
                              ?.reportingManagerDesignation || ""
                          }
                          onChange={(e) => handleInputChange(index, e)}
                          InputProps={{ readOnly: !isEditable }}
                          error={
                            !!errors[`reportingManagerDesignation_${index}`]
                          }
                          helperText={
                            errors[`reportingManagerDesignation_${index}`] || ""
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CustomTextField
                          label="Reporting Start Date"
                          name="reportingStartDate"
                          variant="outlined"
                          type="date"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          value={
                            companyDetails[index]?.reportingStartDate || ""
                          }
                          onChange={(e) => handleInputChange(index, e)}
                          InputProps={{ readOnly: !isEditable }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CustomTextField
                          label="Reporting End Date"
                          name="reportingEndDate"
                          type="date"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          value={companyDetails[index]?.reportingEndDate || ""}
                          onChange={(e) => handleInputChange(index, e)}
                          InputProps={{ readOnly: !isEditable }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomTextField
                          label="Responsibilities"
                          name="responsibilities"
                          variant="outlined"
                          fullWidth
                          value={companyDetails[index]?.responsibilities || ""}
                          onChange={(e) => handleInputChange(index, e)}
                          InputProps={{ readOnly: !isEditable }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomTextField
                          label="PreviousWorkID"
                          name="PreviousWorkID"
                          variant="outlined"
                          style={{ display: "none" }}
                          fullWidth
                          value={companyDetails[index]?.PreviousWorkID || ""}
                          onChange={(e) => handleInputChange(index, e)}
                          InputProps={{ readOnly: !isEditable }}
                        />
                      </Grid>

                      <Container>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Box display="flex" alignItems="center" mb={2}>
                              <Typography
                                variant="body1"
                                component="div"
                                flexGrow={1}
                              >
                                Do you have Relieving Letter and Experience
                                Letter? *
                              </Typography>
                              <FormControl component="fieldset" required>
                                <RadioGroup
                                  row
                                  aria-label="documentPresent"
                                  name="documentPresent"
                                  value={company.documentPresent || ""}
                                  onChange={(event) =>
                                    handleDocumentChange(index, event)
                                  }
                                >
                                  <FormControlLabel
                                    value="YES"
                                    control={<Radio />}
                                    label="Yes"
                                    disabled={!isEditable}
                                  />
                                  <FormControlLabel
                                    value="NO"
                                    control={<Radio />}
                                    label="No"
                                    disabled={!isEditable}
                                  />
                                </RadioGroup>
                                {errors[`documentPresent_${index}`] && (
                                  <FormHelperText error>
                                    {errors[`documentPresent_${index}`]}
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </Box>

                            {/* Show fields if "YES" is selected */}
                            {company.documentPresent === "YES" && (
                              <Grid container spacing={2}>
                                {/* Releasing Letter Upload */}
                                <Grid item xs={12} md={6}>
                                  <Box mb={2}>
                                    <input
                                      accept=".pdf,.jpg,.jpeg,.png"
                                      type="file"
                                      id={`releasingLetter-${index}`}
                                      name="releasingLetter"
                                      style={{ display: "none" }}
                                      onChange={(e) =>
                                        handleFileChange(index, e)
                                      }
                                      //  disabled={!!company.releasingLetter}
                                    />

                                    <label htmlFor={`releasingLetter-${index}`}>
                                      <Button
                                        variant="outlined"
                                        component="span"
                                        fullWidth
                                      >
                                        Upload Relieving Letter
                                      </Button>
                                    </label>

                                    {errors[`releasingLetter_${index}`] && (
                                      <FormHelperText error>
                                        {errors[`releasingLetter_${index}`]}
                                      </FormHelperText>
                                    )}
                                    {company.releasingLetter && (
                                      <Box
                                        mt={1}
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="center"
                                      >
                                        <Typography variant="body2">
                                          {company.releasingLetter.name}
                                        </Typography>
                                        {/* Preview Releasing Letter */}
                                        {company.releasingLetter && (
                                          // <Box mt={1}>
                                          //   {company.releasingLetter && (
                                          //     company.releasingLetter.endsWith('.pdf') ? (
                                          //       <iframe
                                          //         src={company.releasingLetter}
                                          //         style={{ width: '100%', height: '200px' }}
                                          //       />
                                          //     ) : (
                                          //       <img
                                          //         src={company.releasingLetter}
                                          //         alt="Releasing Letter"
                                          //         style={{ maxWidth: '100%', maxHeight: '200px' }}
                                          //       />
                                          //     )
                                          //   )}
                                          // </Box>
                                          <Box mt={1}>
                                            {typeof company.releasingLetter ===
                                            "string" ? (
                                              // Handle the case where releasingLetter is a string (probably from the API)
                                              company.releasingLetterMimeType ===
                                              "application/pdf" ? (
                                                <iframe
                                                  src={company.releasingLetter}
                                                  style={{
                                                    width: "100%",
                                                    height: "200px",
                                                  }}
                                                />
                                              ) : (
                                                <img
                                                  src={company.releasingLetter}
                                                  alt="Releasing Letter"
                                                  style={{
                                                    maxWidth: "100%",
                                                    maxHeight: "200px",
                                                  }}
                                                />
                                              )
                                            ) : // Handle the case where releasingLetter is a file object (during upload)
                                            company.releasingLetter.name.endsWith(
                                                ".pdf"
                                              ) ? (
                                              <iframe
                                                src={URL.createObjectURL(
                                                  company.releasingLetter
                                                )}
                                                style={{
                                                  width: "100%",
                                                  height: "200px",
                                                }}
                                              />
                                            ) : (
                                              <img
                                                src={URL.createObjectURL(
                                                  company.releasingLetter
                                                )}
                                                alt="Releasing Letter"
                                                style={{
                                                  maxWidth: "100%",
                                                  maxHeight: "200px",
                                                }}
                                              />
                                            )}
                                          </Box>
                                        )}

                                        <IconButton
                                         disabled={IsSubmitted}
                                          onClick={() =>
                                            handleRemoveFile(
                                              index,
                                              "releasingLetter"
                                            )
                                          }
                                          color="danger"
                                        >
                                          <DeleteIcon />
                                        </IconButton>
                                      </Box>
                                    )}
                                  </Box>
                                </Grid>

                                {/* Experience Letter Upload */}
                                <Grid item xs={12} md={6}>
                                  <Box mb={2}>
                                    <input
                                      accept=".pdf,.jpg,.jpeg,.png"
                                      type="file"
                                      id={`experienceLetter-${index}`}
                                      name="experienceLetter"
                                      style={{ display: "none" }}
                                      onChange={(e) =>
                                        handleFileChange(index, e)
                                      }
                                      //disabled={!!company.experienceLetter}
                                    />

                                    <label
                                      htmlFor={`experienceLetter-${index}`}
                                    >
                                      <Button
                                        variant="outlined"
                                        component="span"
                                        fullWidth
                                      >
                                        Upload Experience Letter
                                      </Button>
                                    </label>

                                    {errors[`experienceLetter_${index}`] && (
                                      <FormHelperText error>
                                        {errors[`experienceLetter_${index}`]}
                                      </FormHelperText>
                                    )}
                                    {company.experienceLetter && (
                                      <Box
                                        mt={1}
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="center"
                                      >
                                        <Typography variant="body2">
                                          {company.experienceLetter.name}
                                        </Typography>
                                        {/* Preview Experience Letter */}
                                        {company.experienceLetter && (
                                          // <Box mt={1}>
                                          //   {company.experienceLetter && (
                                          //     company.experienceLetter.endsWith('.pdf') ? (
                                          //       <iframe
                                          //         src={company.experienceLetter}
                                          //         style={{ width: '100%', height: '200px' }}
                                          //       />
                                          //     ) : (
                                          //       <img
                                          //         src={company.experienceLetter}
                                          //         alt="Experience Letter"
                                          //         style={{ maxWidth: '100%', maxHeight: '200px' }}
                                          //       />
                                          //     )
                                          //   )}
                                          // </Box>
                                          <Box mt={1}>
                                            {typeof company.experienceLetter ===
                                            "string" ? (
                                              // Handle the case where experience letter is a string (probably from the API)
                                              company.experienceLetterMimeType ===
                                              "application/pdf" ? (
                                                <iframe
                                                  src={company.experienceLetter}
                                                  style={{
                                                    width: "100%",
                                                    height: "200px",
                                                  }}
                                                />
                                              ) : (
                                                <img
                                                  src={company.experienceLetter}
                                                  alt="Releasing Letter"
                                                  style={{
                                                    maxWidth: "100%",
                                                    maxHeight: "200px",
                                                  }}
                                                />
                                              )
                                            ) : // Handle the case where releasingLetter is a file object (during upload)
                                            company.experienceLetter.name.endsWith(
                                                ".pdf"
                                              ) ? (
                                              <iframe
                                                src={URL.createObjectURL(
                                                  company.experienceLetter
                                                )}
                                                style={{
                                                  width: "100%",
                                                  height: "200px",
                                                }}
                                              />
                                            ) : (
                                              <img
                                                src={URL.createObjectURL(
                                                  company.experienceLetter
                                                )}
                                                alt="Releasing Letter"
                                                style={{
                                                  maxWidth: "100%",
                                                  maxHeight: "200px",
                                                }}
                                              />
                                            )}
                                          </Box>
                                        )}

                                        <IconButton
                                        disabled={IsSubmitted}
                                          onClick={() =>
                                            handleRemoveFile(
                                              index,
                                              "experienceLetter"
                                            )
                                          }
                                          color="danger"
                                        >
                                          <DeleteIcon />
                                        </IconButton>
                                      </Box>
                                    )}
                                  </Box>
                                </Grid>
                              </Grid>
                            )}

                            {/* Show fields if "NO" is selected */}
                            {company.documentPresent === "NO" && (
                              <Box display="flex" alignItems="center" mb={2}>
                                <Grid item xs={12} md={6}>
                                  <Box mb={2}>
                                    <CustomTextField
                                      label="Expected Document Submission Date"
                                      name="expectedDocumentDate"
                                      type="date"
                                      fullWidth
                                      InputLabelProps={{ shrink: true }}
                                      value={company.expectedDocumentDate || ""}
                                      onChange={(e) =>
                                        handleInputChange(index, e)
                                      }
                                      InputProps={{ readOnly: !isEditable }}
                                    />
                                    {errors[
                                      `expectedDocumentDate_${index}`
                                    ] && (
                                      <FormHelperText error>
                                        {
                                          errors[
                                            `expectedDocumentDate_${index}`
                                          ]
                                        }
                                      </FormHelperText>
                                    )}
                                  </Box>
                                </Grid>
                                <Box ml={2}>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    If you do not have the Releasing Letter and
                                    Experience Letter, and are unable to submit
                                    them, please do not fill in the expected
                                    date.
                                  </Typography>
                                </Box>
                              </Box>
                            )}
                          </Grid>
                        </Grid>
                      </Container>
                    </Grid>
                  )}
                </Card>
              ))}
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button disabled={IsSubmitted} variant="outlined" onClick={handleAddCompany}>
                  Add Another Company
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={IsSubmitted}
                >
                  Save and Next
                </Button>
              </Box>
            </Box>
          </form>
        </CardContent>
      </FormCard>
      <NavigationRow>
        <StyledLink to="/PersonalInformation">Personal Information</StyledLink>
        <StyledLink to="/PreviousWorkDetailsPage">
          Previous Work Details
        </StyledLink>
        <StyledLink to="/EducationDetailsPage">Education Details</StyledLink>
        <StyledLink to="/SkillsAndCertificationsPage">
          Skills and Certifications
        </StyledLink>
      </NavigationRow>
      <ToastContainer />
    </Container>
  );
};
export default PreviousWorkDetailsPage;
