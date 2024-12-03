import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
//import { events } from '../data'; // Asegúrate de importar los makers desde data.js
//import { neighborhoods } from '../data'; // Asegúrate de importar los makers desde data.js
import '../estilos/MapComponent.css';

const customIcon = L.icon({
  iconUrl: 'myLocationPointer.png', // Ruta de la imagen del icono
  iconSize: [38, 38], // TamaÃ±o del icono [ancho, alto]
  iconAnchor: [19, 38], // Punto donde se ancla el icono en el mapa
  popupAnchor: [0, -38], // Punto donde se ancla el popup
});

interface MapComponentProps {
  startDate: string;
  endDate: string;
  showFavorites: boolean; // Nueva prop para controlar si mostrar favoritos
}

const MapComponent: React.FC = ({  }) => {
  const [position, setPosition] = useState<LatLngExpression | null>(null);
  //const [filteredEvents, setFilteredEvents] = useState(events); // Al principio, todos los eventos

  useEffect(() => {
    // Verificar si la geolocalización está disponible en el navegador
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error al obtener la ubicación: ", error);
          setPosition([41.124224, 1.240639]);
        }
      );
    } else {
      console.error("Geolocalización no soportada");
      setPosition([41.124224, 1.240639]);
    }
  }, []);

  /*useEffect(() => {
    // Filtrar los eventos según el rango de fechas y si estamos mostrando solo favoritos
    const filtered = events.filter((event) => {
      const eventDate = new Date(event.date);
      const start = new Date(startDate);
      const end = endDate ? new Date(endDate) : null;
    
      // Si endDate está vacío, filtrar solo por startDate
      if (!end) {
        return eventDate >= start && (showFavorites ? event.isFavorite : true);
      }
    
      // Si endDate tiene valor, filtrar por startDate y endDate
      return (
        eventDate >= start &&
        eventDate <= end &&
        (showFavorites ? event.isFavorite : true)
      );
    });
    
    setFilteredEvents(filtered);
  }, [startDate, endDate, showFavorites]);
*/
  if (position === null) {
    return <div>Cargando ubicación...</div>;
  }

  return (
    <div>
      {/* Mapa */}
      <MapContainer
        center={[41.124224, 1.240639]}
        zoom={14}
        style={{ height: '90vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Marcador para la ubicación actual */}
        <Marker position={position} icon={customIcon}>
        <Popup>¡Hola! Este es tu marcador personalizado. 🚀</Popup>
        </Marker>

        { /*Marcadores de los eventos filtrados }
        {filteredEvents.map((event, idx) => (
          <Marker position={event.coordinates} key={idx}>
            <Popup className='PopEventos'>
              <img id="Imagen_PopUp"src={event.imageUrl} />
              <h3>{event.name}</h3> 
              <p>está en: {event.coordinates[0]}, {event.coordinates[1]}</p>
              <a 
              href={'https://www.google.com/maps?q=${event.coordinates[0]},${event.coordinates[1]}'} 
              target="_blank" 
              rel="noopener noreferrer"
                >
              Anar-hi
              </a>
            </Popup>
          </Marker>
        ))}
          */}
        {/* Aquí van los vecindarios }
        {neighborhoods.map((neighborhood) => (
          <>
            <Polygon
              positions={neighborhood.positions}
              pathOptions={{
                color: 'transparent', 
                fillColor: neighborhood.color, 
                fillOpacity: 0.3, 
              }}
            >
              <Popup>{neighborhood.name}</Popup>
            </Polygon>
            <Polyline
              positions={neighborhood.positions}
              pathOptions={{
                color: neighborhood.color, 
                weight: 3, 
              }}
            />
          </>
        ))}*/}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
