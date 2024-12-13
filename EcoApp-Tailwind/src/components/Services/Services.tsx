import { useState, useEffect } from 'react';
import { MapServices } from '../map/MapServices';
import { ReportForm } from './ReportForm';
import { LocationMode, Report, ReportType } from '../../types';
import { useTranslation } from 'react-i18next';

const defaultPosition: [number, number] = [41.1561, 1.1069];

function Services() {
  const [position, setPosition] = useState<[number, number]>(defaultPosition);
  const [locationMode, setLocationMode] = useState<LocationMode>('current');
  const [locationError, setLocationError] = useState<string | null>(null);
  const [reportType, setReportType] = useState<ReportType>('tree');
  const [error, setError] = useState<string | null>(null);
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
      const report: Report = {
          ...reportData,
          location: position,
      };

      try {
          // TODO: Implement API call to submit report
          console.log('Submitting report:', report);
      } catch (error) {
          console.error('Error submitting report:', error);
          setError(t('failed_to_submit_report'));
      }
  };

  return (
      <div className="min-h-screen bg-gray-100 py-8 px-4" style={{ position: 'fixed', width: '-webkit-fill-available', height: '-webkit-fill-available' }}>
          <div className="w-full mx-auto space-y-8">
              <h1 className="text-3xl font-bold text-center text-gray-900">{t('services')}</h1>

              {error && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                      <div className="flex">
                          <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="ºrrentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                          </div>
                          <div className="ml-3">
                              <p className="text-sm text-red-700">{error}</p>
                          </div>
                      </div>
                  </div>
              )}

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
