import React from 'react';
import { MapPoint } from '../../types/MapPoints';
import { MapPin, Navigation, Info, Map as MapIcon, Edit2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MapPointCardProps {
  point: MapPoint;
  onDelete: (id: number) => void;
}

const MapPointCard: React.FC<MapPointCardProps> = ({ point, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      onDelete(point.id);
    }
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
          <h3 className="text-xl font-semibold text-gray-900">
            {point.name}
          </h3>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <MapPin className="w-4 h-4 mr-1" />
            {point.typePoint.name}
          </span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Navigation className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {point.latitude.toFixed(6)}, {point.longitude.toFixed(6)}
            </span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Info className="w-4 h-4 mr-2" />
            <span className="text-sm">{point.description}</span>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t">
            <a
              href={`https://www.google.com/maps?q=${point.latitude},${point.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <MapIcon className="w-4 h-4 mr-1" />
              View on Maps
            </a>
            
            <div className="flex items-center space-x-2">
              <Link
                to={`/edit/mappoint/${point.id}`}
                className="p-2 text-yellow-600 hover:text-yellow-700 transition-colors"
                title="Edit"
              >
                <Edit2 className="w-5 h-5" />
              </Link>
              <button
                onClick={handleDelete}
                className="p-2 text-red-600 hover:text-red-700 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MapPointCard;