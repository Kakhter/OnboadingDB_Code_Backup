import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ArrowArcLeft } from "@phosphor-icons/react";
import { PDFDocument, rgb } from "pdf-lib";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
  Card,
  Box,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import form11 from "../../../form_templates/Gratuity_Form.pdf";

const UsersSubmitted = () => {
  const [rows, setRows] = useState([]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Overview");
  };

  // generating forms code
  // Fetch data from the API
  const fetchFormData = async (UserID) => {
    const token = localStorage.getItem("token");
    
    try {
      const response = await axios.get(
        //process.env.REACT_APP_BASEURL + `/users/getUserFormsDetails/${UserID}`,
        `${process.env.REACT_APP_BASEURL}/users/getUserFormsDetails/${UserID}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Read..');
      console.log("Fetched form data:", response.data);
      // return JSON.parse(JSON.stringify(response.data));
      return response.data;
      // Return the data so it can be used in fillPDF
      // Return the data so it can be used in fillPDF
    } catch (error) {
      console.error("Error fetching form data:", error);
      return null;
    }
  };

  // Update the fillPDF function to use fetchFormData
  const fillPDF = async (UserID) => {
    const formDatas = await fetchFormData(UserID);
    console.log(formDatas, "form data");
    if (!formDatas || !formDatas.formData.personalDetails) {
      console.log("Personal details not found in the response.");
      return;
    }

    const {
      FirstName,
      LastName,
      MiddleName,

      Gender,

      MaritalStatus,
    } = await formDatas.formData.personalDetails;

    const pdfBytes = await fetch(form11).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(pdfBytes);

    const page = pdfDoc.getPage(0);
    const page2 = pdfDoc.getPage(1);
    const page3 = pdfDoc.getPage(2);

    const fontSize = 10;
    const textColor = rgb(0, 0, 0);

    // page.drawText(, {
    //   x: 80,
    //   y: 580,
    //   size: fontSize,
    //   color: textColor,
    // });
    page.drawText(`${FirstName} ${MiddleName} ${LastName}`, {
      x: 180,
      y: 530,
      size: fontSize,
      color: textColor,
    });

    page2.drawText(`${FirstName} ${MiddleName} ${LastName}`, {
      x: 220,
      y: 695, // Adjust Y position as needed
      size: fontSize,
      color: textColor,
    });
    page2.drawText(Gender, {
      x: 120,
      y: 680,
      size: fontSize,
      color: textColor,
    });
    page2.drawText(MaritalStatus, {
      x: 290,
      y: 646,
      size: fontSize,
      color: textColor,
    });

    const savePdf = await pdfDoc.save();
    const blob = new Blob([savePdf], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  //function to fetch the list of users who submitted the forms
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASEURL}/userforms`);
        // console.log(response.data);

        const sortedData = response.data.sort(
          (a, b) =>
            new Date(b.CreatedDate).getTime() -
            new Date(a.CreatedDate).getTime()
        );
        console.log(sortedData);
        setRows(sortedData);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, []);

  const handleRowClick = (UserID) => {
    navigate(`/SubmitedFormsDetail/${UserID}`);
  };

  return (
    <>
      <div style={{ marginTop: "5px", marginLeft: "5px" }}>
        <IconButton onClick={handleClick}>
          <ArrowArcLeft />
        </IconButton>
      </div>
      <Card sx={{ borderRadius: 4, margin:"8px"}}>
        <Box sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: "800px" }}>
            <TableHead>
              <TableRow>
                <TableCell>FirstName</TableCell>
                <TableCell>MiddleName</TableCell>
                <TableCell>LastName</TableCell>
                <TableCell>Email</TableCell>
                {/* <TableCell>Accepted</TableCell>
                <TableCell>Rejected</TableCell> */}
                <TableCell>Generate Forms</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.UserID}
                  onClick={() => handleRowClick(row.UserID)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell>{row.FirstName}</TableCell>
                  <TableCell>{row.MiddleName}</TableCell>
                  <TableCell>{row.LastName}</TableCell>
                  <TableCell>{row.Email}</TableCell>
                  {/* <TableCell>{row.Accepted}</TableCell>
                  <TableCell>{row.Rejected}</TableCell> */}
                  <TableCell>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click event
                        fillPDF(row.UserID); // Wrap in anonymous function
                      }}
                    >
                      Gnereate Forms
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Divider />

        <ToastContainer />
      </Card>
    </>
  );
};

export default UsersSubmitted;
