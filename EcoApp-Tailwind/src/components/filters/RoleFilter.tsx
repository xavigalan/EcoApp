import React from 'react';
import { Users, UserCheck, Briefcase, Recycle, Leaf } from 'lucide-react';

interface RoleFilterProps {
  selectedRoles: number[];
  onRoleToggle: (roleId: number) => void;
}

const RoleFilter: React.FC<RoleFilterProps> = ({ selectedRoles, onRoleToggle }) => {
  const roleFilters = [
    { id: 1, name: 'Waste Collectors', icon:Recycle  },
    { id: 2, name: 'Gardeners', icon: Leaf },
    { id: 3, name: 'Customers', icon: Users },
    { id: 4, name: 'Managers', icon: Briefcase },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {roleFilters.map((role) => {
        const Icon = role.icon;
        const isSelected = selectedRoles.includes(role.id);
        
        return (
          <button
            key={role.id}
            onClick={() => onRoleToggle(role.id)}
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              isSelected
                ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {role.name}
            {isSelected && <UserCheck className="w-4 h-4 ml-2" />}
          </button>
        );
      })}
    </div>
  );
};

export default RoleFilter;
