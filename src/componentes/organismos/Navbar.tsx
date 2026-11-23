import { Link, useNavigate, useLocation } from 'react-router-dom';
import { obtenerUsuario, cerrarSesion as borrarSesion } from '../../api/sesion';

function Navbar() {
  // useLocation hace que el Navbar se vuelva a dibujar al cambiar de página,
  // así lee la sesión actualizada después de iniciar o cerrar sesión.
  useLocation();
  const navegacion = useNavigate();

  const usuario = obtenerUsuario();
  const esAdmin = usuario?.rol === "ADMIN";

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
          <li className="nav-item"><Link className="nav-link" to={esAdmin ? "/admin" : "/"}>Inicio</Link></li>
          {esAdmin && (
            <>
              <li className="nav-item"><Link className="nav-link" to="/admin/pedidos">Pedidos</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/admin/usuarios">Usuarios</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/listadoContactos">Mensajeria</Link></li>
            </>
          )}
          <li className="nav-item"><Link className="nav-link" to="/productos">Catalogo</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/nosotros">Nosotros</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/carrito">Carrito</Link></li>
          {usuario && !esAdmin && (
            <li className="nav-item"><Link className="nav-link" to="/mis-pedidos">Mis pedidos</Link></li>
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
