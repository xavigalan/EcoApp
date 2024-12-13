import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';
import { getIconByType } from '../../utils/iconUtils';
import { DEFAULT_POSITION, REUS_PERIMETER } from '../../constants/map';



const Map = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [mapPoints, setMapPoints] = useState<any[]>([]); // Estado para almacenar los puntos del mapa

  // LLAMAR BACKEND
  useEffect(() => {
    fetch('http://localhost:8080/mappoints/types')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMapPoints(data);
      })
      .catch((error) => console.error('Error al obtener los puntos del mapa:', error));
  }, []);

  // GEOLOCALIZACIÓN
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => setPosition([coords.latitude, coords.longitude]),
        (error) => {
          console.error('Error al obtener la ubicación:', error);
          setPosition([41.15612, 1.10687]); // Ubicación predeterminada
          alert('No se ha podido obtener tu ubicación. Se ha usado una ubicación predeterminada.');
        }
      );
    } else {
      console.error('La geolocalización no está soportada en este navegador.');
      setPosition([41.15612, 1.10687]); // Ubicación predeterminada
      alert('La geolocalización no es soportada por tu navegador. Se ha usado una ubicación predeterminada.');
    }
  }, []);


  return (
    <MapContainer
      center={DEFAULT_POSITION}
      zoom={15}
      scrollWheelZoom={true}
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
        <Marker position={position} icon={getIconByType('person')}>
          <Popup>
            <p>Current location</p>
            <a
              href={`https://www.google.com/maps?q=${position[0]},${position[1]}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Maps
            </a>
          </Popup>
        </Marker>
      )}

      {/* Mostrar los puntos obtenidos desde el backend */}
      {mapPoints.map((point) => (
        <Marker key={point.id} position={[point.latitude, point.longitude]} icon={getIconByType(point.typePoint.name)}>
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
      
      <Polygon positions={REUS_PERIMETER} color="blue" />


    </MapContainer>
  );
};

export default Map;