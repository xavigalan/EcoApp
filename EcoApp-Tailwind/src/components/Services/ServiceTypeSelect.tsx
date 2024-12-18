import React from 'react';
import { ServiceType } from '../../types/service';

interface ServiceTypeSelectProps {
  Servicetype: ServiceType[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ServiceTypeSelect: React.FC<ServiceTypeSelectProps> = ({ Servicetype = [], value, onChange }) => {
  return (
    <div>
      <label htmlFor="serviceType" className="block text-sm font-medium text-gray-900">
        Service Type
      </label>
      <select
        id="serviceType"
        name="typeId"  // Asegúrate de que el 'name' coincide con el que usas en el estado
        value={value}  // Usamos 'value' tal como está, sin conversión
        onChange={onChange}
        required
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm"
      >
        <option value="">Select a type</option>
        {Servicetype.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ServiceTypeSelect;
