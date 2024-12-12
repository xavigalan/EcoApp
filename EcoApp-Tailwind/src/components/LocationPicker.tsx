import { useState } from 'react';
import { LocationMode } from '../types';
import { searchAddress } from '../services/geocoding';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

type LocationPickerProps = {
  mode: LocationMode;
  onModeChange: (mode: LocationMode) => void;
  onLocationSelect: (lat: number, lng: number) => void;
};

export function LocationPicker({ mode, onModeChange, onLocationSelect }: LocationPickerProps) {
  const [address, setAddress] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{
    display_name: string;
    lat: number;
    lon: number;
  }>>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleAddressSearch = async () => {
    if (!address.trim()) return;
    
    setIsSearching(true);
    try {
      const results = await searchAddress(address);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching address:', error);
    } finally {
      setIsSearching(false);
    }
  };
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-700">
        {t('type.location')}
        </label>
        <select 
          value={mode}
          onChange={(e) => onModeChange(e.target.value as LocationMode)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="current"> {t('type.actual')}</option>
          <option value="map">{t('type.click')}</option>
          <option value="manual">{t('type.buscar')}</option>
        </select>
      </div>

      {mode === 'manual' && (
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddressSearch()}
              placeholder="Enter address or location"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <button
              onClick={handleAddressSearch}
              disabled={isSearching}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {isSearching && (
            <div className="text-sm text-gray-500">
              Searching...
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="border rounded-md divide-y">
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onLocationSelect(result.lat, result.lon);
                    setSearchResults([]);
                    setAddress(result.display_name);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                >
                  <p className="text-sm">{result.display_name}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}