import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./App.css";

const validationSchema = Yup.object({
  username: Yup.string().min(5).required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  age: Yup.number().min(18).required("Age is required"),
  gender: Yup.string().required("Gender is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const MyForm = () => {
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        age: "",
        gender: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
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

          <div>
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
