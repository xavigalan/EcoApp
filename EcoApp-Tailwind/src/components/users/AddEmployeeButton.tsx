import React from 'react';
import { UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AddEmployeeButton = () => {
  const { t } = useTranslation();

  return (
    <Link
      to="/add/employees"
      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm"
    >
      <UserPlus className="w-5 h-5 mr-2" />
      {t('employees.addNew')} {/* Usando la traducción aquí */}
    </Link>
  );
};

export default AddEmployeeButton;
