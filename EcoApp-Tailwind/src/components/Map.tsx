import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

import furnitureIcon from '../assets/furniture-icon.png';
import calendarIcon from '../assets/calendar-icon.png';
const Map = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [eventLocation, setEventLocation] = useState<[number, number] | null>(null);
  const [mapPoints, setMapPoints] = useState<any[]>([]); // Estado para almacenar los puntos del mapa
  
  const customIcon = L.icon({
    iconUrl: '/myLocationPointer.png', // Usar la ruta relativa desde la carpeta public
    iconSize: [38, 38], // Tamaño del icono
    iconAnchor: [19, 38], // Punto donde se ancla el icono
    popupAnchor: [0, -38], // Punto donde se ancla el popup
  });
  

  useEffect(() => {
    // Obtener la ubicación del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => setPosition([coords.latitude, coords.longitude]),
        (error) => console.error('Error al obtener la ubicación:', error)
      );
    }
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/mappoints')
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Verifica que los datos contienen latitudes y longitudes
        setMapPoints(data); // Asumimos que la API devuelve un array de puntos
      })
      .catch((error) => console.error('Error al obtener los puntos del mapa:', error));
  }, []);
  

  const defaultPosition: [number, number] = [41.15612, 1.10687];

  const getIconByType = (type: string) => {
    const icons: Record<string, string> = {
      Container: 'container-icon-url', // Asegúrate de poner las URLs de tus íconos
      'Textile container': 'textile-icon-url',
      otros: 'recycle-bin-icon-url', // Este ícono es solo un ejemplo
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
      <div className="flex-grow pt-11">
        <MapContainer
          center={position || defaultPosition}
          zoom={13}
          className="w-full h-full absolute left-0"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Marcador de la ubicación actual */}
          {position && (
            <Marker position={position} icon={getIconByType('')}>
              <Popup>Tu ubicación actual</Popup>
            </Marker>
          )}

          {/* Marcador de la ubicación seleccionada */}
          {eventLocation && (
            <Marker position={eventLocation} icon={getIconByType('eventos')}>
              <Popup>Ubicación seleccionada</Popup>
            </Marker>
          )}

          {/* Mostrar los puntos obtenidos desde el backend */}
          {mapPoints.map((point) => (
            <Marker key={point.id} position={[point.latitude, point.longitude]} icon={customIcon}>
              <Popup>
                <h3>{point.name}</h3>
                <p>{point.description}</p>
              </Popup>
            </Marker>
          ))}
          <LocationClickHandler />
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
