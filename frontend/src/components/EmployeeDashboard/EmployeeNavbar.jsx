import React,{useContext,} from 'react'
import {Box, Button} from '@mui/material';
import AuthContext from '../context/AuthContext';




const EmployeeNavbar = () => {
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
      <Box><h4>Welcome back Employee {user.name}</h4></Box>
      <Box>
        <Button 
            variant="outlined" 
            sx={{color: 'white', size:"medium", textTransform: 'none' }} 
                onClick={logout}>
                    Logout
       </Button>
      </Box>
    </Box>
  )
}



export default EmployeeNavbar
