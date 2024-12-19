import React, { useState, useContext } from 'react'
import {Avatar, Button, Grid2, Paper, TextField} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';


import axios from "axios";


const LoginForm = () => {
  const { login} = useContext(AuthContext);
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const initialFormData = {
    company: '',
    email: '',
    password: '',
  };

  // client error
  const [errors, setErrors] = useState({
    company: '',
    email: '',
    password: '',
});

  // Field validation rules client
  const validateField = (name, value) => {
    let errorMessage = '';

    switch (name) {
        case 'company':
            if (!value.trim()) {
                errorMessage = 'Company name is required.';
            } else if (value.length < 3) {
                errorMessage = 'Company name must be at least 3 characters long.';
            }else if(value.length == null){
              errorMessage = "Company field cannont be empty"
            }
            break;

        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value.trim()) {
                errorMessage = 'Email is required.';
            } else if (!emailRegex.test(value)) {
                errorMessage = 'Enter a valid email address.';
            }
            break;

        case 'password':
            if (!value.trim()) {
                errorMessage = 'Password is required.';
            } else if (value.length < 6) {
                errorMessage = 'Password must be at least 6 characters long.';
            }
            break;

        default:
            break;
    }

    return errorMessage;
};

  const [formData, setFormData] = useState(initialFormData);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));


    // client error validation
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };


  const validateAllFields = () => {
    const newErrors = {};
    for (const key in formData) {
        newErrors[key] = validateField(key, formData[key]);
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error); // Return true if no errors
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      "http://localhost:3000/admin/api/login",
      formData,
      {
        headers: {
          "x-company-name": formData.company,
        }
      }
    );  

    if(response.data.success){
      login(response.data.user)
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("companyID", formData.company)


      if(response.data.user.role === "super_admin"){
        navigate('/super_admin')
      }else if(response.data.user.role === "admin"){
        navigate('/admin')
      }else if(response.data.user.role === "employee"){
        navigate('/employee')
      }

    }
    
    
  } catch (error) {
    if (error.response && error.response.data.message) {
      setError(error.response.data.message); // Correctly reference error.response.data.message
    }
  }
};


  // setFormData(initialFormData)
    


  const paperStyle = {padding: 20, marginTop: '16px', height: '65vh',  width: 380}
  const avaterSytle = {backgroundColor: '#5166a5'}
  return (
    <Grid2>
      <Paper elevation={10} style={paperStyle} >
        <Grid2 align={'center'}>
          <Avatar style={avaterSytle}><LoginIcon/></Avatar>
          <h3 style={{marginBottom: '16px', color: '#5166a5'}}>
            Login
          </h3>
        </Grid2>
        <TextField 
            label="Company ID" 
            placeholder='Enter company ID' 
            type='company' 
            fullWidth 
            required 
            sx={{mb: '1rem'}}
            onChange={handleChange}
            value={formData.company}
            name='company'
            error={!!errors.company}
            helperText={errors.company}
            />
        <TextField 
            label="Email" 
            placeholder='Enter your email' 
            type='email' 
            fullWidth 
            required 
            sx={{mb: '1rem'}}
            onChange={handleChange}
            value={formData.email}
            name='email'
            error={!!errors.email}
            helperText={errors.email}
            />
        <TextField 
            label="Password" 
            placeholder='Enter your password' 
            type='password' 
            fullWidth 
            required
            sx={{mb: '2rem'}}
            onChange={handleChange}
            value={formData.password}
            name='password'
            error={!!errors.password}
            helperText={errors.password}
            />
        <Button type='submit' color='primary' fullWidth variant='contained' onClick={handleSubmit}>Login</Button>
        {error && <p style={{ color: 'red' }}>{error}</p>} 
      </Paper>
    </Grid2>
  )
}

export default LoginForm
