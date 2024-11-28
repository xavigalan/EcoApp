import { useState, useEffect } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css'; // Importa los estilos de Leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Importa los componentes de React-Leaflet
import L from 'leaflet'; // Necesario para personalizar el icono del marcador

const App = () => {
  const [position, setPosition] = useState<[number, number] | null>(null); // Inicializamos como null

  useEffect(() => {
    // Verifica si el navegador soporta geolocalización
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Establecer la posición con lat y lon
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error al obtener la ubicación: ", error);
        }
      );
    } else {
      console.log("La geolocalización no está disponible en este navegador.");
    }
  }, []);

  const defaultPosition: [number, number] = [41.15612, 1.10687]; // Coordenadas de Reus

  return (
    <div className="App">
      <h2>Mapa de Reus</h2>

      {/* Contenedor del mapa */}
      <MapContainer center={position || defaultPosition} zoom={13} style={{ height: '700px', width: '800px' }}>
        {/* Capa del mapa utilizando OpenStreetMap */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Marcador en la ubicación actual (si está disponible) */}
        {position && (
          <Marker position={position}>
            <Popup>Tu ubicación actual</Popup>
          </Marker>
        )}

        {/* Marcador en Reus */}
        <Marker position={defaultPosition}>
          <Popup>Ubicación de Reus</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default App;
