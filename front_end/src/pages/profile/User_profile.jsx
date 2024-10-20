import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/auth-context'
import Nav2 from '../Nav/nav2'
import { useNavigate } from 'react-router-dom'

function User_profile() {

  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 5000); // Wait for 1 second before redirecting

      return () => clearTimeout(timer); // Cleanup the timer
    } else {
      setLoading(false);
    }
  }, [currentUser, navigate]);
  
  if (loading) {
    return <div>Loading...</div>; // Show a loading message while waiting
  }

  const { name, username, email, role } = currentUser
  return (
    <div>
      <Nav2 />
      <p>Name: {name}</p>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      {role}   
      <p></p>
    </div>
  )
}

export default User_profile