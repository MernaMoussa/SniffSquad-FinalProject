  import { Routes, Route } from "react-router-dom";
  import { ThemeProvider } from "@mui/material/styles";
  import CssBaseline from "@mui/material/CssBaseline";
  import MainLayout from "./layouts/MainLayout";
  import Home from "./pages/Home";
  import About from "./pages/About";
  import Contact from "./pages/Contact";
  import Login from "./pages/Login";
  import Register from "./pages/Register";
  import theme from "./styles/theme";
  import FindPlaymate from "./pages/FindPlaymate";
  import NoPageFound from "./pages/NoPageFound";
  import UserProvider from "./context/UserProvider";
  import Profile from "./pages/Profile";
  import Schedule from "./pages/Schedule";
  import "./styles/style.css";
  import ProtectedRoute from "./components/ProtectedRouter";

  function App() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <div id="App">
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NoPageFound />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/findplaymate"
                  element={
                    <ProtectedRoute>
                      <FindPlaymate />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/schedule-playdate"
                  element={
                    <ProtectedRoute>
                      <Schedule />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </div>
        </UserProvider>
      </ThemeProvider>
    );
  }

  export default App;
