import React from 'react'
import {Box} from '@mui/material';
import { Link } from 'react-router-dom';

const sytleLinks = {
  cursor: 'pointer',
  textDecoration: 'none',
  color: 'white',
  border: '1px solid #808080',
  margin: '8px',
  display: 'inline-block', 
  padding: '8px 16px', 
  boxSizing: 'border-box',
  borderRadius: '6px',
  boxShadow: '1px 2px 4px rgba(255, 255, 255, 0.5)' // Blur radius of 4px

}

const EmployeeSideBar = () => {
  return (
    <Box sx={{
        minWidth: '20vw',
        backgroundColor: '#0a0235',
        color: 'white',
        boxShadow: '1px 0px 4px rgba(255, 255, 255, 0.5)',

    }}>
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#271a72',
        color: 'white',
        padding: '0px 8px',
        minHeight: '8vh',
        marginBottom: '16px'
    }}>
        <h4>Menu</h4>
      </Box>
      <ul style={{
        listStyle: 'none',
      }}>
        <li><Link to="create_client" style={sytleLinks}>Create Client</Link></li>
        <li><Link to="view_client" style={sytleLinks}>View Clients</Link></li>
        <li><Link to="update_profile" style={sytleLinks}>Update profile</Link></li>
      </ul>
    </Box>
  )
}


export default EmployeeSideBar











