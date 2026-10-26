import { useState } from "react";
import { Link } from "react-router-dom";
import BotonEliminar from "../componentes/atomos/BotonEliminar";

function Carrito() {
  // Leemos el carrito desde localStorage
  const [carrito, setCarrito] = useState(() => JSON.parse(localStorage.getItem("carrito") || "[]"));

  // Eliminar un producto
  const eliminar = (id: number) => {
    const nuevo = carrito.filter((p: any) => p.id !== id);
    setCarrito(nuevo);
    localStorage.setItem("carrito", JSON.stringify(nuevo));
  };

  const pagar = () => {
    alert("La compra fue realizada con exito")
    setCarrito([])
    localStorage.removeItem("carrito")
  }

  // Vaciar todo el carrito
  const vaciar = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
  };

  // Calcular total a pagar
  const total = carrito.reduce((sum: number, p: any) => sum + p.precio * p.cantidad, 0);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center fw-bold">Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <div className="text-center p-4 card shadow-sm">
          <p className="fs-5 mb-3">El carrito está vacío.</p>
          <div>
            <Link to="/productos" className="btn btn-warning fw-bold">
              Volver al catálogo
            </Link>
          </div>
        </div>
      ) : (
        <div className="card shadow-sm p-3">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th style={{ width: "120px" }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((p: any) => (
                <tr key={p.id}>
                  <td>
                    <img src={p.imagen} alt={p.nombre} width="45" className="me-2" />
                    {p.nombre}
                  </td>
                  <td>${p.precio}</td>
                  <td>{p.cantidad}</td>
                  <td>${p.precio * p.cantidad}</td>
                  <td>
                    <BotonEliminar alClikear={() => eliminar(p.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
            <button className="btn btn-outline-danger btn-sm" onClick={vaciar}>
              Vaciar Carrito
            </button>
            <h4 className="m-0 fw-bold">Total a pagar: ${total}</h4>

            <button className="btn btn-outline-danger btn-sm" onClick={pagar}>
                Pagar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrito;
  