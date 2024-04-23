import React, { createContext, useState } from "react";
import { baseUrl } from "../constants/baseurl";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

function UserProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const loginUser = async (userData, setSubmitting) => {
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });

      if (response.ok) {
        const responseData = await response.json();
        const { user: userData } = responseData;
        setUser(userData);
        navigate("/findplaymate");
      } else {
        const errorData = await response.json();
        setError(errorData?.message || "Login failed");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    }
    setSubmitting(false);
  };

  const logoutUser = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, error }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
