import { useState, useEffect } from 'react';
import { MapServices } from '../map/MapServices';
import { ReportForm } from './ReportForm';
import ServicesHistory from './ServicesHistory';
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
      await createService({
        type: reportData.type,
        description: reportData.description,
        location: position
      });
      setError(null);
      // Optionally switch to history view after successful submission
      setView('history');
    } catch (error) {
      console.error('Error submitting report:', error);
      setError(t('failed_to_submit_report'));
    }
  };

  const toggleView = () => {
    setView(view === 'map' ? 'history' : 'map');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4" style={{ position: 'fixed', width: '-webkit-fill-available', height: '-webkit-fill-available' }}>
      <div className="w-full mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">{t('Services')}</h1>
          <button
            onClick={toggleView}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {view === 'map' ? (
              <>
                <History className="w-5 h-5 mr-2" />
                {t('services.view_history')}
              </>
            ) : (
              <>
                <Map className="w-5 h-5 mr-2" />
                {t('services.view_map')}
              </>
            )}
          </button>
        </div>

        {error && <ErrorAlert message={error} />}

        <div className="grid md:grid-cols-2 gap-16 items-center h-full">
          <div className="w-full h-[75vh]">
            {view === 'map' ? (
              <MapServices
                position={position}
                locationMode={locationMode}
                onLocationSelect={handleLocationSelect}
                reportType={reportType}
              />
            ) : (
              <ServicesHistory />
            )}
          </div>
          <div className="w-full h-[75vh] flex flex-col justify-center">
            {view === 'map' && (
              <ReportForm
                onLocationModeChange={setLocationMode}
                onLocationSelect={handleLocationSelect}
                onSubmit={handleSubmit}
                onReportTypeChange={setReportType}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Services;