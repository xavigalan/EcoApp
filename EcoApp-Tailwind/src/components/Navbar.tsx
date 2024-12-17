import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import ProfileModal from "./ProfileModal";
import { UserWithRoleDTO } from "../types/User";
import { useTheme } from '../context/ThemeContext'; // Asegúrate de que esta importación sea correcta
import { Sun, Moon } from 'react-feather';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { t } = useTranslation();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { darkMode, toggleDarkMode } = useTheme(); // Usar el hook de tema

  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [userProfile, setUserProfile] = useState<UserWithRoleDTO>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dni: "",
    roleId: 0,
    profilePicture: "",
    creationDate: ""
  });

  useEffect(() => {
    const userSession = Cookies.get("userSession");
    if (userSession) {
      const parsedSession = JSON.parse(userSession); 
      setIsLoggedIn(true);

      const fetchUserData = async () => {
        const userId = parsedSession.id;
        if (!userId) {
          console.error("El ID del usuario no está disponible.");
          return;
        }

        try {
          const response = await fetch(`http://localhost:8080/users/${userId}`, {
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
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone || "",
            dni: data.dni,
            roleId: data.roleId,
            profilePicture: data.profilePicture || "/images/default-avatar.png",
            creationDate: data.creationDate
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
    window.location.href = "/";
  };

  const openProfileModal = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/${userProfile.id}/with-role`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("userSession")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data.");
      }

      const data = await response.json();
      setUserProfile({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || "",
        dni: data.dni,
        roleId: data.roleId,
        profilePicture: data.profilePicture || "/images/default-avatar.png",
        creationDate: data.creationDate,
      });

      setIsProfileModalOpen(true); 
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleUpdateUser = async (updatedUser: Partial<UserWithRoleDTO>) => {
    const formData = new FormData();

    Object.entries(updatedUser).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    try {
      const response = await fetch(`http://localhost:8080/users/${userProfile.id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${Cookies.get("userSession")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update user.");
      }

      const data = await response.json();
      setUserProfile(data); 
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-green-800 text-white'}`}>
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
            <Link to="/services" className="text-white hover:text-white hover:bg-green-700 p-2 rounded-md text-sm font-medium">
              {t('nav.services')}
            </Link>
            <Link to="/notice" className="text-white hover:text-white hover:bg-green-700 p-2 rounded-md text-sm font-medium">
              {t('nav.notice')}
            </Link>
            <Link to="/contact" className="text-white hover:text-white hover:bg-green-700 p-2 rounded-md text-sm font-medium">
              {t('nav.contact')}
            </Link>
            {userProfile.roleId == 4 && (
              <>
                <Link to="/employees" className="text-white hover:text-white hover:bg-green-700 p-2 rounded-md text-sm font-medium">
                  {t('nav.employees')}
                </Link>
                <Link to="/points" className="text-white hover:text-white hover:bg-green-700 p-2 rounded-md text-sm font-medium">
                  {t('nav.points')}
                </Link>
              </>
            )}
          </div>

          {/* User Profile and Authentication */}
          <div className="hidden md:flex items-center space-x-6">
            <LanguageSelector />
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User" src={userProfile.profilePicture} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu();
                        if (setting === "Profile") {
                          openProfileModal(); // Open profile modal
                        } else if (setting === "Logout") {
                          handleLogout(); // Logout
                        }
                      }}
                    >
                      <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
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

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Links */}
      <div
        className={`${isMobileMenuOpen ? "max-h-screen opacity-100 visibility-visible" : "max-h-0 opacity-0 visibility-hidden pointer-events-none"} transition-all ease-in-out duration-300 md:hidden bg-green-800`}
        style={{ position: "fixed", zIndex: 10, width: "100%" }}
      >
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link to="/services" className="text-white block px-3 p-2 rounded-md text-base font-medium hover:text-white hover:bg-green-700" onClick={handleLinkClick}>
            {t('nav.services')}
          </Link>
          <Link to="/notice" className="text-white block px-3 p-2 rounded-md text-base font-medium hover:text-white hover:bg-green-700" onClick={handleLinkClick}>
            {t('nav.notice')}
          </Link>
          <Link to="/contact" className="text-white block px-3 p-2 rounded-md text-base font-medium hover:text-white hover:bg-green-700" onClick={handleLinkClick}>
            {t('nav.contact')}
          </Link>
          {userProfile.roleId == 4 && (
            <>
              <Link to="/employees" className="text-white hover:text-white hover:bg-green-700 p-2 rounded-md text-sm font-medium">
                {t('nav.employees')}
              </Link>
              <Link to="/points" className="text-white hover:text-white hover:bg-green-700 p-2 rounded-md text-sm font-medium">
                {t('nav.points')}
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={userProfile} 
        onUpdate={handleUpdateUser} 
      />
    </nav>
  );
};

export default Navbar;
