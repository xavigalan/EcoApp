import { useState, useEffect } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css'; 
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; 
import L from 'leaflet'; 

const App = () => {
  const [position, setPosition] = useState<[number, number] | null>(null); 

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error al obtener la ubicación: ", error);
        }
      );
    }
  }, []);

  const defaultPosition: [number, number] = [41.15612, 1.10687]; 
  const fixedPoints = [
    { lat: 41.158, lng: 1.109, name: 'Punto fijo 1' },
    { lat: 41.160, lng: 1.110, name: 'Punto fijo 2' },
    { lat: 41.155, lng: 1.111, name: 'Punto fijo 3' },
  ];

  return (
    <div className="App">
      <h2>Mapa de Reus</h2>

      <div className="map-and-form-container">
        {/* Mapa */}
        <div className="map-container">
          <MapContainer
            center={position || defaultPosition}
            zoom={13}
            style={{ height: '700px', width: '100%' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {position && (
              <Marker position={position}>
                <Popup>Tu ubicación actual</Popup>
              </Marker>
            )}
            {fixedPoints.map((point, index) => (
              <Marker key={index} position={[point.lat, point.lng]}>
                <Popup>{point.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Formulario de denuncia */}
        <div className="form-container">
          <h3>Denunciar Basura</h3>
          <form>
            <div className="form-group">
              <label htmlFor="description">Descripción:</label>
              <textarea
                id="description"
                rows={4}
                placeholder="Describe el problema..."
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="image">Imagen (opcional):</label>
              <input type="file" id="image" />
            </div>
            <button type="submit">Enviar Denuncia</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
