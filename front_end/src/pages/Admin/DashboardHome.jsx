import React from 'react'
import Adminnav from './Adminnav'

function DashboardHome() {
  return (
  <div className="flex h-screen">
      {/* Left Side: Navigation */}
      <div>
        <Adminnav />
      </div>

      {/* Right Side: Content */}
      <div className="flex-grow p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
        <p>This is the home page of the admin dashboard. Here, you can get an overview of the system.</p>
      </div>
    </div>
  )
}

export default DashboardHome