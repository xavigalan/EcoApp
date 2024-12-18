import React from 'react';
import { TypePoint } from '../../types/MapPoints';
import { useTranslation } from 'react-i18next'; // Importa el hook de i18next

interface TypePointSelectProps {
  typePoints: TypePoint[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const { t } = useTranslation(); // Usamos el hook para la traducción

const TypePointSelect: React.FC<TypePointSelectProps> = ({ typePoints = [], value, onChange }) => {
  return (
    <div>
      <label htmlFor="typePointId" className="block text-sm font-medium text-gray-900">
        {t("labels.selectTipo")}
      </label>
      <select
        id="typePointId"
        name="typeId"  // Asegúrate de que el 'name' coincide con el que usas en el estado
        value={value}  // Usamos 'value' tal como está, sin conversión
        onChange={onChange}
        required
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm"
      >
        <option value="">Select a type</option>
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
