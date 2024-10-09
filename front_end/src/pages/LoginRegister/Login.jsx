import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { CiLock } from 'react-icons/ci'
import { TfiEmail } from 'react-icons/tfi'
import img from '../../assets/signin.jpg'
import { toast, Toaster } from 'react-hot-toast'

function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await axios.post('http://localhost:3000/api/login', {
        email,
        password
      })
      if (result.data.message === 'Success') {
        toast.success('Login successful!', { duration: 4000 })
        navigate('/')
      } else {
        toast.error(result.data.message || 'Login failed', { duration: 4000 })
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.', { duration: 4000 })
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className='text-white font-Poppins flex h-[100vh] justify-center items-center bg-cover min-h-screen'
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className='bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative'>
        <h1 className='text-4xl text-white font-bold text-center mb-6'>
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className='relative my-10'>
            <input
              type='email'
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
              className='block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-500 peer'
              placeholder=' '
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor=''
              className='absolute text-sm text-white duration-300 -translate-y-3 scale-75 top-0 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5'
            >
              Password
            </label>
            <CiLock className='absolute top-0 right-4' />
          </div>

          <div className='flex justify-between items-center'>
            <div className='flex gap-2 items-center'>
              <input type='checkbox' name='' id='' />
              <label htmlFor='Remember me'>Remember me</label>
            </div>
            <Link to='' className='text-cyan-300'>
              Forget password?
            </Link>
          </div>

          <div>
            <button
              type='submit'
              className='w-full mb-4 mt-6 text-[18px] rounded-full bg-white text-sky-800 hover:bg-sky-400 hover:text-white py-2 transition-colors duration-300'
            >
              Login
            </button>
          </div>

          <div>
            <span className='m-4'>
              Don't have an account?{' '}
              <Link to='/register' className='text-cyan-300'>
                Register
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
