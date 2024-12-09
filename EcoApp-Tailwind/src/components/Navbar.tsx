import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import ProfileModal from "./ProfileModal";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { t } = useTranslation();
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    profilePicture: "",
  });

  useEffect(() => {
    const userSession = Cookies.get("userSession");

    if (userSession) {
      setIsLoggedIn(true);
      
      const fetchUserData = async () => {
        try {
          const response = await fetch("http://localhost:8080/user/profile", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${Cookies.get("userSession")}`,
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("No se pudo obtener el perfil del usuario");
          }

          const data = await response.json();
          setUserProfile({
            name: data.name,
            email: data.email,
            profilePicture: data.profilePicture || "/images/default-avatar.png",
          });
        } catch (error) {
          console.error("Error al obtener los datos del usuario:", error);
        }
      };

      fetchUserData();
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("userSession");
    setIsLoggedIn(false);
    setUserProfile({
      name: "",
      email: "",
      profilePicture: "",
    });
    setIsOpen(false);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-green-800 text-white">
      <div className="px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 drop-shadow-yellow-glow">
            <Link to="/" onClick={handleLinkClick} className="flex items-center space-x-2">
              <img alt="EcoApp" src="/images/LogoSolo.png" className="h-10 w-auto" />
              <span className="text-xl text-orange-300 font-semibold text-gray-900">EcoApp</span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-12">
            <a href="/services" className="text-white hover:text-white hover:bg-green-700 p-2 rounded-md text-sm font-medium">
              {t('nav.services')}
            </a>
            <a href="/about" className="text-white hover:text-white hover:bg-green-700 p-2 rounded-md text-sm font-medium">
              {t('nav.notice')}
            </a>
            <a href="/contact" className="text-white hover:text-white hover:bg-green-700 p-2 rounded-md text-sm font-medium">
              {t('nav.contact')}
            </a>
            <a href="/about" className="text-white hover:text-white hover:bg-green-700 p-2 rounded-md text-sm font-medium">
              {t('nav.employees')}
            </a>
            <a href="/about" className="text-white hover:text-white hover:bg-green-700 p-2 rounded-md text-sm font-medium">
              {t('nav.points')}
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <LanguageSelector />
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <img
                  src={userProfile.profilePicture}
                  alt="User Profile"
                  className="h-10 w-10 rounded-full border-2 border-white cursor-pointer"
                  onClick={() => setIsOpen(true)} // Abre el modal al hacer click
                />
                <button
                  onClick={handleLogout}
                  className="text-white hover:bg-red-700 p-2 rounded-md text-sm font-medium"
                >
                  {t('nav.logout')}
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-white hover:bg-green-700 p-2 rounded-md text-sm font-medium">
                  {t('nav.login')}
                </Link>
                <Link to="/register" className="text-white hover:bg-green-700 p-2 rounded-md text-sm font-medium">
                  {t('nav.register')}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSelector />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md bg-green-800 text-white hover:text-white hover:bg-green-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Links with Animation */}
      <div
        className={`${isOpen ? "max-h-screen opacity-100 visibility-visible" : "max-h-0 opacity-0 visibility-hidden pointer-events-none"} transition-all ease-in-out duration-300 md:hidden bg-green-800`}
        style={{
          position: "fixed",
          zIndex: 10,
          width: "100%",
        }}
      >
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link to="/services" className="text-white block px-3 p-2 rounded-md text-base font-medium hover:text-white hover:bg-green-700" onClick={handleLinkClick}>
            {t('nav.services')}
          </Link>
          <a href="/about" className="text-white block px-3 p-2 rounded-md text-base font-medium hover:text-white hover:bg-green-700" onClick={handleLinkClick}>
            {t('nav.notice')}
          </a>
          <a href="/contact" className="text-white block px-3 p-2 rounded-md text-base font-medium hover:text-white hover:bg-green-700" onClick={handleLinkClick}>
            {t('nav.contact')}
          </a>
          <a href="/about" className="text-white block px-3 p-2 rounded-md text-base font-medium hover:text-white hover:bg-green-700" onClick={handleLinkClick}>
            {t('nav.employees')}
          </a>
          <a href="/about" className="text-white block px-3 p-2 rounded-md text-base font-medium hover:text-white hover:bg-green-700" onClick={handleLinkClick}>
            {t('nav.points')}
          </a>
        </div>

        <div className="border-t border-white mt-2"></div>
        {isLoggedIn ? (
          <div className="flex flex-col items-center justify-center px-3 py-2">
            <img
              src={userProfile.profilePicture}
              alt="User Profile"
              className="h-10 w-10 rounded-full border-2 border-white cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
            <button
              onClick={handleLogout}
              className="block text-center text-white mt-2 p-2 rounded-md text-sm font-medium justify-center items-center hover:bg-red-700"
            >
              {t('nav.logout')}
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-green-700" onClick={handleLinkClick}>
              {t('nav.login')}
            </Link>
            <Link to="/register" className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-green-700" onClick={handleLinkClick}>
              {t('nav.register')}
            </Link>
          </>
        )}
      </div>
      <ProfileModal isOpen={isOpen} onClose={() => setIsOpen(false)} user={userProfile} />
    </nav>
  );
};

export default Navbar;
