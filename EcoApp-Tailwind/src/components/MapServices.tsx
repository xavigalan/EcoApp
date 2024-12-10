import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMapEvents } from 'react-leaflet';
import { LocationMode, ReportType } from '../types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import contenedordebasura from '../assets/contenedor-de-basura.png';
import wastecenter from '../assets/LogoSolo.png';
import othersIcon from '../assets/camion-de-la-basura.png';
import textile from '../assets/ropa.png';
import personIcon from '../assets/personIcon.png';
import selected from '../assets/selected.png';
import poda from '../assets/arbol.png';
import basura from '../assets/bolsabasura.png';
import muebles from '../assets/home-furniture.png';
import events from '../assets/events.png';

const getIconByType = (type: string, reportType?: ReportType) => {
  // If it's the selected marker, return the appropriate icon based on report type
  if (type === 'selected' && reportType) {
    const reportTypeIcons = {
      tree: poda,
      furniture: muebles,
      event: events,
      trash: basura,
    };
    return L.icon({
      iconUrl: reportTypeIcons[reportType],
      iconSize: [38, 40],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  }

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
      iconUrl: wastecenter,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    }),
    Others: L.icon({
      iconUrl: othersIcon,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    }),
    person: L.icon({
      iconUrl: personIcon,
      iconSize: [40, 40],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    }),
    selected: L.icon({
      iconUrl: selected,
      iconSize: [38, 40],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    }),
  };

  return icons[type] || L.icon({
    iconUrl: '/default-icon.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

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
  const [mapPoints, setMapPoints] = useState<any[]>([]);
  const [current, setCurrent] = useState<[number, number] | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const defaultPosition: [number, number] = [41.15612, 1.10687];

  useEffect(() => {
    if (locationMode === 'current') {
      if (!navigator.geolocation) {
        setLocationError('Geolocation is not supported by your browser');
        setCurrent(defaultPosition);
        return;
      }

      setLocationError(null);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrent([pos.coords.latitude, pos.coords.longitude]);
          setLocationError(null);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLocationError(
            error.code === 1
              ? 'Location access denied. Please enable location services.'
              : 'Unable to get your location. Using default position.'
          );
          setCurrent(defaultPosition);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    }
  }, [locationMode]);

  useEffect(() => {
    fetch('http://localhost:8080/mappoints/types')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMapPoints(data);
      })
      .catch((error) => console.error('Error al obtener los puntos del mapa:', error));
  }, []);

  const reusPerimeter: L.LatLngTuple[] = [
    // ... (rest of the perimeter coordinates remain the same)
  ];

  return (
    <MapContainer
      center={position}
      zoom={16}
      scrollWheelZoom={true}
      className="h-[100px] w-full rounded-lg shadow-md"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polygon positions={reusPerimeter} color="blue" />

      {current && (
        <Marker position={current} icon={getIconByType('person')}>
          <Popup>
            <p>Current location</p>
            <a
              href={`https://www.google.com/maps?q=${current[0]},${current[1]}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Maps
            </a>
          </Popup>
        </Marker>
      )}

      {position && (
        <Marker position={position} icon={getIconByType('selected', reportType)}>
          <Popup>
            <p>Selected location</p>
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
    </MapContainer>
  );
}