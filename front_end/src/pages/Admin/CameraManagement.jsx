import React from 'react'
import Adminnav from './Adminnav'

function CameraManagement() {
  return (
    <div className='flex h-screen'>
      {/* Left Side: Navigation */}
      <div>
        <Adminnav />
      </div>

      {/* Right Side: Content */}
      <div className="flex-grow p-5 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Camera Management</h1>
        <p>Here you can add, update, or view IP cameras and their locations.</p>
        </div>
    </div>
  )
}

export default CameraManagement