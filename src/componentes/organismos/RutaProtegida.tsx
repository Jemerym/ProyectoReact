import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { obtenerUsuario } from "../../api/sesion";

type Props = {
  children: ReactNode;
  soloAdmin?: boolean; // true = solo usuarios con rol ADMIN
};

// Evita que se pueda entrar a una página escribiendo la URL sin haber iniciado sesión.
function RutaProtegida({ children, soloAdmin = false }: Props) {
  const usuario = obtenerUsuario();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }
  if (soloAdmin && usuario.rol !== "ADMIN") {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

export default RutaProtegida;
