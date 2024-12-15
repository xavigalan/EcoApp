import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, MapPin } from 'lucide-react';
import { toast } from 'react-toastify';
import { TypePoint } from '../../types/MapPoints';
import FormInput from '../forms/FormInput';
import TypePointSelect from './TypePointSelect';
import { createMapPoint } from '../../api/mappoints';
import { fetchTypePoints } from '../../api/TypePoints';

import { PointFormData } from '../../types/MapPoints';

const initialFormData: PointFormData = {
  name: '',
  typePointId: '',
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
    try {
      await createMapPoint(formData);
      toast.success('Location created successfully!');
      navigate('/mappoints');
    } catch (error) {
      console.error('Error creating location:', error);
      toast.error('Failed to create location');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
            <h2 className="text-2xl font-bold text-gray-900">Add New Location</h2>
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
                value={formData.typePointId}
                onChange={handleChange}
              />

              <FormInput
                label="Latitude"
                name="latitude"
                type="number"
                value={formData.latitude}
                onChange={handleChange}
              />

              <FormInput
                label="Longitude"
                name="longitude"
                type="number"
                value={formData.longitude}
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