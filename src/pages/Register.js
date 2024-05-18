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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { baseUrl } from "../constants/baseurl";
import logoLight from "../bg-img/logo-light.png";
import { genderOptions } from "../common/DogOptions";
import SuccessMessage from "../constants/SuccessMessage";

const validationSchema = Yup.object({
  gender: Yup.string().required("Required"),
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  phone_number: Yup.string(),
  date_of_birth: Yup.date().required("Required"),
  password: Yup.string().required("Required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const Registration = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      gender: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      date_of_birth: "",
      password: "",
      confirm_password: "",
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
                <Grid item xs={12} md={12} lg={12}>
                  <FormControl
                    sx={{ width: "25ch", bgcolor: "white", borderRadius: 1 }}
                  >
                    <InputLabel id="gender">Gender</InputLabel>
                    <Select
                      labelId="gender"
                      id="select-gender"
                      name="gender"
                      value={formik.values.gender}
                      label="gender"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.gender && Boolean(formik.errors.gender)
                      }
                      helpertext={formik.touched.gender && formik.errors.gender}
                    >
                      {genderOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {formik.touched.gender && formik.errors.gender && (
                    <div style={{ color: "red" }}>{formik.errors.gender}</div>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="first_name"
                    name="first_name"
                    label="First Name"
                    variant="outlined"
                    margin="normal"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.first_name &&
                      Boolean(formik.errors.first_name)
                    }
                    helperText={
                      formik.touched.first_name && formik.errors.first_name
                    }
                    sx={{ bgcolor: "white", borderRadius: 1 }}
                  />
                  {formik.touched.first_name && formik.errors.first_name && (
                    <div style={{ color: "red" }}>
                      {formik.errors.first_name}
                    </div>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="last_name"
                    name="last_name"
                    label="Last Name"
                    variant="outlined"
                    margin="normal"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.last_name &&
                      Boolean(formik.errors.last_name)
                    }
                    helperText={
                      formik.touched.last_name && formik.errors.last_name
                    }
                    sx={{ bgcolor: "white", borderRadius: 1 }}
                  />
                  {formik.touched.last_name && formik.errors.last_name && (
                    <div style={{ color: "red" }}>
                      {formik.errors.last_name}
                    </div>
                  )}
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="phone_number"
                    name="phone_number"
                    label="Phone Number"
                    variant="outlined"
                    margin="normal"
                    value={formik.values.phone_number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.phone_number &&
                      Boolean(formik.errors.phone_number)
                    }
                    helperText={
                      formik.touched.phone_number && formik.errors.phone_number
                    }
                    sx={{ bgcolor: "white", borderRadius: 1 }}
                  />
                  {formik.touched.phone_number &&
                    formik.errors.phone_number && (
                      <div style={{ color: "red" }}>
                        {formik.errors.phone_number}
                      </div>
                    )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="date_of_birth"
                    name="date_of_birth"
                    label="Date of Birth"
                    type="date"
                    variant="outlined"
                    margin="normal"
                    value={formik.values.date_of_birth}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.date_of_birth &&
                      Boolean(formik.errors.date_of_birth)
                    }
                    helperText={
                      formik.touched.date_of_birth &&
                      formik.errors.date_of_birth
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{ bgcolor: "white", borderRadius: 1 }}
                  />
                  {formik.touched.date_of_birth &&
                    formik.errors.date_of_birth && (
                      <div style={{ color: "red" }}>
                        {formik.errors.date_of_birth}
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
                    id="confirm_password"
                    name="confirm_password"
                    label="Confirm Password"
                    variant="outlined"
                    margin="normal"
                    type="password"
                    value={formik.values.confirm_password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.confirm_password &&
                      Boolean(formik.errors.confirm_password)
                    }
                    helperText={
                      formik.touched.confirm_password &&
                      formik.errors.confirm_password
                    }
                    sx={{ bgcolor: "white", borderRadius: 1 }}
                  />
                  {formik.touched.confirm_password &&
                    formik.errors.confirm_password && (
                      <div style={{ color: "red" }}>
                        {formik.errors.confirm_password}
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
          <SuccessMessage
            setSuccessMessageOpen={setSuccessMessageOpen}
            successMessageOpen={successMessageOpen}
            successMessage="User registered successfully!"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Registration;
