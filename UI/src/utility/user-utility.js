import React from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
 
const userUtility_isGyansysEmp = async () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userID = decoded.UserID;
 
  const previousGyansysDetails = await axios.get(
    `${process.env.REACT_APP_BASEURL}/previousGyanSysEmps/${userID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return previousGyansysDetails;
};

const userUtility_isSubmitted = async () => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userID = decoded.UserID;
   
    const IsSubmitted = await fetch(
       
       `${process.env.REACT_APP_BASEURL}/personaldetails/${userID}`,
         {
           method: "GET",
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
       );
  
       const response = await IsSubmitted.json();
       const isSubmitted = response.Submitted;
       console.log(isSubmitted);

    return isSubmitted;
  };



 
export {userUtility_isSubmitted,userUtility_isGyansysEmp};