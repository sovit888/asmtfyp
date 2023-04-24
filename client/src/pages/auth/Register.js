import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <>
      <div className="container">
        <h4> Register Page</h4>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type={'text'}
            name="username"
            id="username"
            className="form-control"
          />
        </div>
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
          Already have ann account?<Link to="/">Click</Link> here
        </p>
      </div>
    </>
  );
};

export default Register;
