import { useState } from 'react'
import 'leaflet/dist/leaflet.css'; 
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import MapComponent from './components/MapComponent';
import RegisterPage from './components/RegisterPage';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Navbar/>
      <MapComponent />
    </div>
  );
}

export default App
