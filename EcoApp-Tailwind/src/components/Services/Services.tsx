import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { MapServices } from '../map/MapServices';
import { ReportForm } from './ReportForm';
import { LocationMode, Report, ReportType } from '../../types';
import { useTranslation } from 'react-i18next';
import { Map, History } from 'lucide-react';
import { createService } from '../../api/services';
import ErrorAlert from '../common/ErrorAlert';

const defaultPosition: [number, number] = [41.1561, 1.1069];

function Services() {
  const [position, setPosition] = useState<[number, number]>(defaultPosition);
  const [locationMode, setLocationMode] = useState<LocationMode>('current');
  const [reportType, setReportType] = useState<ReportType>('tree');
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'map' | 'history'>('map');
  const { t } = useTranslation();
  const navigate = useNavigate(); // Hook para navegación

  useEffect(() => {
    if (locationMode === 'current') {
      if (!navigator.geolocation) {
        setError(t('geolocation_not_supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
          setError(null);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setError(error.code === 1 ? t('location_access_denied') : t('unable_to_get_location'));
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  }, [locationMode, t]);

  const handleLocationSelect = (lat: number, lng: number) => {
    setPosition([lat, lng]);
    setError(null);
  };

  const handleSubmit = async (reportData: Omit<Report, 'location'>) => {
    try {
      console.log({
        type: reportData.type,
        description: reportData.description,
        location: position,
      });

      await createService({
        type: reportData.type,
        description: reportData.description,
        location: position,
      });

      setError(null);
      setView('history');
    } catch (error) {
      console.error('Error submitting report:', error);
      setError(t('failed_to_submit_report'));
    }
  };

  const goToHistory = () => {
    navigate('/services-history'); // Cambia la ruta a ServicesHistory
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 static md:fixed w-full h-full">
      <div className="w-full mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">{t('Services')}</h1>
          <div className="flex space-x-4">
            <button
              onClick={goToHistory}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {t('services.go_to_history')}
            </button>
          </div>
        </div>

        {error && <ErrorAlert message={error} />}

        <div className="grid md:grid-cols-2 gap-16 items-center h-full">
          <div className="w-full h-[75vh]">
            <MapServices
              position={position}
              locationMode={locationMode}
              onLocationSelect={handleLocationSelect}
              reportType={reportType}
            />
          </div>
          <div className="w-full h-[75vh] flex flex-col justify-center">
            <ReportForm
              onLocationModeChange={setLocationMode}
              onLocationSelect={handleLocationSelect}
              onSubmit={handleSubmit}
              onReportTypeChange={setReportType}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
