import Navbar from './components/Navbar';
import Map from './components/map/Map';
import './App.css';
import './i18n/Config';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login/Register/LoginPage';
import RegisterPage from './components/Login/Register/RegisterPage';
import Notice from './components/notice/Notice';
import MapPointsList from './components/mappoints/MapPointsList';
import ProfileModal from './components/ProfileModal';
import Contact from './components/contact/Contact';
import Services from './components/Services/Services';
import Employees from './components/users/Employees';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './components/users/AuthContext';
import  AddEmployeeForm from './components/users/AddEmployeeForm';
import AddMapPointForm from './components/mappoints/AddMapPointForm';



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
          <Route path="/add/employees" element={<AddEmployeeForm />} />

          <Route path="/points" element={<MapPointsList />} />
          <Route path="/add/mappoint" element={<AddMapPointForm />} />

          {/*
          <Route path="/notice" element={<Notice />} />
          <Route path="/points" element={<Points />} />
          */}
          <Route path="/contact" element={<Contact />} />

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
