import React from 'react';
import { TypePoint } from '../../types/MapPoints';

interface TypePointFilterProps {
  selectedTypes: number[];
  onTypeToggle: (typeId: number) => void;
  types: TypePoint[];
}

const TypePointFilter: React.FC<TypePointFilterProps> = ({ selectedTypes, onTypeToggle, types }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {types.map((type) => (
        <button
          key={type.id}
          onClick={() => onTypeToggle(type.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedTypes.includes(type.id)
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {type.name}
        </button>
      ))}
    </div>
  );
};

export default TypePointFilter;