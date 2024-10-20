import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home';
import About from './pages/Aboutus/Aboutus';
import Login from './pages/LoginRegister/Login';
import Register from './pages/LoginRegister/Register';
import User_profile from './pages/profile/User_profile';
import { Toaster } from 'react-hot-toast';
import Adminnav from './pages/Admin/Adminnav';

function App() {


  return (
     <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<User_profile />} />
          <Route path='/adminnav' element={<Adminnav />} />
        </Routes>
        <Toaster />
        </>

  );
}


export default App;
