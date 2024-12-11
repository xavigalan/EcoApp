import Navbar from './components/Navbar';
import Map from './components/Map';

import './App.css'
import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Notice from './components/Notice';
import Points from './components/Points';
import ProfileModal from './components/ProfileModal';
import Contact from './components/Contact';
import Employees from './components/Employees';
import Services from './components/Services';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './components/AuthContext';


function App() {
  return (
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/employees" element={<Employees />} />
          
          {/*
          <Route path="/notice" element={<Notice />} />
          <Route path="/points" element={<Points />} />
          */}
          <Route path="/contact" element={<Contact />} />

          <Route path="/" element={<Map />} />
        </Routes>
        {/* <Map /> */}
      </div>
  );
}

export default App
