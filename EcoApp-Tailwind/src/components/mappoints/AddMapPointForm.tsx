import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, MapPin } from 'lucide-react';
import { toast } from 'react-toastify';
import { TypePoint } from '../../types/MapPoints';
import FormInput from '../forms/FormInput';
import TypePointSelect from './TypePointSelect';
import { fetchTypePoints } from '../../api/TypePoints';
import { PointFormData } from '../../types/MapPoints';
import { useTranslation } from 'react-i18next'; // Importa el hook de i18next

const initialFormData: PointFormData = {
  name: '',
  typeId: 0, // Cambiado de typePointId a typeId
  latitude: 0,
  longitude: 0,
  description: '',
};

const AddMapPointForm = () => {
  const { t } = useTranslation(); // Usamos el hook para la traducción
  const navigate = useNavigate();
  const [typePoints, setTypePoints] = useState<TypePoint[]>([]);
  const [formData, setFormData] = useState<PointFormData>(initialFormData);

  useEffect(() => {
    const loadTypePoints = async () => {
      try {
        const data = await fetchTypePoints();
        setTypePoints(data);
      } catch (error) {
        console.error('Error fetching type points:', error);
        toast.error(t('messages.failedToLoadTypes')); // Usamos la traducción aquí
      }
    };

    loadTypePoints();
  }, [t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const { latitude, longitude, name, typeId, description } = formData;
  
    // Validar campos requeridos
    if (!name || !description || !typeId) {
      toast.error(t('messages.fillRequiredFields')); // Usamos la traducción aquí
      return;
    }
  
    // Validar latitud y longitud
    if (latitude === null || longitude === null || isNaN(latitude) || isNaN(longitude)) {
      toast.error(t('messages.invalidCoordinates')); // Usamos la traducción aquí
      return;
    }
  
    if (latitude < -90 || latitude > 90) {
      toast.error(t('messages.invalidLatitude')); // Usamos la traducción aquí
      return;
    }
  
    if (longitude < -180 || longitude > 180) {
      toast.error(t('messages.invalidLongitude')); // Usamos la traducción aquí
      return;
    }
  
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
  
      const requestOptions = {
        method: 'POST', // Asegúrate de usar POST para crear el punto en vez de PUT
        headers: myHeaders,
        body: JSON.stringify(formData),
      };
  
      const response = await fetch('http://localhost:8080/mappoints', requestOptions);
  
      if (!response.ok) {
        throw new Error(t('messages.failedToCreateLocation')); // Usamos la traducción aquí
      }
  
      toast.success(t('messages.createSuccess')); // Usamos la traducción aquí
      navigate('/points');
    } catch (error) {
      console.error('Error creating location:', error);
      toast.error(t('messages.failedToCreateLocation')); // Usamos la traducción aquí
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'latitude' || name === 'longitude' ? parseFloat(value) || null : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/mappoints')}
            className="inline-flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('buttons.backToMapPoints')} {/* Traducción del botón */}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{t('form.createLocation')}</h2> {/* Traducción del título */}
            <MapPin className="w-8 h-8 text-green-500" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormInput
                label={t('labels.locationName')} // Traducción de "Location Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
              />

              <TypePointSelect
                typePoints={typePoints}
                value={String(formData.typeId)} // Aseguramos que el valor sea un string
                onChange={handleChange}
                placeholder={t('placeholders.locationType')} // Traducción para el placeholder
              />

              <FormInput
                label={t('labels.latitude')} // Traducción de "Latitude"
                name="latitude"
                type="number"
                value={formData.latitude || ''} // Manejar null
                onChange={handleChange}
              />

              <FormInput
                label={t('labels.longitude')} // Traducción de "Longitude"
                name="longitude"
                type="number"
                value={formData.longitude || ''} // Manejar null
                onChange={handleChange}
              />

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">{t('labels.description')}</label> {/* Traducción de "Description" */}
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
                {t('form.saveLocation')} {/* Traducción de "Save Location" */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMapPointForm;
