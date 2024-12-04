
 import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polygon } from 'react-leaflet';
import L from 'leaflet';

// Iconos
import locationIcon from '../iconos/location.png';

const App = () => {
  const [position, setPosition] = useState<[number, number]>([41.15612, 1.10687]); // Coordenadas actuales
  const [locationMode, setLocationMode] = useState<'manual' | 'geolocation' | 'map' | ''>(''); // Modo de ubicación
  const [address, setAddress] = useState<string>(''); // Dirección ingresada manualmente
  const [manualLocation, setManualLocation] = useState<[number, number] | null>(null); // Ubicación manual

  // Coordenadas del perímetro de Reus
  const reusPerimeter: L.LatLngTuple[] = [
    [41.1641532, 1.0910310], [41.1635559, 1.0919380], [41.1641556, 1.0910368],
    [41.1633924, 1.0919487], [41.1640100, 1.0929460], [41.1631420, 1.0950120],
    [41.1638990, 1.0953765], [41.1651560, 1.0937417], [41.1666770, 1.0951380],
    [41.1665931, 1.0954563], [41.1666900, 1.0956903], [41.1664606, 1.0959877],
    [41.1654430, 1.0976669], [41.1652401, 1.0977396], [41.1647870, 1.0976966],
    [41.1646371, 1.0977906], [41.1641740, 1.0986986], [41.1641590, 1.0988976],
    [41.1645270, 1.0991879], [41.1646361, 1.0995870], [41.1647080, 1.0995886],
    [41.1656111, 1.0993286], [41.1657560, 1.0993756], [41.1658990, 1.0995940],
    [41.1659810, 1.1001126], [41.1666130, 1.1017604], [41.1666070, 1.1018384],
    [41.1666118, 1.1018373], [41.1659890, 1.1019850], [41.1659040, 1.1021110],
    [41.1658630, 1.1022356], [41.1659620, 1.1033797], [41.1661410, 1.1040293],
    [41.1664340, 1.1045943], [41.1656430, 1.1054497], [41.1655319, 1.1057179],
    [41.1659160, 1.1068797], [41.1659330, 1.1071513], [41.1660830, 1.1073413],
    [41.1662700, 1.1074963], [41.1663390, 1.1077950], [41.1664880, 1.1081630],
    [41.1664900, 1.1082346], [41.1664360, 1.1083800], [41.1656300, 1.1092317],
    [41.1652120, 1.1094120], [41.1651980, 1.1104986], [41.1653060, 1.1107780],
    [41.1654080, 1.1108583], [41.1656940, 1.1108647], [41.1685672, 1.1160880],
    [41.1666723, 1.1183790], [41.1687099, 1.1188213], [41.1702673, 1.1224172],
    [41.1659657, 1.1235453], [41.1615663, 1.1179288], [41.1606003, 1.1185690],
    [41.1584193, 1.1198622], [41.1559327, 1.1216522], [41.1520433, 1.1179018],
    [41.1503117, 1.1244722], [41.1525787, 1.1293040], [41.1498193, 1.1326308],
    [41.1457193, 1.1235883], [41.1483946, 1.1171957], [41.1468483, 1.1148193],
    [41.1453027, 1.1166783], [41.1434283, 1.1166350], [41.1405520, 1.1190172],
    [41.1381823, 1.1206905], [41.1366267, 1.1200472], [41.1352880, 1.1217283],
    [41.1339343, 1.1222852], [41.1335522, 1.1215290], [41.1308845, 1.1206460],
    [41.1309088, 1.1182720], [41.1339948, 1.1164360], [41.1329872, 1.1129181],
    [41.1369255, 1.1097471], [41.1373052, 1.1086272], [41.1377375, 1.1041972],
    [41.1428998, 1.1028490], [41.1421162, 1.0966410], [41.1518758, 1.0935511],
    [41.1519882, 1.0897530], [41.1509622, 1.0890022], [41.1512448, 1.0869422],
    [41.1534745, 1.0875219], [41.1529422, 1.0892811], [41.1548155, 1.0896892],
    [41.1557122, 1.0854831], [41.1590242, 1.0850860], [41.1591782, 1.0819530],
    [41.1631845, 1.0835838]
  ];
  
  // Función para manejar la geolocalización
  useEffect(() => {
    if (navigator.geolocation && locationMode === 'geolocation') {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error('Error al obtener la ubicación: ', error);
        }
      );
    }
  }, [locationMode]);

  // Función para seleccionar una ubicación en el mapa
  const LocationClickHandler = () => {
    const map = useMapEvents({
      click(event: L.LeafletMouseEvent) {
        if (locationMode === 'map') {
          const { lat, lng } = event.latlng;
          setPosition([lat, lng]);
        }
      },
    });
    return null;
  };

  // Manejar la búsqueda de dirección
  const handleAddressSearch = () => {
    if (address) {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=YOUR_GOOGLE_API_KEY`)
        .then(response => response.json())
        .then(data => {
          if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            setManualLocation([lat, lng]);
            setPosition([lat, lng]);
          } else {
            alert('Dirección no encontrada');
          }
        })
        .catch(err => {
          console.error(err);
          alert('Error al buscar la dirección');
        });
    } else {
      alert('Por favor, ingresa una dirección');
    }
  };

  return (
    <div className="App">
      <h2>Formulario de Reporte</h2>
      <div className="map-and-form-container">
        {!locationMode && (
          <div className="location-selection">
            <h3>Selecciona tu modo de ubicación</h3>
            <button onClick={() => setLocationMode('manual')}>Ubicación manual</button>
            <button onClick={() => setLocationMode('geolocation')}>Tu ubicación (Geolocalización)</button>
            <button onClick={() => setLocationMode('map')}>Seleccionar en el mapa</button>
          </div>
        )}
        {locationMode && (
          <>
            <div className="map-container">
              <MapContainer center={position} zoom={13} style={{ height: '500px', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {position && (
                  <Marker position={position} icon={new L.Icon({
                    iconUrl: locationIcon,
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                    popupAnchor: [0, -32],
                  })}>
                    <Popup>Ubicación seleccionada</Popup>
                  </Marker>
                )}
                {manualLocation && (
                  <Marker position={manualLocation} icon={new L.Icon({
                    iconUrl: locationIcon,
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                    popupAnchor: [0, -32],
                  })}>
                    <Popup>Ubicación manual</Popup>
                  </Marker>
                )}
                <Polygon positions={reusPerimeter} color="blue" fillColor="blue" fillOpacity={0.2}>
                  <Popup>Perímetro de Reus</Popup>
                </Polygon>
                <LocationClickHandler />
              </MapContainer>
            </div>
            {locationMode === 'manual' && (
              <div className="manual-location">
                <h3>Ingresa una dirección manualmente</h3>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ingresa la dirección"
                />
                <button onClick={handleAddressSearch}>Buscar Dirección</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
