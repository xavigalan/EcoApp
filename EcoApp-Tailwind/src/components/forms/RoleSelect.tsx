import React from 'react';
import { Role } from '../../types/User';
import { useTranslation } from 'react-i18next';

interface RoleSelectProps {
  roles: Role[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

const RoleSelect: React.FC<RoleSelectProps> = ({
  roles,
  value,
  onChange,
  error,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <label htmlFor="roleId" className="block text-sm font-medium text-gray-900">
        {t('employees.role')}
      </label>
      <select
        id="roleId"
        name="roleId"
        value={value}
        onChange={onChange}
        className={`mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
          error ? 'ring-red-300' : 'ring-gray-300'
        } focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm`}
      >
        <option value="">{t('employees.selectRole')}</option>
        {roles.map((role) => (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default RoleSelect;