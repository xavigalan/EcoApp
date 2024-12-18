import { useState } from 'react';
import { TreePine, Sofa, CalendarDays, Trash2 } from 'lucide-react';
import { ReportType, LocationMode } from '../../types';
import { LocationPicker } from '../map/LocationPicker';
import { useTranslation } from 'react-i18next';

type ReportFormProps = {
  onLocationModeChange: (mode: LocationMode) => void;
  onLocationSelect: (lat: number, lng: number) => void;
  onSubmit: (data: { type: ReportType; description: string; image?: File }) => void;
  onReportTypeChange: (type: ReportType) => void;

};

export function ReportForm({ onLocationModeChange, onLocationSelect, onSubmit, onReportTypeChange }: ReportFormProps) {
  const [reportType, setReportType] = useState<ReportType>('tree');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [locationMode, setLocationMode] = useState<LocationMode>('current');

  const handleReportTypeChange = (type: ReportType) => {
    setReportType(type);
    onReportTypeChange(type);
  };

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
  const { t } = useTranslation();

  {t('nav.services')}

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">{t('type.reporte')}  </label>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleReportTypeChange('tree')}
            className={`flex items-center justify-center p-3 border rounded-md ${reportType === 'tree' ? 'border-green-500 bg-green-50' : 'border-gray-300'
              }`}

          >
            <TreePine className="mr-2" />{t('type.tree')}    </button>
          <button
            type="button"
            onClick={() => handleReportTypeChange('furniture')}
            className={`flex items-center justify-center p-3 border rounded-md ${reportType === 'furniture' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
          >
            <Sofa className="mr-2" /> {t('type.furniture')}
          </button>
          <button
            type="button"
            onClick={() => handleReportTypeChange('event')}
            className={`flex items-center justify-center p-3 border rounded-md ${reportType === 'event' ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
              }`}
          >
            <CalendarDays className="mr-2" /> {t('type.event')}
          </button>
          <button
            type="button"
            onClick={() => handleReportTypeChange('trash')}
            className={`flex items-center justify-center p-3 border rounded-md ${reportType === 'trash' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300'
              }`}
          >
            <Trash2 className="mr-2" /> {t('type.trash')}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700"> {t('type.description')}</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">{t('type.image')}</label>
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
        {t('type.enviar')}
      </button>
    </form>
  );
}

export default ReportForm;