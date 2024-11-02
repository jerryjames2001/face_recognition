import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home';
import About from './pages/Aboutus/Aboutus';
import Login from './pages/LoginRegister/Login';
import Register from './pages/LoginRegister/Register';
import User_profile from './pages/profile/User_profile';
import Logs from  './pages/logs';
import Camerauser from './pages/camera/Camera';
import Suspects from './pages/Suspects/Suspects';



import { Toaster } from 'react-hot-toast';
import Adminnav from './pages/Admin/Adminnav';
import Camera from './pages/Admin/CameraManagement';
import DashboardHome from './pages/Admin/DashboardHome';
import Adminlogs from './pages/Admin/Logs';
import UserManagement from './pages/Admin/UserManagement';


function App() {


  return (
     <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<User_profile />} />
          <Route path='/logs' element={<Logs />} />
          <Route path='/live_cam' element={<Camerauser />} />
          <Route path='/suspects' element={<Suspects />} />
          




          <Route path='/adminnav' element={<Adminnav />} />
          <Route path='/camera' element={<Camera />} />
          <Route path='/dashboard' element={<DashboardHome/>} />
          <Route path='/adminlogs' element={<Adminlogs/>} />
          <Route path='/usermanagement' element={<UserManagement/>} />

        </Routes>
        <Toaster />
        </>

  );
}


export default App;
