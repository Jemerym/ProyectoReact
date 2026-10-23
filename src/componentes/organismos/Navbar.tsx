import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar() {
  const location = useLocation();
  const navegacion = useNavigate();

  const [usuario, setUsuario] = useState<{ correo: string; rol: string } | null>(() => {
    const sesion = localStorage.getItem("usuarioActivo");
    return sesion ? JSON.parse(sesion) : null;
  });

  useEffect(() => {
    const sesion = localStorage.getItem("usuarioActivo");
    setUsuario(sesion ? JSON.parse(sesion) : null);
  }, [location]);

  const esAdmin = usuario?.rol === "admin";

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioActivo");
    setUsuario(null);
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
          <li className="nav-item"><Link className="nav-link" to="/productos">Catalogo</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/nosotros">Nosotros</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/carrito">Carrito</Link></li>
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
                Cerrar Sesion
              </a>
            ) : (
              <Link className="nav-link" to="/Login">Iniciar Sesion</Link>)}
            </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;