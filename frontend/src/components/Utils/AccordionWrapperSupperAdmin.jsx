import React from 'react'
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid2,
  Box,
  Paper,
} from '@mui/material';
import GridWrapper from './GridWrapper';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';



const GridItem = ({ user }) => {
  return (
    <Grid2 container spacing={16}>
      <React.Fragment>
        <Grid2 item xs={12} sm={6}>
          <Typography variant="h6">Email</Typography>
          <Typography>{user.email}</Typography>
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <Typography variant="h6">Status</Typography>
          <Typography>{user.status}</Typography>
        </Grid2>
      </React.Fragment>
    </Grid2>
  );
};



//Because of the links to delete and update, the accordion component is duplicate for each role
// e.g Super Admin, Admin etc but the Grid the component is re use accross the component
const AccordionWrapperSupperAdmin = ({ user }) => {
    return (
        <>
          {user.map((item) => (
            <Paper key={item._id} elevation={3} sx={{ marginBottom: 0.5, marginTop: 0.5 }}>
              <Accordion>
                <AccordionSummary
                 expandIcon={<ArrowDownwardIcon />}
                 aria-controls={`panel-${item._id}-content`}
                 id={`panel-${item._id}-header`}
                >
                  <Typography sx={{ marginRight: 1, fontWeight: 'bold' }}>{item.firstName}</Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>{item.lastName}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <GridWrapper>
                    <GridItem user={item} />
                  </GridWrapper>
                </AccordionDetails>
                <Box display="flex" justifyContent="space-between" p={2}>
                  <Link to={`/super_admin/update_super_admin/${item._id}`}>Edit</Link>
                  <Link to={`/delete/${item._id}`}>Delete</Link>
                </Box>
              </Accordion>
            </Paper>
          ))}
        </>
      );
}

export default AccordionWrapperSupperAdmin
