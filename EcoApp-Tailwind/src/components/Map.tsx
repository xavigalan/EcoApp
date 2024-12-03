import { useState, useEffect } from 'react';
<<<<<<< HEAD
import Navbar from './Navbar'; // Asegúrate de importar el Navbar correctamente
import '../App.css';
=======
import Navbar from './Navbar';
>>>>>>> 80e9271df3dd875b35ffaeef09f2f4ceebda6a1f
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
<<<<<<< HEAD
    const map = useMapEvents({
      click(event) {  
        if (reportType === 'eventos') {
          const { lat, lng } = event.latlng;
          setEventLocation([lat, lng]);
        }
      },
=======
    useMapEvents({
      click: ({ latlng }) => setEventLocation([latlng.lat, latlng.lng]),
>>>>>>> 80e9271df3dd875b35ffaeef09f2f4ceebda6a1f
    });
    return null;
  };

<<<<<<< HEAD
  const getEmoticonAndColor = (type: string) => {
    switch (type) {
      case 'poda':
        return { emoticon: '🌳', color: 'green' };
      case 'muebles':
        return { emoticon: '🛋️', color: 'brown' };
      case 'eventos':
        return { emoticon: '📅', color: 'blue' };
      case 'otros':
        return { emoticon: '🗑️', color: 'gray' };
      default:
        return { emoticon: '', color: 'black' };
    }
  };

  const { emoticon, color } = getEmoticonAndColor(reportType);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Evitar el refresco de la página al enviar el formulario
    
    const formData = new FormData();
    formData.append('description', description);
    formData.append('reportType', reportType);
    if (image) formData.append('image', image);
    if (position) formData.append('latitude', position[0].toString());
    if (position) formData.append('longitude', position[1].toString());
    if (eventLocation) formData.append('eventLocation', eventLocation.join(','));

    try {
      const response = await fetch('http://your-backend-api-url/submit-report', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }

      setDescription('');
      setImage(null);
      setEventLocation(null);
      setReportType('');
      alert('Reporte enviado con éxito');
    } catch (error) {
      console.error('Error al enviar el reporte:', error);
      alert('Hubo un error al enviar el reporte');
    }
  };

  return (
    <div className="App">
      <Navbar /> {/* Insertamos el Navbar aquí */}

      <h2>Formulario de Reporte</h2>

      <div className="map-and-form-container">
        {/* Mapa */}
        <div className="map-container">
          <MapContainer
            center={position || defaultPosition}
            zoom={13}
            style={{ height: '700px', width: '100%' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {position && (
              <Marker position={position} icon={new L.Icon({
                iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Map_marker_icon_%28brown%29.svg/120px-Map_marker_icon_%28brown%29.svg.png', // Ícono para ubicación actual
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32],
              })}>
                <Popup>Tu ubicación actual</Popup>
              </Marker>
            )}
            {eventLocation && (
              <Marker position={eventLocation} icon={getIconByType('eventos')}>
                <Popup>Ubicación del Evento</Popup>
              </Marker>
            )}
            <LocationClickHandler />
          </MapContainer>
        </div>

        {/* Formulario de reporte */}
        <div className="form-container">
          <h3>Selecciona el tipo de reporte</h3>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label>Tipo de Reporte:</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                required
              >
                <option value="">Selecciona un tipo de reporte</option>
                <option value="poda">Poda de árboles</option>
                <option value="muebles">Recogida de Muebles</option>
                <option value="eventos">Avisar de Eventos</option>
                <option value="otros">Otros (Basura, Animales muertos, etc.)</option>
              </select>
            </div>

            {reportType && (
              <div className="report-emoticon" style={{ color }}>
                <span style={{ fontSize: '3rem' }}>{emoticon}</span>
                <p style={{ color }}>Este es tu reporte seleccionado: {reportType}</p>
              </div>
            )}

            {reportType && (
              <>
                <div className="form-group">
                  <label htmlFor="description">Descripción:</label>
                  <textarea
                    id="description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe el reporte"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="image">Imagen (opcional):</label>
                  <input
                    type="file"
                    id="image"
                    onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                  />
                </div>

                <button type="submit">Enviar Reporte</button>
              </>
            )}
          </form>
        </div>
=======
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
>>>>>>> 80e9271df3dd875b35ffaeef09f2f4ceebda6a1f
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default App;
=======
export default Map;
>>>>>>> 80e9271df3dd875b35ffaeef09f2f4ceebda6a1f
