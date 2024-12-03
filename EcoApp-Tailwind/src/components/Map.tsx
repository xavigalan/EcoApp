import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map: React.FC = () => {
  // Coordenadas iniciales para centrar el mapa
  const initialPosition: [number, number] = [41.1561, 1.1069];
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState<string>('');

  // Icono personalizado para el marcador
  const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  // Manejar la búsqueda de direcciones
  const handleSearch = async () => {
    if (address.trim() === '') return;

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      address
    )}&format=json&addressdetails=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.length > 0) {
        // Usar la primera coincidencia
        const { lat, lon } = data[0];
        setMarkerPosition([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert('No se encontró la dirección especificada.');
      }
    } catch (error) {
      console.error('Error al buscar la dirección:', error);
      alert('Hubo un error al buscar la dirección.');
    }
  };

  return (
    <div>
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000 }}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Introduce una calle"
          style={{ padding: '5px', width: '200px' }}
        />
        <button onClick={handleSearch} style={{ padding: '5px' }}>
          Buscar
        </button>
      </div>

      <MapContainer
        center={initialPosition}
        zoom={13}
        style={{
          height: '-webkit-fill-available',
          width: '-webkit-fill-available',
          position: 'fixed',
          zIndex: 1,
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markerPosition && (
          <Marker position={markerPosition} icon={customIcon}>
            <Popup>
              {address} <br /> ({markerPosition[0].toFixed(5)}, {markerPosition[1].toFixed(5)})
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
