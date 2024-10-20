import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/auth-context'

function nav2 () {
  const { signOut } = useAuth()
  return (
    <div className='bg-transparent shadow-lg'>
      <nav className='bg-gradient-to-r from-sky-500 to-sky-200 w-full'>
        <div className='max-w-screen-xl mx-auto p-4 flex items-center justify-between'>
          {/* Logo Section */}
          <div className='flex items-start space-x-2'>
            <img
              src='/src/assets/logo.jpg'
              className='h-10 w-10 rounded-full'
              alt='my Logo'
            />
          </div>
          {/* Navigation Links */}
          <div className='items-center justify-between md:flex md:w-auto'>
            <ul className='flex space-x-8 font-medium'>
              <li className='p-3 bg-blue-500 hover:bg-transparent hover:text-blue-500 text-white hover:bg-sky-100 font-medium rounded-lg text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700'>
                <Link to='/'>Home</Link>
              </li>
              <li className='p-3 bg-blue-500 hover:bg-transparent hover:text-blue-500 text-white hover:bg-sky-100 font-medium rounded-lg text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700'>
                <Link to='/live_cam'>Live Cam</Link>
              </li>
              <li className='p-3 bg-blue-500 hover:bg-transparent hover:text-blue-500 text-white hover:bg-sky-100 font-medium rounded-lg text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700'>
                <Link to='/logs'>Logs</Link>
              </li>
              <li className='p-3 bg-blue-500 hover:bg-transparent hover:text-blue-500 text-white hover:bg-sky-100 font-medium rounded-lg text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700'>
                <Link to='/suspects'>Suspects</Link>
              </li>
              <button
                className='p-3 bg-blue-500 hover:bg-transparent hover:text-blue-500 text-white hover:bg-sky-100 font-medium rounded-lg text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700'
                onClick={signOut}
              >
                Log out
              </button>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default nav2
