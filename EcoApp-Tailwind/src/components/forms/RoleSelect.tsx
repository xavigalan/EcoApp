import React from 'react';
import { Role } from '../../types/User';

interface RoleSelectProps {
  roles: Role[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const RoleSelect: React.FC<RoleSelectProps> = ({ roles, value, onChange }) => {
  return (
    <div>
      <label htmlFor="roleId" className="block text-sm font-medium text-gray-900">
        Role
      </label>
      <select
        id="roleId"
        name="roleId"
        value={value}
        onChange={onChange}
        required
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm"
      >
        <option value="">Select a role</option>
        {roles.map((role) => (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RoleSelect;