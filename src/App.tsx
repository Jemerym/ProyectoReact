
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './componentes/organismos/Navbar'
import Inicio from './paginas/Inicio'
import Login from './paginas/Login'
import Registro from './paginas/Registro'
import Productos from './paginas/Productos'
import DetalleProducto from './paginas/DetalleProducto'
function App() {
  return(
    <>
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

        <Route path='/producto/:id'
        element={<DetalleProducto />} 
        />
      </Routes>
    </>
  )
}
export default App
