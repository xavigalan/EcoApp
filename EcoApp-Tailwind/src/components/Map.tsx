import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map: React.FC = () => {
  // Coordenadas iniciales para centrar el mapa
  const position: [number, number] = [51.505, -0.09]; // Londres, UK

  // Icono personalizado para el marcador
  const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    // popupAnchor: [0, -41],
  });

  return (
    <MapContainer center={position} zoom={13} style={{
      height: '-webkit-fill-available',
      width: '-webkit-fill-available',
      position: 'fixed',
      zIndex: 1
    }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} icon={customIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
