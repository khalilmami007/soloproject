import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = ({ setCurrentUser }) => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const validateRegisterForm = () => {
    const errors = {};

    // Validate first name
    if (formData.firstname.trim().length < 2) {
      errors.firstname = 'First name must be at least 2 characters';
    }

    // Validate last name
    if (formData.lastname.trim().length < 2) {
      errors.lastname = 'Last name must be at least 2 characters';
    }

    // Validate email
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Validate password
    if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    // Validate password match for registration
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateLoginForm = () => {
    const errors = {};

    // Validate email
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Validate password
    if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!validateRegisterForm()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      console.log(response.data);
      navigate('/books');
    } catch (error) {
      console.error(error.response.data.message);
      // Handle error (show error message or redirect)
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!validateLoginForm()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      console.log(response.data);

      navigate('/books');
      // Store the token in localStorage or a state management library
      // Redirect or show success message
    } catch (error) {
      console.error(error.response.data.message);
      // Handle error (show error message or redirect)
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegisterSubmit}>
        <div>
          <label>
            First Name:
            <input type="text" name="firstname" onChange={(e) => setFormData({ ...formData, firstname: e.target.value })} required />
          </label>
          {formErrors.firstname && <p className="error">{formErrors.firstname}</p>}
        </div>
        <br />
        <div>
          <label>
            Last Name:
            <input type="text" name="lastname" onChange={(e) => setFormData({ ...formData, lastname: e.target.value })} required />
          </label>
          {formErrors.lastname && <p className="error">{formErrors.lastname}</p>}
        </div>
        <br />
        <div>
          <label>
            Email:
            <input type="email" name="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          </label>
          {formErrors.email && <p className="error">{formErrors.email}</p>}
        </div>
        <br />
        <div>
          <label>
            Password:
            <input type="password" name="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
          </label>
          {formErrors.password && <p className="error">{formErrors.password}</p>}
        </div>
        <br />
        <div>
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
          </label>
          {formErrors.confirmPassword && <p className="error">{formErrors.confirmPassword}</p>}
        </div>
        <br />
        <button type="submit">Register</button>
      </form>

      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label>
            Email:
            <input type="email" name="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          </label>
          {formErrors.email && <p className="error">{formErrors.email}</p>}
        </div>
        <br />
        <div>
          <label>
            Password:
            <input type="password" name="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
          </label>
          {formErrors.password && <p className="error">{formErrors.password}</p>}
        </div>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Auth;
