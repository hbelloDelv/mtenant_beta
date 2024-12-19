import React,{useContext,} from 'react'
import {Box, Button} from '@mui/material';
import AuthContext from '../context/AuthContext';




const SuperAdminNavBar = () => {
    const {user, logout} = useContext(AuthContext)
  return (
    <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#271a72',
        color: 'white',
        padding: '0px 8px',
        minHeight: '8vh',
        // boxShadow: '1px 2px white',
        boxShadow: '1px 2px 4px rgba(255, 255, 255, 0.5)',
    }}>
      <Box><h4>Welcome back Super admin {user.name}</h4></Box>
      <Button 
            variant="outlined" 
            sx={{color: 'white', size:"medium", textTransform: 'none' }} 
                onClick={logout}>
                    Logout
       </Button>
    </Box>
  )
}

export default SuperAdminNavBar
