import { useState } from 'react'
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import Map from './components/Map';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Map />
    </div>
  );
}

export default App
