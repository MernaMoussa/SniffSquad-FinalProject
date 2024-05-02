import React, { createContext, useEffect, useState } from "react";
import { baseUrl } from "../constants/baseurl";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const accessToken = document.cookie.includes("access_token");
    if (accessToken) {
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${baseUrl}/profile`, {
        method: "GET",
        credentials: "include",
      });
      console.log("Profile response:", response);
      if (response.ok) {
        const userData = await response.json();
        console.log("User data:", userData);
        setUser(userData);
      } else {
        console.log("User data fetch failed:", response.status);
        setUser(null);
        setError("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Fetch user data error:", error);
      setUser(null);
      setError("An unexpected error occurred");
    }
  };

  const loginUser = async (userData, setSubmitting, navigate) => {
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
    } finally {
      setSubmitting(false);
    }
  };

  const logoutUser = async (navigate) => {
    try {
      await fetch(`${baseUrl}/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      navigate("/");
    } catch (error) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, error }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
