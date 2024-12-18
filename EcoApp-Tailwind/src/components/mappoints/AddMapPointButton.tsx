import React from 'react';
import { MapPinPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'; // Para acceder a la cookie con la sesión del usuario

const AddMapPointButton = () => {
  // Obtener el rol del usuario desde la cookie
  const userSession = Cookies.get("userSession");
  const roleId = userSession ? JSON.parse(userSession).roleId : null;

  // Comprobar si el usuario es un administrador (rol 4)
  const isAdmin = roleId === 4;

  // Si el usuario no es admin, no se renderiza el botón
  if (!isAdmin) {
    return null;
  }

  return (
    <Link
      to="/add/mappoint"
      className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 shadow-sm"
    >
      <MapPinPlus className="w-5 h-5 mr-2" />
      Add New Location
    </Link>
  );
};

export default AddMapPointButton;