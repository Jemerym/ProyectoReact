import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { cerrarSesion as borrarSesion, obtenerUsuario } from "../../api/sesion";

// Pestañas del panel. "end" hace que "Resumen" solo quede activa en /admin exacto.
const PESTANAS = [
  { ruta: "/admin", texto: "Resumen", end: true },
  { ruta: "/admin/productos", texto: "Productos" },
  { ruta: "/admin/pedidos", texto: "Pedidos" },
  { ruta: "/admin/mensajes", texto: "Mensajes" },
  { ruta: "/admin/usuarios", texto: "Usuarios" },
];

// Diseño de todas las páginas del administrador: barra superior propia + pestañas.
// Reemplaza al Navbar y Footer de la tienda (App.tsx no los muestra en /admin).
function LayoutAdmin() {
  const navegacion = useNavigate();
  const usuario = obtenerUsuario();

  const cerrarSesion = () => {
    borrarSesion();
    navegacion("/login");
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <header className="bg-dark text-white px-3 py-2 d-flex flex-wrap align-items-center gap-2">
        <div className="logo me-auto">
          EL <span>VOLCAN</span> <small className="text-white-50 fs-6">· Panel</small>
        </div>
        <Link to="/" className="btn btn-outline-light btn-sm">Volver a la tienda</Link>
        <span className="small">Sesión: {usuario?.nombre} (Administrador)</span>
        <button type="button" className="btn btn-outline-danger btn-sm" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </header>

      <div className="container-fluid px-3 px-md-4 pt-3">
        <ul className="nav nav-tabs flex-nowrap text-nowrap overflow-x-auto overflow-y-hidden" aria-label="Secciones del panel">
          {PESTANAS.map((p) => (
            <li className="nav-item" key={p.ruta}>
              <NavLink to={p.ruta} end={p.end} className={({ isActive }) => `nav-link ${isActive ? "active fw-bold" : ""}`}>
                {p.texto}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <main className="flex-grow-1 pb-5">
        {/* Aquí se dibuja la página de la pestaña activa (Admin, AdminProductos, etc.) */}
        <Outlet />
      </main>
    </div>
  );
}

export default LayoutAdmin;
