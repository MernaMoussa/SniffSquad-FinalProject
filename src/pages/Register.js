import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import { baseUrl } from "../constants/baseurl";
import logoLight from "../bg-img/logo-light.png";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });
      if (response.ok) {
        navigate("/protected/profile");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An unexpected error occurred");
    }
    setSubmitting(false);
  };

  return (
    <Container maxWidth="xl" style={{ height: "100vh" }}>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="stretch "
        style={{ height: "100%" }}
      >
        <Grid item md={5}>
          <Paper
            elevation={3}
            style={{
              padding: "2rem",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              src={logoLight}
              alt="Logo"
              sx={{
                width: 358,
                height: 175,
                margin: "0 auto 1rem",
                borderRadius: 0,
              }}
            />
            <Typography variant="h4" gutterBottom>
              Welcome
            </Typography>
            <Typography variant="body1">Please login to continue</Typography>
          </Paper>
        </Grid>

        <Grid
          item
          md={7}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={3}
            style={{ padding: "2rem" }}
            sx={{ bgcolor: "secondary.softer" }}
          >
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Required"),
                password: Yup.string().required("Required"),
              })}
              onSubmit={handleLogin}
            >
              <Form>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  variant="outlined"
                  margin="normal"
                  autoComplete="email"
                  sx={{ bgcolor: "white", borderRadius: 1 }}
                />
                <ErrorMessage name="email" component="div" />

                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  margin="normal"
                  type="password"
                  autoComplete="current-password"
                  sx={{ bgcolor: "white", borderRadius: 1 }}
                />
                <ErrorMessage name="password" component="div" />

                {error && <div style={{ color: "red" }}>{error}</div>}

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ marginTop: "1rem" }}
                >
                  Submit
                </Button>
              </Form>
            </Formik>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
