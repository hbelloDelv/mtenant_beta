import React from 'react';
import { Grid2 } from '@mui/material';

const GridWrapper = ({ children }) => {
  return (
    <Grid2 container gap={2}>
      { children }
    </Grid2>
  );
};

export default GridWrapper;


