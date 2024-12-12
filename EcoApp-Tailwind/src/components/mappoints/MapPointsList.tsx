import React, { useEffect, useState } from 'react';
import { MapPoint } from '../../types/MapPoints';
import { Loader2, Map as MapIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import AddMapPointButton from './AddMapPointButton';
import MapPointCard from './MapPointCard';
import { fetchMapPoints, deleteMapPoint } from '../../utils/api';

const MapPointsList = () => {
  const [mapPoints, setMapPoints] = useState<MapPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadMapPoints = async () => {
    try {
      const data = await fetchMapPoints();
      setMapPoints(data);
    } catch (error) {
      console.error("Error fetching map points:", error);
      toast.error('Failed to load locations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMapPoints();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteMapPoint(id);
      toast.success('Location deleted successfully');
      loadMapPoints(); // Reload the list
    } catch (error) {
      console.error('Error deleting location:', error);
      toast.error('Failed to delete location');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Map Points</h2>
            <p className="mt-2 text-gray-600">Manage your map locations</p>
          </div>
          <div className="flex items-center space-x-4">
            <AddMapPointButton />
            <MapIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mapPoints.map((point) => (
            <MapPointCard
              key={point.id}
              point={point}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapPointsList;