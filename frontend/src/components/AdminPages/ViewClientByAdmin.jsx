import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AccordionWrapperClientForAdmin from '../Utils/AccordionWrapperClientForAdmin';




const ViewClientByAdmin = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // To retrieve am sending the company id and token
      const companyId = localStorage.getItem('companyID');
      const authToken = localStorage.getItem('token');

      // Make API request
      axios
        .get('http://localhost:3000/employee/api/view/clients', {
          headers: {
            'modelname': companyId,
            'Authorization': `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          setUserData(response.data); // Assuming the API returns data in the expected format
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setError('Failed to fetch data');
          setLoading(false);
        });
    }, []); // Empty dependency array means this runs once on component mount
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    return (
      <div>
        <AccordionWrapperClientForAdmin user={userData} />
      </div>
    );
}


export default ViewClientByAdmin