import React from 'react';
import { Link } from 'react-router-dom';

interface NavLogoProps {
  onClick: () => void;
}

export const NavLogo: React.FC<NavLogoProps> = ({ onClick }) => (
  <div className="flex-shrink-0 drop-shadow-yellow-glow">
    <Link to="/" onClick={onClick} className="flex items-center space-x-2">
      <img alt="EcoApp" src="/images/LogoSolo.png" className="h-10 w-auto" />
      <span className="text-xl text-orange-300 font-semibold text-gray-900">EcoApp</span>
    </Link>
  </div>
);