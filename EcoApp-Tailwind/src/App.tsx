import { useState } from 'react'
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App
