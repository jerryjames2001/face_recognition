import React, { useState } from 'react';
import Nav2 from '../Nav/nav2';
import Cam_form from './Cam_form';
import Cam_list from './Cam_list';

function Camera() {
  
  return (
    <div className='bg-sky-400 min-h-screen'>
      <div>
        <Nav2 />
      </div>

      <div>
        <Cam_form />
      </div>
      <div>
        <Cam_list />
      </div>
    </div>
  );
}

export default Camera;
