import React from 'react';
import { MapPinPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AddMapPointButton = () => {
    const { t } = useTranslation();
  
  return (
    <Link
      to="/add/mappoint"
      className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 shadow-sm"
    >
      <MapPinPlus className="w-5 h-5 mr-2" />
      {t('buttons.createLocation')}
    </Link>
  );
};

export default AddMapPointButton;