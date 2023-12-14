import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {API_BASE_URL} from './config';
const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'patient', // Default as 'patient'
    isDoctor: false, // Initialize isDoctor based on userType
  });

  const Navigate =useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckBoxChange = () => {
    setFormData({
      ...formData,
      isDoctor: !formData.isDoctor,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
      try {
        const requestData = {
          ...formData,
          userType: formData.isDoctor ? 'doctor' : 'patient',
        };
        await axios.post(`${API_BASE_URL}/api/signup`, requestData);
        console.log('User registered successfully');
        Navigate('/login'); 
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
        <label>
            Are you a patient?
            <input
              type="checkbox"
              name="isPatient"
              checked={!formData.isDoctor}
              onChange={() => handleCheckBoxChange("isPatient")}
            />
          </label>
          <label>
            Are you a doctor?
            <input
              type="checkbox"
              name="isDoctor"
              checked={formData.isDoctor}
              onChange={() => handleCheckBoxChange("isDoctor")}
              />
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
