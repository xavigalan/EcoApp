import React, { useEffect, useState } from 'react';
import { Service, User } from '../../types/service';
import { UserWithRoleDTO } from '../../types/User';
import { formatDate, getStatusColor, getStatusIcon } from '../../utils/serviceUtils';
import { MapPin, Calendar, Clock, ArrowUpDown } from 'lucide-react';

const ServicesHistory: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<keyof Service>('creationDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:8080/services');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleSort = (field: keyof Service) => {
    setSortDirection((prevDirection) => (sortField === field && prevDirection === 'asc' ? 'desc' : 'asc'));
    setSortField(field);
  };

  const sortedServices = [...services].sort((a, b) => {
    const compareValue = sortDirection === 'asc' ? 1 : -1;
    return a[sortField] > b[sortField] ? compareValue : -compareValue;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Historial de Servicios</h2>
          <button
            onClick={() => handleSort('creationDate')}
            className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Ordenar por fecha
          </button>
        </div>

        <div className="space-y-4">
          {sortedServices.map((service) => (
            <div
              key={service.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Servicio #{service.id}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(service.status)}`}>
                  {getStatusIcon(service.status)} {service.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="text-gray-600">
                  <p>
                    <strong>Cliente:</strong> {service.user.firstName || 'Usuario desconocido'}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {service.user.phone || 'Teléfono desconocido'}
                  </p>
                </div>

                <div className="text-gray-600">
                  <MapPin className="w-4 h-4 inline-block mr-2" />
                  <strong>Dirección:</strong> {service.locationAddress || 'Sin dirección'}
                </div>

                <div className="text-gray-600">
                  <strong>Latitud:</strong> {service.locationLatitude || 'No disponible'}<br />
                  <strong>Longitud:</strong> {service.locationLongitude || 'No disponible'}
                </div>

                {service.startDate && (
                  <div className="text-gray-600">
                    <Clock className="w-4 h-4 inline-block mr-2" />
                    <strong>Inicio:</strong> {formatDate(service.startDate)}
                  </div>
                )}

                {service.endDate && (
                  <div className="text-gray-600">
                    <Clock className="w-4 h-4 inline-block mr-2" />
                    <strong>Fin:</strong> {formatDate(service.endDate)}
                  </div>
                )}
              </div>

              {(service.photoBefore || service.photoAfter) && (
                <div className="mt-4 flex gap-4">
                  {service.photoBefore && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Antes</p>
                      <img
                        src={service.photoBefore}
                        alt="Antes del servicio"
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  {service.photoAfter && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Después</p>
                      <img
                        src={service.photoAfter}
                        alt="Después del servicio"
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesHistory;