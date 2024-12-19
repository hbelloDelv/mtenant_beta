import React,{useContext,} from 'react'
import AuthContext from '../context/AuthContext'
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ children }) => {
    const { loading, user } = useContext(AuthContext);
  
    // Show a loading indicator while user data is being fetched
    if (loading) {
      return <div>Loading...</div>;
    }
  
    // Check if user is authenticated
    return user ? children : <Navigate to="/" replace />;
  };
  

export default PrivateRoute
