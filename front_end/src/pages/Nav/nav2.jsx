import React from 'react'
import { Link } from 'react-router-dom'

function nav2 () {
  return (
    <div className='fixed top-0 left-0 w-full z-50 bg-transparent'>
      <nav>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <div className='flex items-start space-x-2 rtl:space-x-reverse'>
            <img
              src='/src/assets/logo.jpg'
              className='h-10 w-10 rounded-full'
              alt='my Logo'
            />
          </div>
          <div
            className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
            id='navbar-sticky'
          >
            <ul className='flex p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700'>
              <li
                type='button'
                className='p-3 bg-blue-500 hover:bg-transparent text-white hover:bg-sky-100 to-transparent mx-4 hover:text-blue-700 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                <Link to='/'>Home</Link>
              </li>
              <li
                type='button'
                className='p-3 bg-blue-500 hover:bg-transparent text-white hover:bg-sky-100 to-transparent mx-4 hover:text-blue-700 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                <Link to='/live_cam'>Live Cam</Link>
              </li>
              <li
                type='button'
                className='p-3 bg-blue-500 hover:bg-transparent text-white hover:bg-sky-100 to-transparent mx-4 hover:text-blue-700 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                <Link to='/logs'>Logs</Link>
              </li>
              <li
                type='button'
                className='p-3 bg-blue-500 hover:bg-transparent text-white hover:bg-sky-100 to-transparent mx-4 hover:text-blue-700 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                <Link to='/suspects'>Suspects</Link>
              </li>
              <li
                type='button'
                className='p-3 bg-blue-500 hover:bg-transparent text-white hover:bg-sky-100 to-transparent mx-4 hover:text-blue-700 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                <Link to='/logout'>Log out</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default nav2
