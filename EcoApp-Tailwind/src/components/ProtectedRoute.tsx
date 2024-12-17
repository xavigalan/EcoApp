import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  element: JSX.Element;
  requiredRoleIds: number[]; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, requiredRoleIds }) => {
  // Obtener la sesión del usuario desde la cookie
  const userSession = Cookies.get("userSession");

  // Si hay una cookie, parsearla correctamente
  let isAuthenticated = null;
  if (userSession) {
    try {
      isAuthenticated = JSON.parse(userSession); // Intentar parsear la cookie como JSON
    } catch (error) {
      console.error("Error parsing user session from cookie", error);
      // En caso de error, puedes redirigir al login o manejarlo de alguna otra forma
      return <Navigate to="/login" />;
    }
  }

  // Verificar si el usuario está autenticado
  if (isAuthenticated) {
    // Verificar si el rol del usuario está en el array de roles requeridos
    if (requiredRoleIds.includes(isAuthenticated.roleId)) {
      return element; // Permitir acceso si el rol está en el array de roles permitidos
    } else {
      // Si no tiene el rol adecuado, redirigir a una página de acceso denegado
      return <Navigate to="/" />;
    }
  }

  // Si no está autenticado, redirigir al login
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
