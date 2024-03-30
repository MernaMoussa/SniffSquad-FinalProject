import { baseUrl } from "../constants/baseurl";

const isAuthenticated = async () => {
  try {
    const response = await fetch(`${baseUrl}/profile`, {
      method: "GET",
      credentials: "include",
    });
    return response.ok;
  } catch (error) {
    console.error("Error checking authentication status:", error);
    return false;
  }
};

export default isAuthenticated;
