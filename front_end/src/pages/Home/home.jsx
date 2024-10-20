import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/auth-context'
import Nav1 from '../Nav/nav1'
import Nav2 from '../Nav/nav2'
import AOS from 'aos'
import 'aos/dist/aos.css'

function Home () {
  const { currentUser } = useAuth()
  useEffect(() => {
    AOS.init({ duration: 2500 })
  }, [])

  return (
    <div className='relative w-full overflow-hidden'>
      {/* Fixed Background Video */}
      <video className='fixed top-0 left-0 w-full h-full object-cover z-[-1]' autoPlay muted loop>
        <source src='/src/assets/home_bg.mp4' type='video/mp4' />
      </video>
      {currentUser ? <Nav2 /> : <Nav1 />}
      {/* Main Content */}
      <div className='relative z-10 min-h-screen flex flex-col justify-center items-center text-center text-white pt-20'>
        <h1 data-aos='fade-up' className='text-4xl font-bold'>
          Revolutionizing Criminal Detection with AI & Facial Recognition
        </h1>
        <p data-aos='fade-right' className='mt-4 text-lg'>
          Empowering law enforcement with real-time face recognition to help identify and apprehend criminals.
        </p>
        <div className='mt-8'>
          <Link
            to='/about'
            data-aos='fade-left'
            className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded mx-4'
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <section className='py-20 bg-transparent text-white relative z-10'>
        <div className='container mx-auto text-center'>
          <h2 data-aos='fade-up' className='text-3xl font-bold mb-8'>
            Key Features of Our Criminal Detection System
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div data-aos='fade-right' className='feature-item p-4 bg-opacity-20 backdrop-blur-sm bg-white rounded'>
              <h3 className='text-xl font-semibold'>Real-Time Face Recognition</h3>
              <p className='mt-2'>Instantly identify suspects using live camera feeds and match them with the database.</p>
            </div>
            <div data-aos='fade-left' className='feature-item p-4 bg-opacity-20 backdrop-blur-sm bg-white rounded'>
              <h3 className='text-xl font-semibold'>Comprehensive Criminal Database</h3>
              <p className='mt-2'>Access detailed information about suspects, including crimes committed and last known locations.</p>
            </div>
            <div data-aos='fade-right' className='feature-item p-4 bg-opacity-20 backdrop-blur-sm bg-white rounded'>
              <h3 className='text-xl font-semibold'>Incident Logs & Reports</h3>
              <p className='mt-2'>Track criminal sightings, maintain a history of encounters, and generate reports.</p>
            </div>
            <div data-aos='fade-left' className='feature-item p-4 bg-opacity-20 backdrop-blur-sm bg-white rounded'>
              <h3 className='text-xl font-semibold'>Multi-Camera Support</h3>
              <p className='mt-2'>Connect and monitor feeds from multiple locations to enhance surveillance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className='py-20 bg-transparent text-white relative z-10'>
        <div className='container mx-auto text-center'>
          <h2 data-aos='fade-up' className='text-3xl font-bold mb-8'>
            How It Works
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div data-aos='fade-right' className='how-item p-4 bg-opacity-20 backdrop-blur-sm bg-white rounded'>
              <h3 className='text-xl font-semibold'>Step 1</h3>
              <p className='mt-2'>Connect live camera feeds from various locations.</p>
            </div>
            <div data-aos='fade-left' className='how-item p-4 bg-opacity-20 backdrop-blur-sm bg-white rounded'>
              <h3 className='text-xl font-semibold'>Step 2</h3>
              <p className='mt-2'>AI-powered face recognition scans the video for matches in the suspect database.</p>
            </div>
            <div data-aos='fade-right' className='how-item p-4 bg-opacity-20 backdrop-blur-sm bg-white rounded'>
              <h3 className='text-xl font-semibold'>Step 3</h3>
              <p className='mt-2'>Receive alerts when a match is detected, with details of the suspect.</p>
            </div>
            <div data-aos='fade-left' className='how-item p-4 bg-opacity-20 backdrop-blur-sm bg-white rounded'>
              <h3 className='text-xl font-semibold'>Step 4</h3>
              <p className='mt-2'>Access logs and reports for further action.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className='text-white py-8 relative z-10'>
        <div className='container mx-auto text-center bg-white bg-opacity-20 rounded-lg backdrop-blur-sm'>
          <div data-aos='fade-up' className='mb-4'>
            <Link to='/' className='text-lg mx-4 hover:underline'>Home</Link>
            <Link to='/about' className='text-lg mx-4 hover:underline'>About Us</Link>
            <Link to='/login' className='text-lg mx-4 hover:underline'>Login/Register</Link>
            <p>Contact us at: jerryjames2025@mca.sjcetpalai.ac.in</p>
            <p className='mt-2'>Terms of Service | Privacy Policy</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
