import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import isAuthenticated from "./services/auth.service";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./styles/theme";

function App() {
  const isAuth = isAuthenticated();

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
            {!isAuth && <Navigate to="/login" replace />}
            <Route path="/protected">
              {!isAuth && <Navigate to="/login" replace />}
              <Route index element={<Navigate to="profile" replace />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
