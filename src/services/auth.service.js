const isAuthenticatedService = async () => {
  try {
  } catch (error) {
    console.error("Error verifying token:", error);
    return false;
  }
};

export default isAuthenticatedService;
