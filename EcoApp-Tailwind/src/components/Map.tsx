import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

const Map = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [eventLocation, setEventLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => setPosition([coords.latitude, coords.longitude]),
        (error) => console.error('Error al obtener la ubicación:', error)
      );
    }
  }, []);

  const defaultPosition: [number, number] = [41.15612, 1.10687];

  const getIconByType = (type: string) => {
    const icons: Record<string, string> = {
      poda: 'tree-icon-url',
      muebles: 'furniture-icon-url',
      eventos: 'calendar-icon-url',
      otros: 'recycle-bin-icon-url',
    };

    return new L.Icon({
      iconUrl: icons[type] || 'default-icon-url',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  };

  const LocationClickHandler = () => {
    useMapEvents({
      click: ({ latlng }) => setEventLocation([latlng.lat, latlng.lng]),
    });
    return null;
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow pt-11">
        <MapContainer
          center={position || defaultPosition}
          zoom={13}
          className="w-full h-full absolute left-0" // Estas clases aseguran que el mapa ocupe todo el espacio disponible
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {position && (
            <Marker position={position} icon={getIconByType('')}>
              <Popup>Tu ubicación actual</Popup>
            </Marker>
          )}
          {eventLocation && (
            <Marker position={eventLocation} icon={getIconByType('eventos')}>
              <Popup>Ubicación seleccionada</Popup>
            </Marker>
          )}
          <LocationClickHandler />
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;