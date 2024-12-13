import Navbar from './components/Navbar';
import Map from './components/Map';
import './App.css';
import './i18n/Config';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Notice from './components/Notice';
import Points from './components/Points';
import ProfileModal from './components/ProfileModal';
import Contact from './components/Contact';
import Services from './components/Services';
import Employees from './components/Employees';
import ProtectedRoute from './components/ProtectedRoute'; 
import AppBar from './components/AppBar';

function App() {
  return (
    <div className="App">
      <AppBar/>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas protegidas */}
        <Route
          path="/notice"
          element={
            <ProtectedRoute element={<Notice />} requiredRoleId={1} />
          }
        />
        <Route
          path="/services"
          element={
            <ProtectedRoute element={<Services />} requiredRoleId={1} /> 
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute element={<Employees />} requiredRoleId={4} />
          }
        />

        {/* Rutas públicas */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Map />} />
      </Routes>
    </div>
  );
}

export default App;
