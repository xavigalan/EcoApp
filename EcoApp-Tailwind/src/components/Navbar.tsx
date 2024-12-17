import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import ProfileModal from "./ProfileModal";
import { UserWithRoleDTO } from "../types/User";
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import { IconButton, TextField, Tooltip } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';



const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para el menú móvil
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // Estado para el modal de perfil
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { t } = useTranslation();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [userId, setUserId] = useState(null);

  const settings = ['Profile', 'Logout'];

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
    role: 1,
    profilePicture: "",
    creationDate: ""
  });

  const [editingField, setEditingField] = useState<string | null>(null); // Para saber qué campo estamos editando
  const [editedValue, setEditedValue] = useState<string>("");

  useEffect(() => {
    const userSession = Cookies.get("userSession");
    console.log("User Session:", userSession);  // Verifica que esta cookie contenga el ID esperado
  
    if (userSession) {
      const parsedSession = JSON.parse(userSession);  // Parseamos la cookie a un objeto JavaScript
      if (parsedSession && parsedSession.id) { // Verifica que parsedSession y parsedSession.id existan
        setIsLoggedIn(true);
  
        const fetchUserData = async () => {
          const userId = parsedSession.id; // Asegúrate de que el userId esté disponible
          setUserId(userId);
  
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
            console.log(data);
            setUserProfile({
              id: data.id,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              phone: data.phone || "",
              dni: data.dni,
              role: data.roleId,
              profilePicture: data.profilePicture || "/images/default-avatar.png",
              creationDate: data.creationDate,
            });
          } catch (error) {
            console.error("Error al obtener los datos del usuario:", error);
          }
        };
  
        fetchUserData();
      } else {
        console.error("La sesión de usuario no contiene un ID válido.");
      }
    } else {
      console.error("No hay una sesión de usuario activa.");
    }
  }, []);


  const handleLogout = () => {
    Cookies.remove("userSession");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const openProfileModal = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/${userId}`, {
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
        ...userProfile,
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || "",
        dni: data.dni,
        role: data.roleId,
        profilePicture: data.profilePicture || "/images/default-avatar.png",
        creationDate: data.creationDate,
      });

      setIsProfileModalOpen(true); // Abre el modal después de cargar los datos
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
        "Content-Type": "application/json", // Enviar datos como JSON
      },
      body: JSON.stringify(updatedUser), // Convertimos los datos a JSON
    });

      if (!response.ok) {
        throw new Error("Failed to update user.");
      }

      const data = await response.json();
      console.log(data);
      
      setUserProfile(data); // Actualiza el estado con los datos del servidor
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleEditField = (field: string, value: string) => {
    setEditingField(field);
    setEditedValue(value);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
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
            <Link to="/services" className="text-white hover:text-white hover:bg-green-700 p-2 rounded-md text-sm font-medium">
              {t('nav.services')}
            </Link>
            <Link to="/notice" className="text-white hover:text-white hover:bg-green-700 p-2 rounded-md text-sm font-medium">
              {t('nav.notice')}
            </Link>
            <Link to="/contact" className="text-white hover:text-white hover:bg-green-700 p-2 rounded-md text-sm font-medium">
              {t('nav.contact')}
            </Link>
            {userProfile.role == 4 && (
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
                {/* User Profile Picture */}
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu();
                        if (setting === "Profile") {
                          openProfileModal(); // Llama a la función para cargar datos y abrir el modal
                        } else if (setting === "Logout") {
                          handleLogout(); // Maneja el logout
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
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSelector />
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                {/* User Profile Picture */}
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  aria-hidden={!Boolean(anchorElUser)}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu();
                        if (setting === "Profile") {
                          openProfileModal(); // Llama a la función para cargar datos y abrir el modal
                        } else if (setting === "Logout") {
                          handleLogout(); // Maneja el logout
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
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md bg-green-800 text-white hover:text-white hover:bg-green-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
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
          {userProfile.role == 4 && (
              <>
                <Link to="/employees" className="text-white block px-3 p-2 rounded-md text-base font-medium hover:text-white hover:bg-green-700" onClick={handleLinkClick}>
                  {t('nav.employees')}
                </Link>
                <Link to="/points" className="text-white block px-3 p-2 rounded-md text-base font-medium hover:text-white hover:bg-green-700" onClick={handleLinkClick}>
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
        onEditField={handleEditField}
        editingField={editingField}
        editedValue={editedValue}
        setEditedValue={setEditedValue}
      />
    </nav>
  );
};

export default Navbar;