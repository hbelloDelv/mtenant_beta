import React, { useState } from 'react'
import {Avatar, Button, Grid2, Paper, TextField, FormGroup, FormLabel} from '@mui/material';
import axios from 'axios'

const FormCompanyProfile = () => {
  const [error, setError] = useState("")

  const initialFormData = {
    companyName: '',
    companyID: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const [formData, setFormData] = useState(initialFormData);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          "http://localhost:3000/super/admin/api/register/company",
          formData,
          {
            headers: {
              "x-company-name": formData.companyName,
              "x-company-id": formData.companyID,
              "role": 'admin',
            }
          }
        );
        if(response.data.success){
          setError(response.data.message)
        }
        
      } catch (error) {
        if (error.response && error.response.data.message) {
          setError(error.response.data.message); // Correctly reference error.response.data.message
        }
        setFormData(initialFormData)
      }
      setFormData(initialFormData)
    };
    
    

  const paperStyle = {padding: 20, marginTop: '16px',   width:' 70%'}
  return (
    <Grid2 sx={{display: 'flex', justifyContent: 'center'}}>
      <Paper elevation={10} style={paperStyle} >
        <Grid2 align={'center'}>
          <h3 style={{marginBottom: '16px', color: '#5166a5'}}>
            Create Company Profile for Client
          </h3>
        </Grid2>
        <TextField 
            label="Company name" 
            placeholder='Enter company name' 
            type='text' 
            fullWidth 
            required 
            sx={{mb: '1rem'}}
            onChange={handleChange}
            value={formData.companyName}
            name='companyName'
            />
        <TextField 
            label="Company ID" 
            placeholder='Enter company ID' 
            type='text' 
            fullWidth 
            required 
            sx={{mb: '1rem'}}
            onChange={handleChange}
            value={formData.companyID}
            name='companyID'
            />
        
        <FormLabel component="legend">Company Admin detail</FormLabel>
        <FormGroup row>
        <TextField 
            label="First name" 
            placeholder='Enter first name' 
            type='text' 
            fullWidth 
            required 
            sx={{mb: '1rem'}}
            onChange={handleChange}
            value={formData.firstName}
            name='firstName'
            />
        <TextField 
            label="Last name" 
            placeholder='Enter last name' 
            type='text' 
            fullWidth 
            required 
            sx={{mb: '1rem'}}
            onChange={handleChange}
            value={formData.lastName}
            name='lastName'
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
            />
        <TextField 
            label="Confirm password" 
            placeholder='Confirm password' 
            type='password' 
            fullWidth 
            required
            sx={{mb: '2rem'}}
            onChange={handleChange}
            value={formData.confirmPassword}
            name='confirmPassword'
            />
            </FormGroup>
            <FormLabel />
        <Button type='submit' color='primary' fullWidth variant='contained' onClick={handleSubmit}>Submit</Button>
        {error && <p style={{ color: 'red' }}>{error}</p>} 
      </Paper>
    </Grid2>
  )

}

export default FormCompanyProfile
