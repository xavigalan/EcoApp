import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'es', name: 'Español' },
    { code: 'ca', name: 'Català' },
    { code: 'ar', name: 'العربية' },
    { code: 'en', name: 'English' }
  ];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode); // Cambia el idioma
    document.dir = langCode === 'ar' ? 'rtl' : 'ltr'; // Cambia la dirección de la página
    setIsOpen(false);
  };

  // Cierra el dropdown si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`flex items-center space-x-1 text-white p-2 rounded-md text-sm font-medium ${isOpen ? 'bg-green-700' : 'hover:bg-green-700'}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Globe size={20} />
        <span>{languages.find(lang => lang.code === i18n.language)?.name || 'Español'}</span>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out ${isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'} z-10`}
      >
        <div className="py-1" role="menu" aria-orientation="vertical">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`block px-4 py-2 text-sm w-full text-left ${i18n.language === lang.code ? 'bg-green-50 text-green-800' : 'text-gray-700'} hover:bg-green-100`}
              role="menuitem"
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
