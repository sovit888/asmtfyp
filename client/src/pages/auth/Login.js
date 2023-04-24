import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginSchema } from '../../schema/auth';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <>
      <div className="container">
        <h4> Login Page</h4>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type={'email'}
            name="email"
            id="email"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type={'password'}
            name="password"
            id="password"
            className="form-control"
          />
        </div>
        <input
          type={'submit'}
          className="btn btn-primary mt-2"
          value={'Login'}
        />
        <p>
          Do not have an account?<Link to="/register">Click</Link> here
        </p>
      </div>
    </>
  );
};

export default Login;
