import React from 'react'
import {Box} from '@mui/material';

const Unauthorized = () => {
  return (
    <Box sx={{
      minHeight: '90vh'
    }}>
      <h4>You are not authorized to see this page</h4>
    </Box>
  )
}

export default Unauthorized
