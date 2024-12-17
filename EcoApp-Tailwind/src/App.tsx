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
import AddEmployeeForm from './components/users/AddEmployeeForm';
import AddMapPointForm from './components/mappoints/AddMapPointForm';



function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Map />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas protegidas */}
        <Route path="/notice" element={<ProtectedRoute element={<Notice />} requiredRoleIds={[1,2,3,4]} />} />
        
        <Route path="/services" element={<ProtectedRoute element={<Services />} requiredRoleIds={[1,2,3,4]} />} />
        
        <Route path="/employees" element={<ProtectedRoute element={<Employees />} requiredRoleIds={[4]} />} />
        <Route path="/add/employees" element={<ProtectedRoute element={<AddEmployeeForm />} requiredRoleIds={[4]} />} />

        <Route path="/points" element={<ProtectedRoute element={<MapPointsList />} requiredRoleIds={[1,2,3,4]} />} />
        <Route path="/add/mappoint" element={<ProtectedRoute element={<AddMapPointForm />} requiredRoleIds={[1,2,3,4]} />} />


      </Routes>
    </div>
  );
}

export default App;
