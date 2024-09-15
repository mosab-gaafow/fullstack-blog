import React, { useEffect } from 'react'
import { useAuth } from '../Context'
import { useNavigate } from 'react-router-dom';

const ProtectedPage = ({children}) => {
    // children: means pages-ka aad rabto inay hos imaadan halkan ka wac
    // pages-kaan wxa imaan karo kaliya user login ah 
    const navigate = useNavigate();
    const {currentUser} = useAuth();

    useEffect(() => {
    if(!currentUser) return  navigate("/login")

    },[currentUser])        
    return <div>{children}</div>
}

export default ProtectedPage