import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/auth-context'
import Nav2 from '../Nav/nav2'
function User_profile() {

  const { currentUser } = useAuth()
  const { name, username,email,role } = currentUser
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