import Navbar from './components/Navbar';
import Map from './components/Map';

import './App.css'
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Map />
      </div>
    </BrowserRouter>
  );
}

export default App
