import React from 'react'
import Adminnav from './Adminnav'
import Cam_form from '../camera/Cam_form'
import Cam_list from '../camera/Cam_list';

function CameraManagement() {
  return (
    <div className='flex h-screen'>
      {/* Left Side: Navigation */}
      <div>
        <Adminnav />
      </div>

      {/* Right Side: Content */}
      <div className="flex-grow p-5 bg-sky-100">
        <h1 className="text-3xl font-bold mb-4 text-center">Camera Management</h1>
        <div>
          <Cam_form/>
        </div>
        <div>
          <Cam_list/>
        </div>
        </div>
    </div>
  )
}

export default CameraManagement