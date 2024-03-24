import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../constants/baseurl";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  return (
    <div style={containerStyle}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string().required("Required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await fetch(`${baseUrl}/login`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });
            if (response.ok) {
              navigate("/profile");
            } else {
              const errorData = await response.json();
              setError(errorData.message || "Login failed");
            }
          } catch (error) {
            console.error("Error logging in:", error);
            setError("An unexpected error occurred");
          }
          setSubmitting(false);
        }}
      >
        <Form style={formStyle}>
          <label htmlFor="email">Email Address</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" />

          <label htmlFor="password">Password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" />

          {error && <div style={{ color: "red" }}>{error}</div>}

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  margin: "30px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  width: "50%",
  justifyContent: "center",
};

export default Login;
