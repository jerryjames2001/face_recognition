// eslint-disable-next-line no-unused-vars
import React from 'react'
import MyProfile from '../profile/My_profile'
import { TfiEmail } from 'react-icons/tfi'

function Aboutus () {
  return (
    <div className='text-center justify-center font-Poppins bg-gradient-to-br from-purple-500 to-[#800000]'>
      <div className=' pt-16 flex pb-5 group'>
        <section className='w-full md:w-1/6 h-auto pl-5 justify-center align-middle'>
          <img
            className='rounded-3xl transform transition-transform duration-300 group-hover:scale-110'
            src='/src/assets/aboutus1.png'
            alt='section 1 image of a camera'
          />
        </section>
        <section className='text-center px-3 flex flex-col justify-center items-center text-white'>
          <h2 className='font-bold text-white'>
            Welcome to Our Project
          </h2>
          <p className='text-white hover:scale-image'>
            We are on a mission to revolutionize criminal detection through
            innovative technology. Our project combines advanced AI and facial
            recognition to empower law enforcement agencies, making communities
            safer.
          </p>
        </section>
      </div>

      <div className='pt-16 flex pb-5 group'>
        <section className='pl-5 flex flex-col justify-center items-center'>
          <h2 className='font-bold'>Our Mission</h2>
          <h3 className='font-semibold text-white'>
            Empowering Law Enforcement
          </h3>
          <p className='text-white hover:scale-image'>
            Our mission is to develop tools that provide real-time data and
            analytics, enabling law enforcement to identify and apprehend
            criminals swiftly. We aim to enhance the efficiency of
            investigations and ensure public safety.
          </p>
        </section>
        <section className='w-full md:w-1/6 h-auto justify-end align-middle pr-5 mr-5'>
          <img
            className='rounded-3xl transform transition-transform duration-300 group-hover:scale-110'
            src='/src/assets/aboutus2.png'
            alt='section 2 image of a mission'
          />
        </section>
      </div>

      <div className='pt-16 flex pb-5 group'>
        <section className='w-full md:w-1/6 h-auto pl-5 justify-center align-middle'>
          <img
            className='rounded-3xl transform transition-transform duration-300 group-hover:scale-110'
            src='/src/assets/aboutus3.png'
            alt='section 1 image of a camera'
          />
        </section>
        <section className='text-center px-3 flex flex-col justify-center items-center'>
          <h2 className='font-bold '>Our Vision</h2>
          <h3 className='font-semibold text-white'>A Safer Future</h3>
          <p className='text-white hover:scale-image'>
            We envision a world where technology and law enforcement work in
            harmony to create safer environments. Our goal is to lead the way in
            creating solutions that serve the needs of law enforcement while
            respecting individual rights.
          </p>
        </section>
      </div>

      <div>
        <MyProfile />
      </div>

      <div className='pt-16 flex pb-5'>
        <section className='pl-5 flex flex-col justify-center items-center'>
          <h2 className='font-bold'>Our Values</h2>
          <div className='text-center'>
            <h3 className='font-semibold text-white'>
              Core Principles Guiding My Work
            </h3>
            <p className='text-white mt-5 hover:scale-image'>
              <strong>Innovation:</strong> I am committed to pushing the
              boundaries of technology to develop the best possible solutions
              for criminal detection. My focus is on leveraging the latest
              advancements in AI and facial recognition to enhance law
              enforcement capabilities.
            </p>
            <p className='text-white mt-5 hover:scale-image'>
              <strong>Integrity:</strong> I maintain the highest ethical
              standards in my work, prioritizing individual rights while
              supporting crime prevention efforts. My goal is to ensure that
              technology serves the public good without compromising personal
              freedoms.
            </p>
            <p className='text-white mt-5'>
              <strong>Collaboration:</strong> I believe in the importance of
              collaboration, working closely with community members and law
              enforcement to achieve shared goals. By understanding their needs
              and challenges, I can create solutions that are both effective and
              practical.
            </p>
          </div>
        </section>
        <section className='w-full flex flex-col gap-2 md:w-1/5 h-auto justify-between align-bottom pr-5 mr-5'>
          <img
            className='rounded-3xl transform transition-transform duration-300 group-hover:scale-110'
            src='/src/assets/aboutus4.png'
            alt='section 2 image of values'
          />
          <img
            className='rounded-3xl transform transition-transform duration-300 group-hover:scale-110'
            src='/src/assets/aboutus5.jpeg'
            alt='section 2 image of values'
          />
        </section>
      </div>

      <div className='pt-16 flex pb-5'>
        <section className='pl-5 flex flex-col justify-center items-center'>
          <h2 className='font-bold '>Why This Project?</h2>
          <div className='text-center'>
            <h3 className='font-semibold text-white'>
              Key Features and Advantages
            </h3>
            <p className='text-white mt-5 hover:scale-image'>
              <strong>Cutting-Edge Technology:</strong> Utilizing advanced
              algorithms, we ensure effective and reliable results that empower
              law enforcement agencies to enhance their capabilities.
            </p>
            <p className='text-white mt-5 hover:scale-image'>
              <strong>Real-Time Solutions:</strong> Our tools provide real-time
              monitoring and recognition, allowing for swift actions during
              critical situations.
            </p>
            <p className='text-white mt-5'>
              <strong>User-Friendly Design:</strong> With an intuitive
              interface, our system is designed for ease of use, even in
              high-pressure environments, ensuring smooth navigation and access
              to key functions.
            </p>
          </div>
        </section>
      </div>

      <div className='pt-16 flex pb-5'>
        <section className='flex flex-col justify-center items-center w-full'>
          <h2 className='font-bold  text-center'>Contact Us</h2>
          <div className='text-center'>
            <h3 className='font-semibold text-white'>
              We Want to Hear From You!
            </h3>
            <p className='text-white mt-5'>
              If you have any questions or would like to learn more about our
              project, please reach out!
            </p>
            <p className=' mt-5 flex items-center justify-center'>
              <TfiEmail className='mr-2 text-blue-600 hover:scale-125' /> {/* Email icon */}
              <a
                href='mailto:jerryjames2025@mca.sjcetpalai.ac.in?subject=Inquiry%20About%20Your%20Project'
                className='text-blue-600 hover:underline hover:text-blue-800'
              >
                jerryjames2025@mca.sjcetpalai.ac.in
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Aboutus
