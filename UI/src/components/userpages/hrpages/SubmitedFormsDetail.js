import {
  Typography,
  TextField,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SubmittedFormsDetail = () => {
  const navigate = useNavigate();
  const { UserID } = useParams();
  const [data, setData] = useState(null);
  const [Remarks, setRemarks] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASEURL}/users/getUserFormsDetails/${UserID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const nationalityID = response.data.formData.personalDetails.Nationality;
        //Get Nationality in text not by id
        const getNationalityByID = await fetch(`${process.env.REACT_APP_BASEURL}/countries/getNationalityByID/${nationalityID}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        
        const nationalityName = await getNationalityByID.json();

        response.data.formData.personalDetails.Nationality=nationalityName;
        setData(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchData();
  }, [UserID]);
  //function to handle the accept the form
  const handleAccept = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASEURL}/userforms/markaccepted/${UserID}`,
        { Remarks }
      );
      if (response.status === 200) {
        console.log("Form accepted successfully");
        alert("Form accepted successfully");
        navigate("/UsersSubmitted");
      } else {
        console.log("Error accepting form");
        alert("Error accepting form");
      }
    } catch (error) {
      alert("Error during accept:", error);
    }
  };

  //function to handle the rejction of the form
  const handleReject = async () => {
    
    try {
      
      const response = await axios.put(
        `${process.env.REACT_APP_BASEURL}/userforms/markrejected/${UserID}`,
        { Remarks }
      );
      if (response.status === 200) {
        console.log("Form rejected successfully");
        alert("Form rejected successfully");
        navigate("/UsersSubmitted");

      } else {
        console.log("Error rejecting form");
        alert("Error rejecting form");
         
       
      }
    } catch (error) {
      console.error("Error during accept:", error);
      alert("Error during accept:", error);
    }
  };
  const personalDetails = data ? data.formData.personalDetails : [];
  const educationTran = data ? data.formData.educationTran : [];
  const previousWorkTran = data ? data.formData.previousWorkTran : [];
  const previousGyanSysEmployeeDetails = data
    ? data.formData.previousGyanSysEmployeeDetails
    : [];
  const skills = data ? data.formData.skills : [];
  const documents = data ? data.formData.documents : [];
  const certificationTran = data ? data.formData.certificationTran : [];

  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        User Details
      </Typography>

      {personalDetails && (
        <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
          <Typography variant="h6" color="textPrimary" sx={{ padding: "16px", fontWeight: 'bold' }}>
            Personal Details:
          </Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>{personalDetails.FirstName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Middle Name</TableCell>
                <TableCell>{personalDetails.MiddleName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Last Name</TableCell>
                <TableCell>{personalDetails.LastName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Date of Birth</TableCell>
                <TableCell>
                  {new Date(personalDetails.DOB).toLocaleDateString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Gender</TableCell>
                <TableCell>{personalDetails.Gender}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Marital Status</TableCell>
                <TableCell>{personalDetails.MaritalStatus}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Nationality</TableCell>
                <TableCell>{personalDetails.Nationality}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Aadhar Number</TableCell>
                <TableCell>{personalDetails.AadharNo}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {educationTran && educationTran.length > 0 && (
        <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
          <Typography variant="h6" color="textPrimary" sx={{ padding: "16px",fontWeight: 'bold' }}>
            Education Details:
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.NO</TableCell>
                <TableCell>Institute Name</TableCell>
                <TableCell>Board/University</TableCell>
                <TableCell>Degree</TableCell>
                <TableCell>CGPA</TableCell>
                <TableCell>Passed On</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {educationTran.map((edu, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{edu.InstituteName}</TableCell>
                  <TableCell>{edu.BoardORUniversity}</TableCell>
                  <TableCell>{edu.Degree}</TableCell>
                  <TableCell>{edu.CGPA}</TableCell>
                  <TableCell>
                    {new Date(edu.PassedOn).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {previousWorkTran && previousWorkTran.length > 0 && (
        <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
          <Typography variant="h6" color="textPrimary" sx={{ padding: "16px",fontWeight: 'bold' }}>
            Previous Work Details:
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.NO</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Compensation</TableCell>
                <TableCell>Currency</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Employment Type</TableCell>
                <TableCell>HR Name</TableCell>
                <TableCell>HR Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {previousWorkTran.map((work, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{work.CompanyName}</TableCell>
                  <TableCell>{work.Address}</TableCell>
                  <TableCell>{work.Compensation}</TableCell>
                  <TableCell>{work.Currency}</TableCell>
                  <TableCell>{work.DesignationName}</TableCell>
                  <TableCell>{work.EmploymentType}</TableCell>
                  <TableCell>{work.HRName}</TableCell>
                  <TableCell>{work.HREmail}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {previousGyanSysEmployeeDetails && (
        <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
          <Typography variant="h6" color="textPrimary" sx={{ padding: "16px",fontWeight: 'bold' }}>
            Previous GyanSys Employment Details:
          </Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Date of Joining</TableCell>
                <TableCell>
                  {previousGyanSysEmployeeDetails.DateOfJoining}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Date of Relieving</TableCell>
                <TableCell>
                  {previousGyanSysEmployeeDetails.DateOfRelieving}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Designation While Relieving</TableCell>
                <TableCell>
                  {previousGyanSysEmployeeDetails.DesignationWhileRelieving}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Previous GyanSys Emp ID</TableCell>
                <TableCell>
                  {previousGyanSysEmployeeDetails.PreviousGyanSysEmpID}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
       {/* Hide by me #### */}
      {/* {skills && skills.length > 0 && (
        <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
          <Typography variant="h6" color="textPrimary" sx={{ padding: "16px" }}>
            Skills
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.NO.</TableCell>
                <TableCell>Skills</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {skills[0].Skills.map((skill, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{skill}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )} */}

      {documents && documents.length > 0 && (
        <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
          <Typography variant="h6" color="textPrimary" sx={{ padding: "16px",fontWeight: 'bold' }}>
            Documents:
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.NO</TableCell>
                <TableCell>Document ID</TableCell>
                <TableCell>Document Type</TableCell>
                <TableCell>Preview</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.map((document, index) => {
                const blob = new Blob(
                  [new Uint8Array(document.DocScanned.data)],
                  { type: document.mimeType }
                );
                const url = URL.createObjectURL(blob);

                return (
                  <TableRow key={document.DocID}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{document.IDNumber}</TableCell>
                    <TableCell>{document.DocumentTypeMaster.DocType}</TableCell>
                    <TableCell>
                      {document.mimeType.startsWith("image/") ? (
                        <img
                          src={url}
                          alt={`Document ${document.DocID}`}
                          style={{ maxWidth: "200px", maxHeight: "200px" }}
                        />
                      ) : document.mimeType === "application/pdf" ? (
                        <iframe
                          src={url}
                          title={`Document ${document.DocID}`}
                          style={{ width: "200px", height: "200px" }}
                        />
                      ) : (
                        <div>Preview not available</div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {certificationTran && certificationTran.length > 0 && (
        <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
          <Typography variant="h6" color="textPrimary" sx={{ padding: "16px", fontWeight: 'bold' }}>
            Certfications and Skills:
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.NO.</TableCell>
                <TableCell>Certifcate Link</TableCell>
                <TableCell>Certification Name</TableCell>
                <TableCell>Skills</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {certificationTran.map((certificate, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>

                  <TableCell>
                    <a
                      href={certificate.CertificateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link
                    </a>
                  </TableCell>

                  <TableCell>{certificate.CertificateName}</TableCell>
                  <TableCell>{certificate.Skills}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Stack spacing={2} mt={3} sx={{ width: "90%", margin: "auto" }}>
        <TextField
          label="Remarks"
          name="Remarks"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={Remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={handleAccept}>
            Accept
          </Button>
          <Button variant="contained" color="secondary" onClick={handleReject}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};

export default SubmittedFormsDetail;
