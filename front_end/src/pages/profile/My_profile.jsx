import React from 'react'

function My_profile () {
  return (
    <div className='bg-gradient-to-tr from-blue-400 via-pink-300 to-red-300 pt-16 flex justify-around pb-5'>
      {/* profile card */}
      <section
        className='bg-gradient-to-br from-emerald-300 to-pink-300
    shadow-md rounded-lg text-center flex flex-col items-center px-6 py-2 w-64 mx-4'
      >
        <h3 className='font-semibold text-gray-700 text-xl mb-2'>
          Jerry James
        </h3>
        <img
          className='rounded-lg w-32 h-32 object-cover mt-2'
          src='/src/assets/me.png' alt='Profile image of Project Lead'
        />
        <p className='text-gray-500 font-medium text-sm mt-4'>
          Project Lead, Developer, and Data Analyst
        </p>
        <p className='text-gray-600 mt-2 text-center'>
          Leading the initiative, managing the user interface and optimizing
          the facial recognition algorithms.
        </p>
      </section>
    </div>

  )
}

export default My_profile
