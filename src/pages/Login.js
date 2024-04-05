import React, { useState } from "react";
import { useFormik } from "formik";
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

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("values:", values);
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
        console.log("API response:", response);
        if (response.ok) {
          navigate("/profile");
        } else {
          const errorData = await response.json();
          console.error("Error data from API:", errorData);
          setError(errorData.message || "Login failed");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        setError("An unexpected error occurred");
      }
      setSubmitting(false);
    },
  });

  return (
    <Container maxWidth="xl" style={{ minHeight: "100vh" }}>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="stretch"
        style={{ height: "100%" }}
      >
        <Grid item xs={12} md={6} lg={5}>
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
                width: { xs: 200, md: 358 },
                height: { xs: 100, md: 175 },
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
        <Grid item xs={12} md={6} lg={7}>
          <Paper
            elevation={3}
            style={{ padding: "2rem" }}
            sx={{ bgcolor: "secondary.softer" }}
          >
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                variant="outlined"
                margin="normal"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ bgcolor: "white", borderRadius: 1 }}
              />
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                margin="normal"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                sx={{ bgcolor: "white", borderRadius: 1 }}
              />
              {error && (
                <div style={{ color: "red", marginTop: "0.5rem" }}>{error}</div>
              )}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginTop: "1rem" }}
              >
                Submit
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
