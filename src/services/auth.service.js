import { baseUrl } from "../constants/baseurl";

const isAuthenticatedService = async () => {
  try {
    const response = await fetch(`${baseUrl}/check-auth`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  } catch (error) {
    console.error("Error checking authentication status:", error);
    return { isAuthenticated: false };
  }
};

export default isAuthenticatedService;
