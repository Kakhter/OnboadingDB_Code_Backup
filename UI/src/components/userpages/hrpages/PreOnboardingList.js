import React, { useEffect, useState,DatePicker } from "react";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment/moment";
import axios from "axios";
import * as XLSX from "xlsx";
import { Delete } from "@mui/icons-material";

import {
  
  FormControl,
  InputLabel,
  Avatar,
  Box,
  Card,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
  TextField,

  IconButton,
  MenuItem,
  tfBigStyling,
  Select,
} from "@mui/material";
import { Export } from "@phosphor-icons/react/dist/ssr";

import { ArrowArcLeft, PlusCircle,DownloadSimple } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

function PreOnboardingList() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState(() => {
    const storedCandidates = localStorage.getItem("candidates");
    return storedCandidates ? JSON.parse(storedCandidates) : [];
  });

  const [statusMessages, setStatusMessage] = useState(() => {
    const storedMessages = localStorage.getItem("statusMessages");
    return storedMessages ? JSON.parse(storedMessages) : {};
  });

  //New Code
  const handleExport = () => {
    const remainingCandidates = candidates;
    // .filter(
    //   (_, index) => statusMessages[index] !== "Password sent Successfully"
    // );
 
    const exportData = remainingCandidates.map((candidate) => ({
      FirstName: candidate.FirstName,
      MiddleName: candidate.MiddleName,
      LastName: candidate.LastName,
      Email: candidate.Email,
      "Date of Joining": candidate.DOJ,
      "Document Type": candidate.DocType,
      "Document ID": candidate.IDNumber,
      Status: candidate.Status + statusMessages[candidates.indexOf(candidate)] || "",
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Remaining Candidates");
    XLSX.writeFile(workbook, "remaining_candidates.xlsx");
  };

  const handleDelete = (Email) => {
    const updatedCandidates = candidates.filter(
      (candidate) => candidate.Email !== Email
    );
    localStorage.removeItem(Email);
    setCandidates(updatedCandidates);
  };
  // End of new code

  //New code
  const validateFields = () => {
    const validName = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;
    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
 
    if (!newCandidate.FirstName ){ //|| !validName.test(newCandidate.FirstName)) {
      errors.FirstName = "First name is required";
      console.log(errors.FirstName);
    }
 
    // if (newCandidate.MiddleName && !validName.test(newCandidate.MiddleName)) {
    //   errors.MiddleName = "Invalid middle name.";
    // }
 
    if (!newCandidate.LastName ){ //|| !validName.test(newCandidate.LastName)) {
      errors.LastName = "Last name is required.";
    }
 
    if (!newCandidate.Email || !validEmail.test(newCandidate.Email)) {
      errors.Email = "Invalid or empty email address.";
    }
    if (!newCandidate.DOJ) {
      errors.DOJ = "DOJ is required";
    }
 
    // if (!newCandidate.CandidateID) {
    //   errors.CandidateID = "Candidate ID must be entered";
    // }
 
    if (!newCandidate.DocTypeID) {
      errors.DocTypeID = "Document type is required.";
    }
 
    if (!newCandidate.IDNumber) {
      errors.IDNumber = "Document ID is required.";
    }
 
    setValidationErrors(errors);
 
    return Object.keys(errors).length === 0;
  };
  //End of new code

  const docTypeIdMapping = {
    //"Personal Photo": 1,
    //" Signature": 2,
    "Passport": 3,
    "Aadhar Card": 4,
    "PAN Card": 5,
    // " VISA": 6,
    // "X Marksheet": 7,
    // "XII Marksheet": 8,
    // "Graduation Marksheet": 9,
    // "PostGraduation Marksheet": 10,
    // "Releasing Letter": 11,
    // "Experience Letter": 12,
    // " Certificate": 13,
    // " Others": 14,
  };

  //function to map the docid to the doctype
  const docTypeOp = Object.keys(docTypeIdMapping).map((key) => ({
    label: key,
    id: docTypeIdMapping[key],
  }));

  //fucntion to check if the email already exits or not
  const isDuplicateEmail = (email) => {
    return candidates.some((candidate) => candidate.Email === email);
  };

  const [selectedCandidates, setSelectedCandidates] = useState(new Set());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showDocumentUpload, setShowDocumentUpload] = useState(() => {
    const storedUploads = localStorage.getItem("showDocumentUpload");
    return storedUploads ? JSON.parse(storedUploads) : {};
  });
  const [showAddCandidateForm, setShowAddCandidateForm] = useState(false);
  const [newCandidate, setNewCandidate] = useState({
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Email: "",
    DOJ: "",
    CandidateID: "",
    DocTypeID: "",
    DocType: "",
    IDNumber: "",
    Status:"",
  });
  const [validationErrors, setValidationErrors] = useState("");
  const errors={};
  // const  tfBigStyling = () =>{

  // }
  useEffect(() => {
    localStorage.setItem("candidates", JSON.stringify(candidates));
  }, [candidates]);

  useEffect(() => {
    localStorage.setItem("statusMessages", JSON.stringify(statusMessages));
  }, [statusMessages]);
  useEffect(() => {
    localStorage.setItem(
      "showDocumentUpload",
      JSON.stringify(showDocumentUpload)
    );
  }, [showDocumentUpload]);

  const handleClick = () => {
    navigate("/Overview");
  };

  const handleDocTypeChange = (event) => {
    const value = event.target.value;
    setNewCandidate((prev) => ({
      ...prev,
      DocTypeID: value,
    }));
  };

  const handleGeneratePassword = async (index, candidate = null) => {

    // Form Validation is required here. ####
     
    if (candidate === null) {
      candidate = candidates[index];
    }
    const {
      FirstName,
      MiddleName,
      LastName,
      Email,
      DOJ,
      CandidateID,
      DocTypeID,
      IDNumber,
      Status,
    } = candidate;
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        // "process.env.REACT_APP_BASEURL + `/users/sendcode",
        `${process.env.REACT_APP_BASEURL}/users/sendcode`,
        {
          FirstName,
          MiddleName,
          LastName,
          Email,
          DOJ,
          CandidateID,
          DocTypeID,
          IDNumber,
          Status,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setStatusMessage((prevMessages) => ({
          ...prevMessages,
          [index]: "Password sent Successfully",
        }));

        setShowDocumentUpload((prev) => ({
          ...prev,
          [index]: true,
        }));
      } else {
        setStatusMessage((prevMessages) => ({
          ...prevMessages,
          [index]: "Failed to send Password",
        }));
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "An unknown error occurred.";
      setStatusMessage((prevMessages) => ({
        ...prevMessages,
        [index]: errorMessage,
      }));
      // toast(response.error);
    }
  };

  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     try {
  //       const data = new Uint8Array(e.target.result);
  //       const workbook = XLSX.read(data, { type: "array" });
  //       const sheetName = workbook.SheetNames[0];
  //       const sheet = workbook.Sheets[sheetName];
  //       const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  //       if (parsedData.length > 1 && Array.isArray(parsedData[0])) {
  //         const newCandidates = parsedData.slice(1).map((row) => ({
  //           FirstName: row[0] || "",
  //           MiddleName: row[1] || "",
  //           LastName: row[2] || "",
  //           Email: row[3] || "",
  //           DOJ: row[4] || "",
  //           CandidateID: row[5] || "",
  //           DocType: row[6] || "",
  //           IDNumber: row[7] || " ",
  //         }));

  //         isDuplicateEmail();
  //         const existingEmails = new Set(
  //           candidates.map((candidate) => candidate.Email.toLowerCase())
  //         );
  //         const uniqueCandidates = newCandidates.filter(
  //           (candidate) => !existingEmails.has(candidate.Email.toLowerCase())
  //         );
  //         if (uniqueCandidates.length > 0) {
  //           setCandidates((prevCandidates) => [
  //             ...prevCandidates,
  //             ...uniqueCandidates,
  //           ]);
  //         }
  //       } else {
  //         console.error("Invalid data format in the Excel file.");
  //       }
  //     } catch (error) {
  //       console.error("Error parsing the Excel file:", error);
  //     }
  //   };

  //   reader.readAsArrayBuffer(file);
  // };

  //   const handleDocumentUpload = (index, event) => {
  //     const file = event.target.files[0];
  //     console.log(`Uploading document for candidate ${index}:`, file);
  //   };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        console.log(parsedData);

        if (parsedData.length > 1 && Array.isArray(parsedData[0])) {
          const newCandidates = parsedData
            .slice(1)
            .filter((item) => item.length)
            .map((row) => {
              const docType = row[6]?.trim() || "";
              const docTypeID = docTypeIdMapping[docType] || null;
              console.log(
                "DOC TYPE from Excel:",
                docType,
                row[4],
                typeof row[4]
              );

              // Find the matching DocTypeID
              const docTypeId = docTypeIdMapping[docType.trim()] || null; // Default to null if not found

              // const DOJ =
              //   typeof row[4] === "number"
              //     ? moment((row[4] - 25569) * 86400 * 1000) // Accepting different formats
              //         .format("DD/MM/YYYY")
              //     : row[4]?.length
              //     ? moment(row[4], ["MM/DD/YYYY", "YYYY-MM-DD", "X"]) // Accepting different formats
              //         .format("DD/MM/YYYY") // Desired format with time
              //     : "";

              const DOJ =
              typeof row[4] === "number"
                ? moment((row[4] - 25569) * 86400 * 1000).format("YYYY-MM-DD")
                : moment(row[4], ["MM/DD/YYYY", "YYYY-MM-DD", "X"]).isValid()
                ? moment(row[4], ["MM/DD/YYYY", "YYYY-MM-DD", "X"]).format(
                    "YYYY-MM-DD"
                  )
                : "";

                const Fname =
              typeof row[0] === "string"
                ? row[0]
                : "";
                var Status ="";
                if(!Fname || !DOJ || !row[6] || !row[7]){
                  Status ="Invalid row";
                  //setStatusMessage(Status);
                 
                  // setStatusMessage((prevMessages) => ({
                  //   ...prevMessages,
                  //   [index]: "Invalid row",
                  // }))




                }
             
              
              return {
               // FirstName: row[0] || "",
               FirstName:Fname,
                MiddleName: row[1] || "",
                LastName: row[2] || "",
                Email: row[3] || "",
                DOJ,
                CandidateID: row[5] || "",
                DocTypeID: docTypeId,
                DocType: docType, // Use DocTypeID instead of DocType
                IDNumber: row[7] || "",
                Status:Status,
              };
            });

          const existingEmails = new Set(
            candidates.map((candidate) => candidate.Email.toLowerCase())
          );

          const uniqueCandidates = newCandidates.filter(
            (candidate) => !existingEmails.has(candidate.Email.toLowerCase())
          );
// need to update validation.
          if (uniqueCandidates.length > 0) {
           // alert('Loding excel data');
            setCandidates((prevCandidates) => [
              ...prevCandidates,
              ...uniqueCandidates,
            ]);
          }
        } else {
          console.error("Invalid data format in the Excel file.");
        }
      } catch (error) {
        console.error("Error parsing the Excel file:", error);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCandidate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // const isAllSelected =
  //   candidates.length > 0 && selectedCandidates.size === candidates.length;

  //Fucntion to handle the visibility of the manually add
  const handleAddCandidateClick = () => {

    setShowAddCandidateForm((prev) => !prev);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //function to add the candidate to the list and generate password
  const handleAddCandidateSubmit = () => {
   
   if (validateFields())
   {
    if (isDuplicateEmail(newCandidate.Email)) {
      toast.error("Candidate with this email already exists.");
      return;
    }
 
   
    

    const docType =
      docTypeOp.find((option) => option.id === newCandidate.DocTypeID)?.label ||
      "";

    const candidateToAdd = {
      ...newCandidate,
      DocType: docType,
    };

    handleGeneratePassword(candidates.length, newCandidate);
    setCandidates((prev) => [...prev, candidateToAdd]);
    setShowAddCandidateForm(false);
    setNewCandidate({
      FirstName: "",
      MiddleName: "",
      LastName: "",
      Email: "",
      DOJ: "",
      CandidateID: "",
      DocTypeID: "",
      IDNumber: "",
      Status:"",
    });
  }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "0px 10px 0px 10px",
          mb: 2,
        }}
      >
        <div style={{ marginTop: "10px" }}>
          <IconButton onClick={handleClick}>
            <ArrowArcLeft />
          </IconButton>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <label
            htmlFor="upload-button-file"
            style={{ display: "flex", justifyItems: "flex-end" }}
          >
            <input
              accept=".xlsx, .xls"
              id="upload-button-file"
              type="file"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
            <Button
              variant="contained"
              component="span"
              startIcon={<Export />}
              sx={{
                marginTop: "10px",
                display: "flex",
                marginRight: "5px",
                alignItems: "center",
                backgroundColor: "#415a77",
                "&:hover": {
                  backgroundColor: "#1b263b",
                },
                color: "white",
                borderRadius: 4,
              }}
            >
              Import
            </Button>
          </label>

          <Button
            variant="contained"
            component="span"
            startIcon={<PlusCircle />}
            onClick={handleAddCandidateClick}
            sx={{
              marginLeft: "5px",
              marginTop: "10px",
              display: "flex",
              // justifyContent: "flex-start",
              alignItems: "center",
              backgroundColor: "#415a77",
              "&:hover": {
                backgroundColor: "#1b263b",
              },
              color: "white",
              borderRadius: 4,
            }}
          >
            Add Candidate
          </Button>
          {/* <Button
            variant="contained"
            component="span"
            startIcon={<DownloadSimple />}
            sx={{
              marginTop: "10px",
              display: "flex",
              marginLeft: "5px",
              alignItems: "center",
              backgroundColor: "#415a77",
              "&:hover": {
                backgroundColor: "#1b263b",
              },
              color: "white",
              borderRadius: 4,
            }}
            onClick={handleExport}
          >
            Export Pending
          </Button> */}
        </div>
      </Box>
      {showAddCandidateForm && (
        <Card
          sx={{
            padding: "10px",
            marginBottom: "10px",
            borderRadius: 5,
            margin: "0px 10px 10px 10px",
          }}
        >
          <Box
            component="form"
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2 , 1fr)",
              gap: 2,
            }}
          >
            <TextField
              sx={{ borderRadius: 5 }}
              name="FirstName"
              label="First Name"
              value={newCandidate.FirstName}
              onChange={handleInputChange}
              error={!!validationErrors.FirstName}
              helperText={validationErrors.FirstName}
              required
            />
            <TextField
              sx={{ borderRadius: 5 }}
              name="MiddleName"
              label="Middle Name"
              value={newCandidate.MiddleName}
              onChange={handleInputChange}
            />

            <TextField
              sx={{ borderRadius: 5 }}
              name="LastName"
              label="Last Name"
              value={newCandidate.LastName}
              onChange={handleInputChange}
              error={!!validationErrors.LastName}
              helperText={validationErrors.LastName}
              required
            />
            <TextField
              sx={{ borderRadius: 5 }}
              name="Email"
              label="Email"
              value={newCandidate.Email}
              error={!!validationErrors.Email}
              helperText={validationErrors.Email}
              onChange={handleInputChange}
            />
            

            {/* <TextField
              name="CandidateID"
              label="CandidateID"
              value={newCandidate.CandidateID}
              onChange={handleInputChange}
            /> */}

            {/* <TextField
              name="DocTypeID"
              label="DocTypeID"
              value={newCandidate.DocTypeID}
              onChange={handleInputChange}
            /> */}
<FormControl fullWidth>
  <InputLabel>Doc Type</InputLabel>
            <Select
              required="true"
              margin="normal"
              size="medium"
              name="DocTypeID"
              label="Document Type"
              error={!!validationErrors.DocTypeID}
              helperText={validationErrors.DocTypeID}
              value={newCandidate.DocTypeID}
              onChange={handleDocTypeChange}
              //displayEmpty
              // input={<docTypeIdMapping label="Document Type" />}
              MenuProps={{
                PaperProps: {
                  style: {
                    marginTop: "50px",
                    marginTop: "auto",
                    maxHeight: 200, // Adjust height as necessary
                    width: 250, // Adjust width as necessary
                  },
                },
              }}
            >
              <MenuItem value="">
                <em>Select Document Type</em>
              </MenuItem>
              {docTypeOp.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            </FormControl>            

            <TextField
              name="IDNumber"
              label="IDNumber"
              value={newCandidate.IDNumber}
              error={!!validationErrors.IDNumber}
              helperText={validationErrors.IDNumber}
              onChange={handleInputChange}
            />

            <TextField
              name="DOJ"
              format="MM/dd/yyyy"
              //label="DOJ"
              type="date"
              value={newCandidate.DOJ}
              error={!!validationErrors.DOJ}
              helperText={validationErrors.DOJ}
              onChange={handleInputChange}
            />



          </Box>
          <Stack display={"flex"} alignItems={"flex-end"} marginTop={"10px"}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#415a77",
                "&:hover": {
                  backgroundColor: "#1b263b",
                },
              }}
              onClick={handleAddCandidateSubmit}
            >
              Generate Password & Add Candidate
            </Button>
          </Stack>
        </Card>
      )}

      <Card sx={{ borderRadius: 4, margin: "0px 10px 0px 10px" }}>
        <Box sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: "800px"}}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "lightgrey",fontSize: "1.2rem", color:"white"}}>
                <TableCell padding="checkbox">
                  {/* <Checkbox
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                      inputProps={{ "aria-label": "select all candidates" }}
                    /> */}
                </TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>DOJ</TableCell>
                {/* <TableCell> CandidateID</TableCell> */}
                <TableCell> DocType</TableCell>
                <TableCell> IDNumber</TableCell>
                <TableCell> Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {candidates
                .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                .map((candidate, index) => {
                  const globalIndex = page* rowsPerPage + index;
                  return (
                  <TableRow
                    hover
                    key={globalIndex}
                    selected={selectedCandidates.has(globalIndex)}
                  >
                    <TableCell padding="checkbox">
                      {/* <Checkbox
                          checked={selectedCandidates.has(index)}
                          onChange={() => handleSelectOne(index)}
                        /> */}
                    </TableCell>
                    <TableCell>
                      <Stack
                        sx={{ alignItems: "center" }}
                        direction="row"
                        spacing={1}
                      >
                        <Avatar />
                        <Typography variant="subtitle2">
                          {candidate.FirstName} 
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>{candidate.MiddleName} {" "} {candidate.LastName}</TableCell>

                    <TableCell>{candidate.Email}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => handleGeneratePassword(globalIndex)}
                        sx={{
                          backgroundColor: "#415a77",
                          fontSize: ".6rem",
                          "&:hover": {
                            backgroundColor: "#1b263b",
                            fontSize: ".7rem"
                          },
                          width: "100px",
                          height: "40px"
                        }}
                        disabled={
                          statusMessages[globalIndex] === "Password sent Successfully"
                        }
                      >
                        {statusMessages[globalIndex] === "Password sent Successfully"
                          ? "Password Generated"
                          : "Generate Password"}
                      </Button>
                    </TableCell>
                    {/* <TableCell>{statusMessages[index]}</TableCell> */}

                  {/* {!statusMessages[index] || statusMessages[index].includes("Invalid row")
                     ?<TableCell style={{color:"red"}}>{candidate.Status}</TableCell>
                    :<TableCell>{statusMessages[index]}</TableCell> }  */}
                  
                  {!statusMessages[globalIndex]
                  ?<TableCell style={{color:"red"}}>{candidate.Status}</TableCell> 
                  : statusMessages[globalIndex].includes("Invalid row")
                    ?<TableCell style={{color:"red"}}>{statusMessages[globalIndex]}</TableCell> 
                    :<TableCell>{statusMessages[globalIndex]}</TableCell> } 
                   



                    {/* <TableCell>
                        {showDocumentUpload[index] && (
                          <DocumentUpload
                            onUpload={(event) =>
                              handleDocumentUpload(index, event)
                            }
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {showDocumentUpload[index] && (
                          <DocumentUpload
                            onUpload={(event) =>
                              handleDocumentUpload(index, event)
                            }
                          />
                        )}
                      </TableCell> */}
                    {/* <TableCell>{candidate.DOJ}</TableCell> */}
                    <TableCell>
                      {moment(candidate.DOJ).format("DD-MM-YYYY")}
                    </TableCell>

                    {/* <TableCell>{candidate.CandidateID}</TableCell> */}
                    <TableCell>{candidate.DocType}</TableCell>
                    <TableCell>{candidate.IDNumber}</TableCell>
                    <TableCell>
                    <Delete
                        onClick={() => handleDelete(candidate.Email)}
                      />
                    </TableCell>
                    
                  </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Box>
        <Divider />
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={candidates.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <ToastContainer />
      </Card>
    </>
  );
}

export default PreOnboardingList;
