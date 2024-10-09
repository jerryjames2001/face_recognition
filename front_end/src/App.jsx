import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home/home'
import About from './pages/Aboutus/Aboutus'
import Nav_before from './pages/Nav/nav1'
import Nav2 from './pages/Nav/nav2'
import Login from './pages/LoginRegister/Login'
import Register from './pages/LoginRegister/Register'
import toast, { Toaster } from 'react-hot-toast'
function App () {
  return (
    <>
      <BrowserRouter>
        <Nav_before />{/* importing nav components */}
        {/* <Nav2 /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
