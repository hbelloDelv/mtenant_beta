import React, { useState, useEffect } from 'react'
import {Button, Grid2, Paper, TextField, FormGroup, FormLabel, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import axios from 'axios'
import { useParams } from "react-router-dom";

const FormUpdateCLientByAdmin  = () => {
    const { id } = useParams(); // Extract the ID from the URL
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      newPassword: "",
      plotId:  "",
      landStatus: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
  
  // To retrieve am sending the company id and token
  const companyId = localStorage.getItem('companyID');
  const authToken = localStorage.getItem('token');
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/employee/api/view/client/${id}`,
            {
              headers: {
                "modelname": companyId,
                "Authorization": `Bearer ${authToken}`,
              },
            }
          );
  
          const user = response.data;
          setUserData(user);
          setFormData({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            phoneNumber: user.phoneNumber || "",
            plotId: user.plotId || "",
            landStatus: user.landStatus || "",
          });
        } catch (error) {
          setError("Failed to fetch user data");
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserData();
    }, [id, companyId, authToken]);
  

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
        const response = await axios.put(
          `http://localhost:3000/employee/api/update/client/${id}`,
          formData,
          {
              headers: {
                "modelname": companyId,
                "Authorization": `Bearer ${authToken}`,
            }
          }
        );
        if (response.data?.success) {
            setError(""); // Clear any previous errors
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              phoneNumber: "",
              plotId: "",
              landStatus: ""
            });
            alert("Client updated successfully.");
          } else {
            // Handle unexpected success case
            setError(response.data.message || "Update was not successful.");
          }
      } catch (error) {
        if (error.response && error.response.data.message) {
          setError(error.response.data.message); // Correctly reference error.response.data.message
        }
        // setFormData(initialFormData)
      }
    //   setFormData(initialFormData)
    };
    
    

  const paperStyle = {padding: 20, marginTop: '16px',   width:' 70%'}
  return (
    <Grid2 sx={{display: 'flex', justifyContent: 'center'}}>
      <Paper elevation={10} style={paperStyle} >
        <Grid2 align={'center'}>
          <h3 style={{marginBottom: '16px', color: '#5166a5'}}>
            Update  Client Profile
          </h3>
        </Grid2>
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
            label="Phone number" 
            placeholder='Enter phone number' 
            type='number' 
            fullWidth 
            required 
            sx={{mb: '1rem'}}
            onChange={handleChange}
            value={formData.phoneNumber}
            name='phoneNumber'
            />
        <TextField 
            label="Plot ID" 
            placeholder='Enter plot ID' 
            type='number' 
            fullWidth 
            required 
            sx={{mb: '1rem'}}
            onChange={handleChange}
            value={formData.plotId}
            name='plotId'
            />
            <FormControl fullWidth sx={{ mb: '1rem' }}>
            <InputLabel id="landStatus-label" shrink>
                Land Status
            </InputLabel>
            <Select
                labelId="landStatus-label"
                id="landStatus"
                value={formData.landStatus}
                name="landStatus"
                onChange={handleChange}
                required
                displayEmpty
            >
                <MenuItem value="" disabled>
                Select
                </MenuItem>
                <MenuItem value="sold">Sold</MenuItem>
                <MenuItem value="unsold">Unsold</MenuItem>
                <MenuItem value="not for sale">Not for Sale</MenuItem>
            </Select>
            </FormControl>
        <Button type='submit' color='primary' fullWidth variant='contained' onClick={handleSubmit}>Submit</Button>
        {error && <p style={{ color: 'red' }}>{error}</p>} 
      </Paper>
    </Grid2>
  )
}



export default FormUpdateCLientByAdmin
