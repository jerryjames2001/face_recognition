import React from 'react'
import Adminnav from './Adminnav'

function Logs() {
  return (
    <div className='flex h-screen'>
      {/* Left Side: Navigation */}
      <div>
        <Adminnav />
      </div>

      {/* Right Side: Content */}
      <div className="flex-grow p-5 bg-gray-100">

        <h1 className="text-3xl font-bold mb-4">Logs</h1>
        <p>View the history of detected suspects, along with timestamps and images.</p>
    </div>
    </div>
  )
}

export default Logs