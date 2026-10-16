import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        EL <span>VOLCAN</span>
      </div>
      <ul className="links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/productos">Catalogo</Link></li>
        <li><Link to="/nosotros"> Nosotros</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        <li><Link to="/carrito">Carrito</Link></li>
        <li><Link to="/Login">Iniciar Sesion</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar