// Manejo de la sesión del usuario en localStorage.
// Los datos vienen del microservicio de usuarios (nunca incluyen la contraseña).

export interface UsuarioSesion {
  id: number;
  nombre: string;
  correo: string;
  rol: "ADMIN" | "CLIENTE";
}

const CLAVE = "usuarioActivo";

export function obtenerUsuario(): UsuarioSesion | null {
  try {
    const sesion = localStorage.getItem(CLAVE);
    return sesion ? JSON.parse(sesion) : null;
  } catch {
    return null;
  }
}

export function guardarUsuario(usuario: UsuarioSesion) {
  localStorage.setItem(CLAVE, JSON.stringify(usuario));
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE);
}

export function esAdmin(usuario: UsuarioSesion | null = obtenerUsuario()) {
  return usuario?.rol === "ADMIN";
}
