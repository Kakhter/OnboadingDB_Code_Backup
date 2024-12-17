import {
  Card,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  TextField,
} from "@mui/material";
import { ArrowArcLeft } from "@phosphor-icons/react/dist/ssr";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ApprovedCandidates = () => {
  const [rows, setRows] = useState([]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Overview");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
         // "process.env.REACT_APP_BASEURL + `/userforms/getacceptedusers"
           `${process.env.REACT_APP_BASEURL}/userforms/getacceptedusers`
        );
        // console.log(response.data);
        setRows(response.data);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <IconButton onClick={handleClick}>
          <ArrowArcLeft />
        </IconButton>
      </div>
      <Card sx={{ borderRadius: 4, margin: "8px" }}>
        <Box sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableCell>FirstName</TableCell>
              <TableCell>MiddleName</TableCell>
              <TableCell>LastName</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>New Employee ID</TableCell>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.UserID}>
                  <TableCell>{row.FirstName}</TableCell>
                  <TableCell>{row.MiddleName}</TableCell>
                  <TableCell>{row.LastName}</TableCell>
                  <TableCell>{row.Email}</TableCell>
                  <TableCell>
                    <TextField placeholder="Enter the Employee ID">
                      Enter New Employee ID
                    </TextField>
                  </TableCell>
                </TableRow>
              ))}
              ;
            </TableBody>
          </Table>
        </Box>
        <Divider />
      </Card>
    </>
  );
};

export default ApprovedCandidates;
