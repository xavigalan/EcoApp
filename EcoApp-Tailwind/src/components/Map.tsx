import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline, Polygon } from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';
import contenedordebasura from '../assets/contenedor-de-basura.png'; // Icono para "Container"
import wastecenter from '../assets/LogoSolo.png'; // Icono para "Textile container"
import othersIcon from '../assets/camion-de-la-basura.png'; // Icono para "Others"
import textile from '../assets/ropa.png'; // Icono para "Textile container"

const Map = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [eventLocation, setEventLocation] = useState<[number, number] | null>(null);
  const [mapPoints, setMapPoints] = useState<any[]>([]); // Estado para almacenar los puntos del mapa

  const reusBoundary: { name: string; positions: LatLngTuple[]; } = {
    name: "Reus",
    positions: [
      [41.150674, 1.084313],
    ] as LatLngTuple[],
  };

  // Función para asignar el icono adecuado según el tipo
  const getIconByType = (type: string) => {
    const icons: Record<string, L.Icon> = {
      Container: L.icon({
        iconUrl: contenedordebasura,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      }),
      'Textile container': L.icon({
        iconUrl: textile,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      }),
      'Waste center': L.icon({
        iconUrl: wastecenter, // Asegúrate de tener este icono
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      }),
      Others: L.icon({
        iconUrl: othersIcon, // Asegúrate de tener este icono
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      }),
    };

    // Si el tipo no está en el objeto `icons`, devuelve un icono por defecto
    return icons[type] || L.icon({
      iconUrl: '/default-icon.png', // Un icono por defecto si no se encuentra el tipo
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  };

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

  const LocationClickHandler = () => {
    useMapEvents({
      click: ({ latlng }) => setEventLocation([latlng.lat, latlng.lng]),
    });
    return null;
  };

  return (
    <MapContainer
      center={position || defaultPosition}
      zoom={13}
      className="w-full h-full absolute left-0"
      style={{
        height: '-webkit-fill-available',
        width: '-webkit-fill-available',
        position: 'fixed',
        zIndex: 1
      }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Marcador de la ubicación actual */}
      {position && (
        <Marker position={position} icon={getIconByType('Others')}>
          <Popup>Tu ubicación actual</Popup>
        </Marker>
      )}

      {/* Marcador de la ubicación seleccionada */}
      {eventLocation && (
        <Marker position={eventLocation} icon={getIconByType('Others')}>
          <Popup>Ubicación seleccionada</Popup>
        </Marker>
      )}

      {/* Mostrar los puntos obtenidos desde el backend */}
      {mapPoints.map((point) => (
        <Marker key={point.id} position={[point.latitude, point.longitude]} icon={getIconByType(point.type.name)}>
          <Popup>
            <h3>{point.name}</h3>
            <p>{point.description}</p>
            <p>Cord {point.latitude}, {point.longitude}</p>
            <a
              href={`https://www.google.com/maps?q=${point.latitude},${point.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Maps
            </a>
          </Popup>
        </Marker>
      ))}
        <Polygon
          positions={reusBoundary.positions}
          pathOptions={{
            color: 'transparent', // Sin color para la línea externa
            fillOpacity: 0.3,
          }}
        >
          <Popup>{reusBoundary.name}</Popup>
        </Polygon>
        <Polyline
          positions={reusBoundary.positions}
          pathOptions={{
            weight: 3,
          }}
        />

      <LocationClickHandler />
    </MapContainer>
  );
};

export default Map;
