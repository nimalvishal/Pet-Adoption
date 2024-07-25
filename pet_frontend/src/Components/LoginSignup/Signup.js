// SignUp.js
import React, { useState } from 'react';
import person_icon from '../Assets/profile.png';
import email_icon from '../Assets/mail.png';
import password_icon from '../Assets/password.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

export const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    navigate("/Login")
    try {
      const response = await axios.post('http://localhost:8001/signup_form', formData);
      console.log('Form submitted:', response.data);
      // Optionally, you can reset the form after successful submission
      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
       alert('Error submitting form:', error);

      if (error.response) {
        // Check for specific error status codes
        if (error.response.status === 400) {
          setError(error.response.data.message);
        } else {
          setError('An error occurred while processing your request.');
        }
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='sign-container'>
      <div className='header'>
        <div className='text'>SIGN UP</div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <img src={person_icon} alt="" style={{ width: '30px', height: '30px' }} />
          <input
            type='text'
            name='name'
            placeholder='Username'
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className='input'>
          <img src={email_icon} alt="" style={{ width: '30px', height: '30px' }} />
          <input
            type='email'
            name='email'
            placeholder='Email Id'
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className='input'>
          <img src={password_icon} alt="" style={{ width: '30px', height: '30px' }} />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='error-message'>{error && <p>{error}</p>}</div>
      <div className='submit-container'>
        <div className={`submit ${loading ? 'loading' : ''}`} onClick={handleSubmit}>
          {loading ? 'Submitting...' : 'SUBMIT'}
        </div>
        <div className="submit"><Link to="/Login">BACK</Link></div>
      </div>
    </div>
  );
};
