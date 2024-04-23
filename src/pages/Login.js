import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import logoLight from "../bg-img/logo-light.png";
import { UserContext } from "../context/UserProvider";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const { loginUser, error } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await loginUser(values, setSubmitting);
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
