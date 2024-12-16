import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, MapPin } from 'lucide-react';
import { toast } from 'react-toastify';
import { TypePoint } from '../../types/MapPoints';
import FormInput from '../forms/FormInput';
import TypePointSelect from './TypePointSelect';
import { fetchTypePoints } from '../../api/TypePoints';

import { PointFormData } from '../../types/MapPoints';

const initialFormData: PointFormData = {
  name: '',
  typeId: '', // Cambiado de typePointId a typeId
  latitude: 0,
  longitude: 0,
  description: '',
};

const AddMapPointForm = () => {
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
        toast.error('Failed to load location types');
      }
    };

    loadTypePoints();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const { latitude, longitude, name, typeId, description } = formData;
  
    // Validar campos requeridos
    if (!name || !description || !typeId) {
      toast.error('Please fill out all required fields.');
      return;
    }
  
    // Validar latitud y longitud
    if (latitude === null || longitude === null || isNaN(latitude) || isNaN(longitude)) {
      toast.error('Latitude and Longitude must be valid numbers.');
      return;
    }
  
    if (latitude < -90 || latitude > 90) {
      toast.error('Latitude must be between -90 and 90.');
      return;
    }
  
    if (longitude < -180 || longitude > 180) {
      toast.error('Longitude must be between -180 and 180.');
      return;
    }
  
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
  
      const requestOptions = {
        method: 'PUT', // Cambiado de 'PUT' a 'POST' para crear un nuevo mapa
        headers: myHeaders,
        body: JSON.stringify(formData),
      };
  
      const response = await fetch('http://localhost:8080/mappoints', requestOptions); // Asegúrate de que esta URL sea la correcta
  
      if (!response.ok) {
        throw new Error(`Failed to create location. Status: ${response.status}`);
      }
  
      toast.success('Location created successfully!');
      navigate('/points');
    } catch (error) {
      console.error('Error creating location:', error);
      toast.error('Failed to create location');
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
            Back to Map Points
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Create Location</h2>
            <MapPin className="w-8 h-8 text-green-500" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormInput
                label="Location Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
              />

              <TypePointSelect
                typePoints={typePoints}
                value={String(formData.typeId)} // Aseguramos que el valor sea un string
                onChange={handleChange}
              />

              <FormInput
                label="Latitude"
                name="latitude"
                type="number"
                value={formData.latitude || ''} // Manejar null
                onChange={handleChange}
              />

              <FormInput
                label="Longitude"
                name="longitude"
                type="number"
                value={formData.longitude || ''} // Manejar null
                onChange={handleChange}
              />

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
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
                Save Location
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMapPointForm;
