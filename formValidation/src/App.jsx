import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./App.css";

const validationSchema = Yup.object({
  username: Yup.string().min(5).required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  age: Yup.number().min(18).required("Age is required"),
  gender: Yup.string().required("Gender is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
});

const MyForm = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (values, { resetForm }) => {
    setSubmittedData(values);
    setTimeout(() => {
      resetForm();
      setSubmittedData(null);
      window.location.reload();
    }, 5000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Formik
        initialValues={{
          username: "",
          email: "",
          age: "",
          gender: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <h1 style={{ textAlign: "center" }}>Form</h1>
            <div>
              <Field type="text" name="username" placeholder="Username" />
              <ErrorMessage name="username" component="div" />
            </div>
            <div>
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <Field type="number" name="age" placeholder="Enter your age" />
              <ErrorMessage name="age" component="div" />
            </div>
            <div>
              <Field as="select" name="gender">
                <option value="" label="Select gender" />
                <option value="male" label="Male" />
                <option value="female" label="Female" />
                <option value="other" label="Other" />
              </Field>
              <ErrorMessage name="gender" component="div" />
            </div>

            <div style={{ position: "relative" }}>
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
              />
              <span
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              <ErrorMessage name="password" component="div" />
            </div>

            <div style={{ position: "relative" }}>
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Re-Enter Password"
              />
              <span
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              <ErrorMessage name="password" component="div" />
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
      {submittedData && (
        <div className="card">
          <h2>Submitted Data</h2>
          <p>Username: {submittedData.username}</p>
          <p>Email: {submittedData.email}</p>
          <p>Age: {submittedData.age}</p>
          <p>Gender: {submittedData.gender}</p>
        </div>
      )}
    </>
  );
};

export default MyForm;
