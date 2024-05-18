import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0B334E",
      light: "#0B496E",
      lighter: "#0B5C8E",
    },
    secondary: {
      main: "#FF6544",
      light: "#FF7E44",
      lighter: "#FF9844",
      soft: "#FF8F77",
      softer: "#FFCEC4",
    },
    neutral: {
      light: "#EEEEEE",
      lighter: "#838383",
      dark: "#555555",
      darker: "#333333",
    },

    glowEffect: {
      main: "#93cae6",
    },

    bgOverlay: {
      main: "rgba(0, 0, 0, 0.7098)",
    },
    transparent: {
      main: "rgba(255, 255, 255, 0)",
    },
    background: {
      default: "#FFF5F3",
    },
  },
  typography: {
    h1: {
      fontSize: "5rem",
      fontWeight: "bold",
      "@media (max-width: 768px)": {
        fontSize: "3rem",
      },
      "@media (max-width: 576px)": {
        fontSize: "2rem",
      },
    },
    h2: {
      fontSize: "3.5rem",
      "@media (max-width: 768px)": {
        fontSize: "2.5rem",
      },
      "@media (max-width: 576px)": {
        fontSize: "1.5rem",
      },
    },
  },
});

export default theme;
