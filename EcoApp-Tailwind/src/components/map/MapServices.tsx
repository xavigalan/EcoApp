import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMapEvents } from 'react-leaflet';
import { LocationMode, ReportType } from '../../types';
import { fetchServices } from '../../api/services';
import { DEFAULT_POSITION, MAP_CONFIG, REUS_PERIMETER } from '../../constants/map';
import L from 'leaflet'; // Asegúrate de importar Leaflet
import defaultIconUrl from '../marker-icon.png';

type MapProps = {
  position: [number, number];
  locationMode: LocationMode;
  onLocationSelect?: (lat: number, lng: number) => void;
  reportType?: ReportType;
};

function MapClickHandler({ onLocationSelect }: { onLocationSelect?: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      if (onLocationSelect) {
        onLocationSelect(e.latlng.lat, e.latlng.lng);
      }
    },
  });
  return null;
}

export function MapServices({ position, locationMode, onLocationSelect, reportType }: MapProps) {
  const [services, setServices] = useState<any[]>([]);
  const [positione, setPositione] = useState<[number, number] | null>(null);
  const [current, setCurrent] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices()
      .then((data) => {
        setServices(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error al obtener los servicios:', error);
        setError('Error al cargar los servicios');
      });
  }, []);

  // GEOLOCALIZACIÓN
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => setPositione([coords.latitude, coords.longitude]),
        (error) => {
          console.error('Error al obtener la ubicación:', error);
          setPositione([41.15612, 1.10687]); // Ubicación predeterminada
          alert('No se ha podido obtener tu ubicación. Se ha usado una ubicación predeterminada.');
        }
      );
    } else {
      console.error('La geolocalización no está soportada en este navegador.');
      setPositione([41.15612, 1.10687]); // Ubicación predeterminada
      alert('La geolocalización no es soportada por tu navegador. Se ha usado una ubicación predeterminada.');
    }
  }, []);

  // Función para crear un ícono personalizado
  const createIcon = (imageUrl: string | null) => {
    if (imageUrl) {
      return L.icon({
        iconUrl: imageUrl,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });
    } else {
      // Retorna el ícono predeterminado de Leaflet
      return L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      });
    }
  };

  return (
    <MapContainer
      center={DEFAULT_POSITION}
      zoom={MAP_CONFIG.zoom}
      scrollWheelZoom={MAP_CONFIG.scrollWheelZoom}
      className="h-[100px] w-full rounded-lg shadow-md"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polygon positions={REUS_PERIMETER} color="blue" />

      {current && (
        <Marker position={current} icon={createIcon('/assets/personIcon.png')}>
          <Popup>Ubicación actual</Popup>
        </Marker>
      )}

      {/* {position && (
        <Marker position={position} icon={createIcon('/assets/selected.png')}>
          <Popup>Ubicación seleccionada</Popup>
        </Marker>
      )} */}


      {/* Marcador de la ubicación actual */}
      {position && (
        <Marker position={position} icon={createIcon('/assets/selected.png')}>
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

      {locationMode === 'map' && <MapClickHandler onLocationSelect={onLocationSelect} />}

      {services.map((service) => (
        <Marker
          key={service.id}
          position={[service.locationLatitude, service.locationLongitude]}
          icon={createIcon(service.photoBefore)}
        >
          <Popup>
            <div>
              <h4>{service.serviceType.name}</h4>
              <p>{service.description}</p>
              {/* <small>{service.locationAddress}</small> */}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
