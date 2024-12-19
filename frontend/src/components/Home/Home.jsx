import React from 'react'
import {Box, Typography, Grid2} from '@mui/material'
import LoginForm from '../LoginForm/LoginForm'
import BrandLogo from '../../assets/jamitan_logo.png'


const Home = () => {
  return (
    <Box
        sx={{ 
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '90vh', 
        }} 
    >
        <Typography variant='h2'>REDSAPP</Typography>
            <img src={BrandLogo} alt="" width={'10%'} />
            <LoginForm />
    </Box>
  )
}

export default Home
