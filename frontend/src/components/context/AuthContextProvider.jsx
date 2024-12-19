import React, { useState, useEffect } from 'react';
import axios from "axios";
import AuthContext from './AuthContext';



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
 
    useEffect(()=>{
      const verifyUser = async() =>{
        try {
          const token  = localStorage.getItem('token')
          const companyID = localStorage.getItem('companyID');
          if(token){
              const response = await axios.get("http://localhost:3000/admin/api/verify",{
                headers:{
                  'Authorization': `Bearer ${token}`,
                  'x-company-name': companyID
                }
              })
              if(response.data.success){
                setUser(response.data.user)
              }
          }else{
            setUser(null)
            setLoading(false)
          }
        } catch (error) {
          if (error.response && error.response.data.message) {
            setUser(null)
          }
        }finally{
          setLoading(false)
        }
      }
      verifyUser()
    },[])

  const login = (user) =>{
    setUser(user)
  }


  const logout = () =>{
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('companyID')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;