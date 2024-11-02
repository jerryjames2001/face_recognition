import React from 'react'
import Suspect_form from './Suspect_form'
import Nav from '../Nav/nav2'
import SuspectList from './SuspectList'

function Suspects() {
  return (
    <div className='min-h-screen w-full bg-gradient-to-r from-blue-200 to-purple-300'>
    <div><Nav/></div>
    <div>
      <Suspect_form />
    </div>
    <div>
      <SuspectList />
    </div>
  </div>
  )
}

export default Suspects