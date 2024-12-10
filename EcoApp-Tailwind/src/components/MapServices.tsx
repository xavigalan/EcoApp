import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, useMapEvents } from 'react-leaflet';
import { LocationMode, ReportType } from '../types';
import { getIconByType } from '../utils/iconUtils';
import 'leaflet/dist/leaflet.css';
import { MapMarker } from './map/MapMarker';
import { DEFAULT_POSITION, MAP_CONFIG, REUS_PERIMETER } from '../constants/map';

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
  const [mapPoints, setMapPoints] = useState<any[]>([]); // Estado para almacenar los puntos del mapa
  const [current, setCurrent] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (locationMode === 'current') {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser');
        setCurrent(DEFAULT_POSITION);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrent([pos.coords.latitude, pos.coords.longitude]);
          setError(null);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setError(error.code === 1 ? 'Location access denied' : 'Unable to get location');
          setCurrent(DEFAULT_POSITION);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
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

  return (
    <MapContainer
      center={position}
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
        <MapMarker
          position={current}
          icon={getIconByType('person')}
          name="Current Location"
        />
      )}

      {position && (
        <MapMarker
          position={position}
          icon={getIconByType('selected', reportType)}
          name="Selected Location"
        />
      )}

      {locationMode === 'map' && <MapClickHandler onLocationSelect={onLocationSelect} />}
      {mapPoints.map((point) => (
        <MapMarker
          key={point.id}
          position={[point.latitude, point.longitude]}
          icon={getIconByType(point.typePoint.name)}
          name={point.name}
          description={point.description}
        />
      ))}
    </MapContainer>
  );
}