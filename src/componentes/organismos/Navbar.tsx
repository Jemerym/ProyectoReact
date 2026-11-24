import { Link, useNavigate, useLocation } from 'react-router-dom';
import { obtenerUsuario, cerrarSesion as borrarSesion } from '../../api/sesion';
import { useEffect, useState } from 'react';
import { obtenerCarrito } from '../../api/carrito';

function Navbar() {
  // useLocation hace que el Navbar se vuelva a dibujar al cambiar de página,
  // así lee la sesión actualizada después de iniciar o cerrar sesión.
  const ubicacion = useLocation();
  const navegacion = useNavigate();

  const usuario = obtenerUsuario();
  const esAdmin = usuario?.rol === "ADMIN";
  const usuarioId = usuario?.id;
  const [cantidad, setCantidad] = useState(0);
  

  useEffect(() => {
  if (!usuarioId) {
    setCantidad(0);
    return;
  }

  const actualizar = (e?: Event) => {
    console.log("Navbar recibio evento", e);
    const detalle = (e as CustomEvent | undefined)?.detail;
    if (typeof detalle === "number") {
      setCantidad(detalle);
      return
    }

    obtenerCarrito(usuarioId)
      .then((c) => setCantidad(c.items.reduce((sum, p) => sum + p.cantidad, 0)))
      .catch(() => setCantidad(0));
  };

  actualizar(); // al cargar y al cambiar de usuario
  window.addEventListener("carritoActualizado", actualizar);
  return () => window.removeEventListener("carritoActualizado", actualizar);
}, [usuarioId, ubicacion.pathname]);

  const cerrarSesion = () => {
    borrarSesion();
    navegacion("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-1 px-3">
      <div className="logo">
        EL <span>VOLCAN</span>
      </div>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav links">
          <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/productos">Catalogo</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/nosotros">Nosotros</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/carrito">Carrito {cantidad > 0 && (<span className="badge rounded-pill bg-danger ms-1">{cantidad}</span>)}</Link></li>
          {usuario && !esAdmin && (
            <li className="nav-item"><Link className="nav-link" to="/mis-pedidos">Mis pedidos</Link></li>
          )}
          {/* El admin gestiona todo desde el panel (que tiene su propia barra) */}
          {esAdmin && (
            <li className="nav-item"><Link className="nav-link fw-bold text-warning" to="/admin">Panel admin</Link></li>
          )}
          <li className="nav-item">
            {usuario ? (
              <a
                href="#logout"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  cerrarSesion();
                }}
              >
                Cerrar Sesion ({usuario.nombre})
              </a>
            ) : (
              <Link className="nav-link" to="/login">Iniciar Sesion</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
