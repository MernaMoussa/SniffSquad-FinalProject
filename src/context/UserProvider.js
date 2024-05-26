import React, { createContext, useEffect, useState } from "react";
import { baseUrl } from "../constants/baseurl";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [userPicture, setUserPicture] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const accessToken = document.cookie.includes("access_token");
    console.log(accessToken);
    if (accessToken) {
      fetchUserData();
      setIsAuth(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserPicture();
    }
  }, [user]);

  useEffect(() => {
    setCheckedAuth(true);
  }, [isAuth]);

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

  const fetchUserPicture = async () => {
    try {
      const response = await fetch(`${baseUrl}/user/photo`, {
        method: "GET",
        credentials: "include",
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to fetch user picture");
      }

      const data = await response.json();
      console.log(data);

      const photoUrl = data?.pictureUrl;
      console.log(photoUrl);

      setUserPicture(photoUrl);
    } catch (error) {
      console.error("Error fetching user picture:", error);
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
        setIsAuth(true);
        const { user: userData } = responseData;
        const photoUrl = userData?.pictureUrl;
        console.log(photoUrl);
        console.log(userData);
        setUser(userData);
        setUserPicture(photoUrl);
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
      setUserPicture(null);
      setIsAuth(false);
      navigate("/");
    } catch (error) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        error,
        userPicture,
        setUserPicture,
        isAuth,
        setIsAuth,
        checkedAuth,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
