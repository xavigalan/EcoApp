import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, MapPin } from 'lucide-react';
import { toast } from 'react-toastify';
import { ServiceType } from '../../types/service';
import FormInput from '../forms/FormInput';
import ServiceTypeSelect from './ServiceTypeSelect';
import { fetchTypePoints } from '../../api/TypePoints';
import { useTranslation } from 'react-i18next';
import { ServiceFormData } from '../../types/service';

const initialFormData: ServiceFormData = {
  serviceTypeId: 0,
  description: '',
  locationLatitude: 0,
  locationLongitude: 0,
  locationAddress: "",
  startDate: null,
  endDate: null,
  photoBefore: null,
  photoAfter: null,
  creationDate: new Date().toISOString(), // Fecha de creación actual
  status: 'pending', // Valor predeterminado
};

const AddServiceForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [serviceType, setServices] = useState<ServiceType[]>([]);
  const [formData, setFormData] = useState<ServiceFormData>(initialFormData);

  useEffect(() => {
    const loadServiceTypes = async () => {
      try {
        const data = await fetchTypePoints();
        setServices(data);
      } catch (error) {
        console.error('Error fetching type points:', error);
        toast.error('Failed to load location types');
      }
    };

    loadServiceTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { serviceTypeId, description, locationLatitude, locationLongitude } = formData;

    // Validar campos requeridos
    if (!serviceTypeId || !description) {
      toast.error('Please fill out all required fields.');
      return;
    }

    // Validar latitud y longitud
    if (isNaN(locationLatitude) || isNaN(locationLongitude)) {
      toast.error('Latitude and Longitude must be valid numbers.');
      return;
    }

    if (locationLatitude < -90 || locationLatitude > 90) {
      toast.error('Latitude must be between -90 and 90.');
      return;
    }

    if (locationLongitude < -180 || locationLongitude > 180) {
      toast.error('Longitude must be between -180 and 180.');
      return;
    }

    try {
      const requestOptions = {
        method: 'POST', // Cambiado a 'POST' para crear un nuevo servicio
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      };

      const response = await fetch('http://localhost:8080/services', requestOptions); // Asegúrate de que esta URL sea correcta

      if (!response.ok) {
        throw new Error(`Failed to create service. Status: ${response.status}`);
      }

      toast.success('Service created successfully!');
      navigate('/services');
    } catch (error) {
      console.error('Error creating service:', error);
      toast.error('Failed to create service');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'locationLatitude' || name === 'locationLongitude' ? parseFloat(value) || 0 : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/services')}
            className="inline-flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('buttons.backToServices')}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{t('form.createService')}</h2>
            <MapPin className="w-8 h-8 text-green-500" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormInput
                label={t('labels.locationName')}
                name="locationAddress"
                type="text"
                value={formData.locationAddress}
                onChange={handleChange}
              />

              <ServiceTypeSelect
                serviceType={serviccdeType}
                value={String(formData.serviceTypeId)}
                onChange={handleChange}
              />

              <FormInput
                label={t('labels.latitude')}
                name="locationLatitude"
                type="number"
                value={formData.locationLatitude || ''}
                onChange={handleChange}
              />

              <FormInput
                label={t('labels.longitude')}
                name="locationLongitude"
                type="number"
                value={formData.locationLongitude || ''}
                onChange={handleChange}
              />

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">{t('labels.description')}</label>
                <textarea
                  name="description"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 shadow-sm"
              >
                <Save className="w-5 h-5 mr-2" />
                {t('form.saveService')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddServiceForm;
