import { getUser } from '@/redux/authSlice'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {
    const user = useSelector(getUser);

    const navigate = useNavigate();

    useEffect(()=>{
        if(user == null || user.role != "recruiter"){
            navigate("/");
        }
    },[])
  return (
    <>{children}</>
  )
}

export default ProtectedRoutes