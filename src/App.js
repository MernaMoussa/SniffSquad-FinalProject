//import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
//import isAuthenticatedService from "./services/auth.service";
import theme from "./styles/theme";

function App() {
  /*const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { isAuthenticated } = await isAuthenticatedService();
      setIsAuth(isAuthenticated);
    };
    checkAuth();
  }, []);*/

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <CssBaseline />
      <div id="App">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/*<Route
              path="/profile"
              element={isAuth ? <Profile /> : <Navigate to="/login" replace />}
            />*/}
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
