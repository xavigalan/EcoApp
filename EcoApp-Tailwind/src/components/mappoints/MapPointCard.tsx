import React, { useState } from 'react';
import { MapPoint, MapPointUpdateDTO, TypePoint } from '../../types/MapPoints';
import { MapPin, Navigation, Info, Map as MapIcon, Edit2, Trash2, X, Check } from 'lucide-react';
import { toast } from 'react-toastify';
import { updateMapPoint } from '../../api/mappoints';
import TypePointSelect from './TypePointSelect';

interface MapPointCardProps {
  point: MapPoint;
  types: TypePoint[];
  onDelete: (id: number) => Promise<void>;
  onUpdate: (id: number, updatedPoint: MapPoint) => void;
}

const MapPointCard: React.FC<MapPointCardProps> = ({ point, types, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<MapPointUpdateDTO>({
    name: point.name,
    latitude: point.latitude,
    longitude: point.longitude,
    description: point.description,
    typeId: point.typePoint.id
  });
  

  const handleEdit = async () => {
    if (isEditing) {
      try {
        await updateMapPoint(point.id, editData);
        const updatedPoint = {
          ...point,
          ...editData,
          typePoint: types.find(t => t.id === editData.typeId)!
        };
        onUpdate(point.id, updatedPoint);
        toast.success('Location updated successfully');
        setIsEditing(false);
      } catch (error) {
        toast.error('Failed to update location');
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      try {
        await onDelete(point.id);
        toast.success('Location deleted successfully');
      } catch (error) {
        toast.error('Failed to delete location');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.name === 'latitude' || e.target.name === 'longitude'
      ? parseFloat(e.target.value)
      : e.target.value;

    setEditData({
      ...editData,
      [e.target.name]: value
    });
  };
  
  const handleTypeChange = (typeId: number) => {
    setEditData((prev) => ({
      ...prev,
      typeId: typeId, // Actualiza el campo typeId correctamente
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={`https://source.unsplash.com/400x400/?location,${point.typePoint.name}&sig=${point.id}`}
          alt={point.name}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editData.name}
              onChange={handleChange}
              className="flex-1 mr-4 px-2 py-1 border rounded"
              placeholder="Location Name"
            />
          ) : (
            <h3 className="text-xl font-semibold text-gray-900">
              {point.name}
            </h3>
          )}
          {isEditing ? (
            <TypePointSelect
              typePoints={types || []}
              value={editData.typeId.toString()} // Convertimos a string para el select
              onChange={(e) => handleTypeChange(parseInt(e.target.value))}
            />
          ) : (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <MapPin className="w-4 h-4 mr-1" />
              {point.typePoint.name}
            </span>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Navigation className="w-4 h-4 mr-2" />
            {isEditing ? (
              <div className="flex-1 space-x-2">
                <input
                  type="number"
                  name="latitude"
                  value={editData.latitude}
                  onChange={handleChange}
                  className="w-[calc(50%-0.25rem)] px-2 py-1 border rounded"
                  placeholder="Latitude"
                  step="any"
                />
                <input
                  type="number"
                  name="longitude"
                  value={editData.longitude}
                  onChange={handleChange}
                  className="w-[calc(50%-0.25rem)] px-2 py-1 border rounded"
                  placeholder="Longitude"
                  step="any"
                />
              </div>
            ) : (
              <span className="text-sm">
                {point.latitude.toFixed(6)}, {point.longitude.toFixed(6)}
              </span>
            )}
          </div>

          <div className="flex items-center text-gray-600">
            <Info className="w-4 h-4 mr-2" />
            {isEditing ? (
              <textarea
                name="description"
                value={editData.description}
                onChange={handleChange}
                className="flex-1 px-2 py-1 border rounded"
                placeholder="Description"
                rows={2}
              />
            ) : (
              <span className="text-sm">{point.description}</span>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            {!isEditing && (
              <a
                href={`https://www.google.com/maps?q=${point.latitude},${point.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <MapIcon className="w-4 h-4 mr-1" />
                View on Maps
              </a>
            )}
              <div className="flex items-center space-x-2 ml-auto">
                <button
                  onClick={handleEdit}
                  className={`p-2 rounded-full ${isEditing
                    ? 'text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100'
                    : 'text-yellow-600 hover:text-yellow-700 bg-yellow-50 hover:bg-yellow-100'
                    }`}
                  title={isEditing ? 'Save' : 'Edit'}
                >
                  {isEditing ? <Check className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
                </button>
                {isEditing ? (
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditData({
                        name: point.name,
                        latitude: point.latitude,
                        longitude: point.longitude,
                        description: point.description,
                        typeId: point.typePoint.id
                      });
                    }}
                    className="p-2 text-gray-600 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full"
                    title="Cancel"
                  >
                    <X className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleDelete}
                    className="p-2 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-full"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default MapPointCard;
