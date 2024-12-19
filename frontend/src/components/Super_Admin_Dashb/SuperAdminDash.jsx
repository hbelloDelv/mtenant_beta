import React,{useContext,} from 'react'
import {Box} from '@mui/material';
import AuthContext from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import SuperAdminSideBar from './SuperAdminSideBar';
import SuperAdminNavBar from './SuperAdminNavBar';

const SuperAdminDash = () => {
  const {user} = useContext(AuthContext)
  if(!user){
    return <Navigate to="/" />;
  }
  return (
    <Box sx={{
        minHeight: '90vh',
        display: 'flex',
        bgcolor: 'gray',
       
    }}>
      <SuperAdminSideBar />
      <Box sx={{flex: 1}}>
        <SuperAdminNavBar />
        <Box
          sx={{
            // display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            // overflowY: 'scroll',
            // backgroundColor: 'red',
            // height: 'fitContent',
            marginBottom: '16px'
  
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default SuperAdminDash
