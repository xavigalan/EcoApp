import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Service } from '../../types/service';
import { fetchServices } from '../../api/services';
import ServiceHistoryItem from './ServicesHistoryItem';
import { Loader2 } from 'lucide-react';

const ServicesHistory: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
        setError(null);
      } catch (err) {
        setError(t('errors.fetch_services_failed'));
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, [t]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 h-full">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-[75vh] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">{t('services.history')}</h2>
      <div className="space-y-4">
        {services.length === 0 ? (
          <p className="text-gray-500 text-center py-8">{t('services.no_history')}</p>
        ) : (
          services.map((service) => (
            <ServiceHistoryItem key={service.id} service={service} />
          ))
        )}
      </div>
    </div>
  );
};

export default ServicesHistory;