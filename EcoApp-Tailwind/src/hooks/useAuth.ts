import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { UserWithRoleDTO } from '../types/user';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserWithRoleDTO | null>(null);

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
          const response = await fetch(`http://localhost:8080/users/${userId}/with-role`, {
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
          setUserProfile(data);
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
    setUserProfile(null);
    window.location.href = "/";
  };

  return { isLoggedIn, userProfile, handleLogout };
};