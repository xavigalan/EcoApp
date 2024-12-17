import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface NavLinksProps {
  onClick?: () => void;
  isMobile?: boolean;
}

export const NavLinks: React.FC<NavLinksProps> = ({ onClick, isMobile = false }) => {
  const { t } = useTranslation();
  const baseClasses = "text-white hover:text-white hover:bg-green-700 p-2 rounded-md text-sm font-medium";
  const mobileClasses = "block px-3 p-2 rounded-md text-base font-medium";

  const links = [
    { to: "/services", label: t('nav.services') },
    { to: "/notice", label: t('nav.notice') },
    { to: "/contact", label: t('nav.contact') },
    !isMobile && { to: "/employees", label: t('nav.employees') },
    !isMobile && { to: "/points", label: t('nav.points') },
  ].filter(Boolean);

  return (
    <div className={isMobile ? "space-y-1 px-2 pb-3 pt-2" : "hidden md:flex space-x-12"}>
      {links.map((link) => 
        link && (
          <Link
            key={link.to}
            to={link.to}
            className={isMobile ? mobileClasses : baseClasses}
            onClick={onClick}
          >
            {link.label}
          </Link>
        )
      )}
    </div>
  );
};