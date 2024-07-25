import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import email_icon from '../Assets/mail.png';
import password_icon from '../Assets/password.png';
import './Login.css';
import axios from 'axios';
export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8001/signup_form/login', {
        email,
        password,
      });
      if (response.data.message === 'Login successful') {
        setFlag(true);
        localStorage.setItem('flag','true')
        navigate('../Homepage');
        // Redirect or perform actions after successful login
      } else {
        window.alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      window.alert('Error logging in. Please try again.');
    }
  };



  return (
    <div className='login-container'>
      <div className='header'>
        <div className='text'>LOGIN</div>
      </div>

      <div className='inputs'>
        <div className='input'>
          <img src={email_icon} alt="" style={{ width: '30px', height: '30px' }} />
          <input
            type='email'
            name='email'
            placeholder='Email Id'
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className='input'>
          <img src={password_icon} alt="" style={{ width: '30px', height: '30px' }} />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
      </div>

      <div className='forgot-password'>Forgot Password?<span>Click Here!</span></div>

      <div className='submit-container'>
        <div className="submit" onClick={handleLogin}>LOGIN</div>
        <div className="submit"><Link to="/SignUp">SIGN UP</Link></div>
      </div>
    </div>
  );
};
