import { useState } from 'react';
import { TreePine, Sofa, CalendarDays, Trash2 } from 'lucide-react';
import { ReportType, LocationMode } from '../types';
import { LocationPicker } from './LocationPicker';

type ReportFormProps = {
  onLocationModeChange: (mode: LocationMode) => void;
  onLocationSelect: (lat: number, lng: number) => void;
  onSubmit: (data: { type: ReportType; description: string; image?: File }) => void;
};

export function ReportForm({ onLocationModeChange, onLocationSelect, onSubmit }: ReportFormProps) {
  const [reportType, setReportType] = useState<ReportType>('tree');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [locationMode, setLocationMode] = useState<LocationMode>('current');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type: reportType,
      description,
      image: image || undefined,
    });
  };

  const handleLocationModeChange = (mode: LocationMode) => {
    setLocationMode(mode);
    onLocationModeChange(mode);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">Report Type</label>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setReportType('tree')}
            className={`flex items-center justify-center p-3 border rounded-md ${
              reportType === 'tree' ? 'border-green-500 bg-green-50' : 'border-gray-300'
            }`}
          >
            <TreePine className="mr-2" /> Tree
          </button>
          <button
            type="button"
            onClick={() => setReportType('furniture')}
            className={`flex items-center justify-center p-3 border rounded-md ${
              reportType === 'furniture' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
          >
            <Sofa className="mr-2" /> Furniture
          </button>
          <button
            type="button"
            onClick={() => setReportType('event')}
            className={`flex items-center justify-center p-3 border rounded-md ${
              reportType === 'event' ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
            }`}
          >
            <CalendarDays className="mr-2" /> Event
          </button>
          <button
            type="button"
            onClick={() => setReportType('trash')}
            className={`flex items-center justify-center p-3 border rounded-md ${
              reportType === 'trash' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300'
            }`}
          >
            <Trash2 className="mr-2" /> Trash Bin
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image (optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="mt-1 block w-full"
        />
      </div>

      <LocationPicker
        mode={locationMode}
        onModeChange={handleLocationModeChange}
        onLocationSelect={onLocationSelect}
      />

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit Report
      </button>
    </form>
  );
}
export default ReportForm;
