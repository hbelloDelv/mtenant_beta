import React, { useState, useEffect } from "react";
import { Button, Grid2, Paper, TextField } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

const FormUpdateSuperAdmin = () => {
  const { id } = useParams(); // Extract the ID from the URL
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    newPassword: "",
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
          `http://localhost:3000/super/admin/api/view/admin/${id}`,
          {
            headers: {
              "x-company-id": companyId,
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const user = response.data;
        setUserData(user);
        setFormData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          password: "",
          newPassword: "",
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
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.put(
        `http://localhost:3000/super/admin/api/update/admin/${id}`,
        formData,
        {
          headers: {
            "x-company-id": companyId,
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      
      // Check for success response
      if (response.data?.success) {
        setError(""); // Clear any previous errors
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          newPassword: "",
        });
        alert("Admin updated successfully.");
      } else {
        // Handle unexpected success case
        setError(response.data.message || "Update was not successful.");
      }
    } catch (error) {
      console.error("Error updating admin:", error);
  
      // Handle specific errors based on response status
      if (error.response) {
        const { status, data } = error.response;
  
        switch (status) {
          case 400:
            setError(data?.error || "Bad request. Please check your input.");
            break;
  
          case 401:
            setError(data?.error || "Unauthorized. Please log in again.");
            break;
  
          case 404:
            setError(data?.error || "Resource not found. Please check the ID or collection.");
            break;
  
          case 500:
            setError(data?.error || "Server error. Please try again later.");
            break;
  
          default:
            setError(data?.error || "An unexpected error occurred.");
        }
      } else {
        // Handle network errors or issues without a response
        setError("Network error. Please check your connection.");
      }
    }
  };
  
  
  if (loading) {
    return <p>Loading...</p>;
  }
      const paperStyle = {padding: 20, marginTop: '16px',   width:' 70%'}
      const avaterSytle = {backgroundColor: '#5166a5'}
      return (
        <Grid2 sx={{display: 'flex', justifyContent: 'center'}}>
          <Paper elevation={10} style={paperStyle} >
            <Grid2 align={'center'}>
              <h3 style={{marginBottom: '16px', color: '#5166a5'}}>
                Update Super Admin
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
                label="New password" 
                placeholder='Enter new password' 
                type='password' 
                fullWidth 
                required
                sx={{mb: '2rem'}}
                onChange={handleChange}
                value={formData.newPassword}
                name='newPassword'
                />
            <Button type='submit' color='primary' fullWidth variant='contained' onClick={handleSubmit}>Submit</Button>
            {error && <p style={{ color: 'red' }}>{error}</p>} 
          </Paper>
        </Grid2>
      )
}

export default FormUpdateSuperAdmin

