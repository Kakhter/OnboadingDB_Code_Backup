import React from "react";
import { useEffect, createContext } from "react";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // console.log(children);
  //alert(children);
  console.log(children);
  // const [user, setUser] = useState();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  //no use of this

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     try {
  //       const decodedToken = jwtDecode(token);
  //       setUser({
  //         UserID: decodedToken.UserID,
  //         FullName: decodedToken.FullName,
  //         Email: decodedToken.Email,
  //         Active: decodedToken.Active,
  //         RoleID: decodedToken.RoleID,
  //         SessionStartDateTime: decodedToken.SessionStartDateTime,
  //         SessionID: decodedToken.SessionID,
  //         token,
  //       });
  //     } catch (error) {
  //       console.error("Failed to decode token", error);
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   if (user) {
  //     localStorage.setItem("user", JSON.stringify(user));
  //   }
  // }, [user]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
