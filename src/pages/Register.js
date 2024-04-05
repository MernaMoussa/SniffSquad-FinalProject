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
  Snackbar,
} from "@mui/material";
import { Alert } from "@mui/material";
import { baseUrl } from "../constants/baseurl";
import logoLight from "../bg-img/logo-light.png";

const validationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  phoneNumber: Yup.string().required("Required"),
  dateOfBirth: Yup.date().required("Required"),
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const Registration = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("Form Values:", values);
      try {
        const response = await fetch(`${baseUrl}/register`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          credentials: "include",
        });
        if (response.ok) {
          setSuccessMessageOpen(true);
          setTimeout(() => navigate("/login"), 2000);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Registration failed");
        }
      } catch (error) {
        console.error("Error registering:", error);
        setError("An unexpected error occurred");
      }
      setSubmitting(false);
    },
  });
  const handleCloseSuccessMessage = () => {
    setSuccessMessageOpen(false);
  };

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
              Registration
            </Typography>
            <Typography variant="body1">
              Please fill in the form to register
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={7}>
          <Paper
            elevation={3}
            style={{ padding: "2rem" }}
            sx={{ bgcolor: "secondary.softer" }}
          >
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    margin="normal"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                    sx={{ bgcolor: "white", borderRadius: 1 }}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <div style={{ color: "red" }}>
                      {formik.errors.firstName}
                    </div>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    margin="normal"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                    sx={{ bgcolor: "white", borderRadius: 1 }}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <div style={{ color: "red" }}>{formik.errors.lastName}</div>
                  )}
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    variant="outlined"
                    margin="normal"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.phoneNumber &&
                      Boolean(formik.errors.phoneNumber)
                    }
                    helperText={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                    sx={{ bgcolor: "white", borderRadius: 1 }}
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <div style={{ color: "red" }}>
                      {formik.errors.phoneNumber}
                    </div>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="dateOfBirth"
                    name="dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    variant="outlined"
                    margin="normal"
                    value={formik.values.dateOfBirth}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.dateOfBirth &&
                      Boolean(formik.errors.dateOfBirth)
                    }
                    helperText={
                      formik.touched.dateOfBirth && formik.errors.dateOfBirth
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{ bgcolor: "white", borderRadius: 1 }}
                  />
                  {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                    <div style={{ color: "red" }}>
                      {formik.errors.dateOfBirth}
                    </div>
                  )}
                </Grid>
              </Grid>

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
              {formik.touched.email && formik.errors.email && (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              )}

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
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
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    sx={{ bgcolor: "white", borderRadius: 1 }}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div style={{ color: "red" }}>{formik.errors.password}</div>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    variant="outlined"
                    margin="normal"
                    type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                    sx={{ bgcolor: "white", borderRadius: 1 }}
                  />
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <div style={{ color: "red" }}>
                        {formik.errors.confirmPassword}
                      </div>
                    )}
                </Grid>
              </Grid>

              {error && <div style={{ color: "red" }}>{error}</div>}

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
          <Snackbar
            open={successMessageOpen}
            autoHideDuration={2000}
            onClose={handleCloseSuccessMessage}
          >
            <Alert
              onClose={handleCloseSuccessMessage}
              severity="success"
              sx={{ width: "100%" }}
            >
              User registered successfully!
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Registration;
