import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { TfiEmail } from 'react-icons/tfi'
import { CiUser, CiLock } from 'react-icons/ci'
import img from '../../assets/signin.jpg'
import { toast, Toaster } from 'react-hot-toast'
import { useAuth } from '../../hooks/auth-context'

function Register() {
  const {signUp} = useAuth()
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(name, username, email, password);
    } catch (error) {
      console.log('Error signing up:', error);
      toast.error('Sign up failed. Please try again.');
    }
  };

  return (
    <div
      className='text-white font-Poppins flex h-[100vh] justify-center items-center bg-cover min-h-screen'
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className='bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative'>
        <h1 className='text-4xl text-whitefont-bold text-center mb-6'>
          Register
        </h1>
        <form onSubmit={handleSignUp}>
          <div className='relative my-10'>
            <input
              type='text'
              id='nameInput'
              className='block mb-0 w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer'
              placeholder=' '
              required
              onChange={(e) => setName(e.target.value)}
            />
            <label
              htmlFor=''
              className='absolute text-sm text-white duration-300 -translate-y-3 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5'
            >
              Name
            </label>
            <CiUser className='absolute top-0 right-4' />
          </div>

          <div className='relative my-10'>
            <input
              type='text'
              id='usernameInput'
              className='block mb-0 w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer'
              placeholder=' '
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <label
              htmlFor=''
              className='absolute text-sm text-white duration-300 -translate-y-3 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5'
            >
              Username
            </label>
            <CiUser className='absolute top-0 right-4' />
          </div>

          <div className='relative my-10'>
            <input
              type='email'
              id='emailInput'
              className='block mb-0 w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer'
              placeholder=' '
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor=''
              className='absolute text-sm text-white duration-300 -translate-y-3 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5'
            >
              Email
            </label>
            <TfiEmail className='absolute top-0 right-4' />
          </div>

          <div className='relative my-10'>
            <input
              type='password'
              id='passwordInput'
              className='block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-500 peer '
              placeholder=' '
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor=''
              className='absolute text-sm text-white duration-300 -translate-y-3 scale-75 top-0  origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5'
            >
              Password
            </label>
            <CiLock className='absolute top-0 right-4' />
          </div>

          <div>
            <button
              type='submit'
              className='w-full mb-4 mt-6 text-[18px] rounded-full bg-white text-sky-800 hover:bg-sky-400 hover:text-white py-2 transition-colors duration-300'
            >
              Sign up
            </button>
          </div>

          <div>
            <span className='m-4'>
              Already have an account?{' '}
              <Link to='/login' className='text-cyan-300'>
                Sign in
              </Link>{' '}
            </span>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  )
}

export default Register
