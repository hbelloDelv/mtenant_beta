import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AccordionWrapperRegisteredCompanies from '../Utils/AccordionWrapperRegisteredCompanies';

const ViewRegisteredCompanies = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // To retrieve am sending the company id and token
      const companyId = localStorage.getItem('companyID');
      const authToken = localStorage.getItem('token');

      // Make API request
      axios
        .get('http://localhost:3000/super/admin/api/view/company/admins', {
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
        <AccordionWrapperRegisteredCompanies user={userData} />
      </div>
    );
}

export default ViewRegisteredCompanies
