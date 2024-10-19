import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/auth-context'
function User_profile() {

  const { currentUser } = useAuth()
  const { name, username,email,role } = currentUser
  return (
    <div>
      <p>Name: {name}</p>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      {role}
      <p></p>
    </div>
  )
}

export default User_profile