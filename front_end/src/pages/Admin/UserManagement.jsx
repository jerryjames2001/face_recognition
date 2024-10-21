import React from 'react'
import Adminnav from './Adminnav'

function UserManagement() {
  return (
    <div className="flex h-screen">
      {/* Left Side: Navigation */}
      <div>
        <Adminnav />
      </div>

      {/* Right Side: User Management Content */}
      <div className="flex-grow p-5 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">User Management</h1>
        <p>Manage users, verify registrations, and manage user roles.</p>
        {/* You can add more user management components here */}
      </div>
    </div>
  )
}

export default UserManagement