import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User } from '../types/user';

interface UserMenuProps {
  isLoggedIn: boolean;
  userProfile: User | null;
  onProfileClick: () => void;
  onLogout: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  isLoggedIn,
  userProfile,
  onProfileClick,
  onLogout,
}) => {
  const { t } = useTranslation();

  if (!isLoggedIn) {
    return (
      <>
        <Link to="/login" className="text-white hover:bg-green-700 p-2 rounded-md text-sm font-medium">
          {t('nav.login')}
        </Link>
        <Link to="/register" className="text-white hover:bg-green-700 p-2 rounded-md text-sm font-medium">
          {t('nav.register')}
        </Link>
      </>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div
        className="h-10 w-10 rounded-full bg-green-700 flex items-center justify-center cursor-pointer text-white font-semibold"
        onClick={onProfileClick}
      >
        {userProfile?.firstName?.charAt(0) || '?'}
      </div>
      <button
        onClick={onLogout}
        className="text-white hover:bg-red-700 p-2 rounded-md text-sm font-medium"
      >
        {t('nav.logout')}
      </button>
    </div>
  );
};