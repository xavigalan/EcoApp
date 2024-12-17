import React from 'react';
import { Clock, MapPin, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Service } from '../../types/service';
import { formatDate, getStatusColor } from '../../utils/serviceUtils.tsx';

interface ServiceHistoryItemProps {
  service: Service;
}

const ServiceHistoryItem: React.FC<ServiceHistoryItemProps> = ({ service }) => {
  const { t } = useTranslation();

  const isLocationValid = Array.isArray(service.location) && service.location.length === 2;

  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold capitalize">{t(`type.${service.type}`)}</h3>
        <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(service.status)}`}>
          {t(`status.${service.status}`)}
        </span>
      </div>
      <div className="space-y-2 text-gray-600">
        <div className="flex items-center">
          <FileText className="w-4 h-4 mr-2" />
          <p>{service.description}</p>
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-2" />
          <p>
            {isLocationValid
              ? `${service.location[0].toFixed(4)}, ${service.location[1].toFixed(4)}`
              : t('location_not_available')}
          </p>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          <p>{formatDate(service.timestamp)}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceHistoryItem;
