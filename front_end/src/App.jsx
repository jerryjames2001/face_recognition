import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home';
import About from './pages/Aboutus/Aboutus';
import Nav1 from './pages/Nav/nav1';
import Nav2 from './pages/Nav/nav2';
import Login from './pages/LoginRegister/Login';
import Register from './pages/LoginRegister/Register';
import User_profile from './pages/profile/User_profile';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider, UserContext } from '../context/UserContext'; // Import the provider and context
import { useContext } from 'react';

function App() {
  return (
    <UserContextProvider> {/* Wrap the entire app with the context provider */}
      <BrowserRouter>
        <NavWithContext />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<User_profile />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </UserContextProvider>
  );
}

function NavWithContext() {
  const { user } = useContext(UserContext); // Access user from context here

  return user ? <Nav2 /> : <Nav1 />; // Conditionally render navbar based on user state
}

export default App;
