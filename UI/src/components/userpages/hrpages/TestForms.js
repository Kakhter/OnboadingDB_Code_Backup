import React from 'react'
import { useContext } from "react";
import UserContext from "../context/UserContext";


const TestForm=()=>{
    const name = localStorage.getItem('user');

    return(
        <>
        <div style={{height:"100vh",backgroundColor:"yellow"}}>
        Test Form
        {name}
       
        </div>
       
        </>
    )
}

export default TestForm