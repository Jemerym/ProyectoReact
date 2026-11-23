import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './componentes/organismos/Navbar'
import Inicio from './paginas/Inicio'
import Login from './paginas/Login'
import Registro from './paginas/Registro'
import Productos from './paginas/Productos'
import DetalleProducto from './paginas/DetalleProducto'
import Admin from './paginas/Admin'
import Nosotros from './paginas/Nosotros'
import Footer from './componentes/organismos/Footer'
import Contacto from './paginas/Contacto'
import Carrito from './paginas/Carrito'
import ListadoContactos from './paginas/ListadoContactos'
import MisPedidos from './paginas/MisPedidos'
import AdminPedidos from './paginas/AdminPedidos'
import AdminUsuarios from './paginas/AdminUsuarios'
import RutaProtegida from './componentes/organismos/RutaProtegida'

function App() {
  return(
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1">
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/carrito" element={<Carrito />} />

          {/* Requieren haber iniciado sesión */}
          <Route path="/mis-pedidos" element={<RutaProtegida><MisPedidos /></RutaProtegida>} />

          {/* Solo administrador */}
          <Route path="/admin" element={<RutaProtegida soloAdmin><Admin /></RutaProtegida>} />
          <Route path="/admin/pedidos" element={<RutaProtegida soloAdmin><AdminPedidos /></RutaProtegida>} />
          <Route path="/admin/usuarios" element={<RutaProtegida soloAdmin><AdminUsuarios /></RutaProtegida>} />
          <Route path="/listadoContactos" element={<RutaProtegida soloAdmin><ListadoContactos /></RutaProtegida>} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App;
