import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar   ">
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
          <li className="nav-item">
            <Link className="nav-link" to="/">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/productos">Catalogo</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/nosotros">Nosotros</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contacto">Contacto</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/carrito">Carrito</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Login">Iniciar Sesion</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;