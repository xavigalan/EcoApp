import React from 'react';
import { TypePoint } from '../../types/MapPoints';
import { useTranslation } from 'react-i18next';

interface TypePointSelectProps {
  typePoints: TypePoint[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TypePointSelect: React.FC<TypePointSelectProps> = ({ typePoints = [], value, onChange }) => {
  const { t } = useTranslation();

  return (
    <div>
      <label htmlFor="typePointId" className="block text-sm font-medium text-gray-900">
        {t('labels.locationType')}
      </label>
      <select
        id="typePointId"
        name="typeId" // Make sure 'name' matches what you use in the state
        value={value} // Use 'value' as it is, without conversion
        onChange={onChange}
        required
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm"
      >
        <option value="">{t('placeholders.locationType')}</option>
        {typePoints.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TypePointSelect;
