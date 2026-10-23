
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
function App() {
  return(
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Inicio />}
        />

        <Route
          path="/login"
          element={<Login />}
        />
          <Route
          path="/registro"
          element={<Registro />}
        />
        <Route
          path="/productos"
          element={<Productos />}
        />

        <Route
          path="/nosotros"
          element={<Nosotros />}
        />

        <Route path='/producto/:id'
        element={<DetalleProducto />} 
        />
        <Route
          path="/admin"
          element={<Admin />}
        />
      </Routes>

      <Footer/>
    </div>
  )
}
export default App
