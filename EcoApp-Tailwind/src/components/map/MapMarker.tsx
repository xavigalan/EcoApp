import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

interface MapMarkerProps {
  position: [number, number];
  icon: Icon;
  name?: string;
  description?: string;
}

export function MapMarker({ position, icon, name, description }: MapMarkerProps) {
  return (
    <Marker position={position} icon={icon}>
      <Popup>
        {name && <h3 className="font-semibold">{name}</h3>}
        {description && <p className="mt-1">{description}</p>}
        <p className="mt-2">Coordinates: {position[0]}, {position[1]}</p>
        <a
          href={`https://www.google.com/maps?q=${position[0]},${position[1]}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
        >
          Open in Google Maps
        </a>
      </Popup>
    </Marker>
  );
}