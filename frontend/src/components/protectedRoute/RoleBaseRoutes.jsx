import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';



const RoleBaseRoutes = ({ children, allowedRoles }) => {
    const { loading, user } = useContext(AuthContext);
  
    // Show a loading indicator while user data is being fetched
    if (loading) {
      return <div>Loading...</div>;
    }
  
    // Check if the user is authenticated
    if (!user) {
      return <Navigate to="/" replace />;
    }
  
    // Check if the user's role is allowed
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" replace />;
    }
  
    // Render the children if everything checks out
    return children;
  };
  

export default RoleBaseRoutes

