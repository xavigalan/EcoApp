import React, { useEffect, useState } from 'react';
import { MapPoint, TypePoint } from '../../types/MapPoints';
import { Loader2, Map as MapIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import AddMapPointButton from './AddMapPointButton';
import MapPointCard from './MapPointCard';
import MapPointSearchBar from '../filters/MapPointSearchBar';
import TypePointFilter from '../filters/TyePointFilter';
import { fetchMapPoints, deleteMapPoint } from '../../api/mappoints';

const MapPointsList = () => {
  const [mapPoints, setMapPoints] = useState<MapPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
  const [types, setTypes] = useState<TypePoint[]>([]);

  const loadMapPoints = async () => {
    try {
      const data = await fetchMapPoints();
      setMapPoints(data);

      // Extract unique types from map points
      const uniqueTypes = Array.from(
        new Set(data.map(point => JSON.stringify(point.typePoint)))
      ).map(type => JSON.parse(type));

      setTypes(uniqueTypes);
      setSelectedTypes(uniqueTypes.map(type => type.id));
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
      loadMapPoints();
    } catch (error) {
      console.error('Error deleting location:', error);
      toast.error('Failed to delete location');
    }
  };
  const handleUpdate = async (id: number) => {
    try {
      await loadMapPoints(); // Recargar los puntos del mapa tras una actualización
      toast.success('Location updated successfully');
    } catch (error) {
      console.error('Error updating location:', error);
      toast.error('Failed to update location');
    }
  };

  const handleTypeToggle = (typeId: number) => {
    setSelectedTypes(prev => {
      if (prev.includes(typeId)) {
        if (prev.length === 1) return prev;
        return prev.filter(id => id !== typeId);
      }
      return [...prev, typeId];
    });
  };

  const filteredMapPoints = mapPoints.filter(point => {
    const matchesSearch = (
      point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      point.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      point.typePoint.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesType = selectedTypes.includes(point.typePoint.id);
    return matchesSearch && matchesType;
  });

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

        <div className="mb-8">
          <TypePointFilter
            selectedTypes={selectedTypes}
            onTypeToggle={handleTypeToggle}
            types={types}
          />
          <MapPointSearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMapPoints.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <MapIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No locations found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            filteredMapPoints.map((point) => (
              <MapPointCard
                key={point.id}
                point={point}
                types={types} // Pasar la lista de tipos
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MapPointsList;