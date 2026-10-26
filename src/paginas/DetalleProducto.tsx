
import { useParams } from "react-router-dom";
import BotonVolver from "../componentes/atomos/BotonVolver";
import { useState } from "react";
import BotonCarrito from "../componentes/atomos/BotonCarrito";
import { productos } from "./Productos";

function DetalleProducto() {
    const { id } = useParams();

    const producto = productos.find(
        producto => producto.id === Number(id)
    );

    const [stockActual, setStockActual] = useState(producto ? producto.stock : 0);

const agregar = () => {
    if (stockActual > 0 && producto) {
        if (window.confirm("¿Estás seguro de añadir este producto?")) {
            const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
            const existente = carrito.find((item: any) => item.id === producto.id);
            if (existente) {
                existente.cantidad += 1;
            } else {
                carrito.push({
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    imagen: producto.imagen,
                    cantidad: 1
                });
            }
            localStorage.setItem("carrito", JSON.stringify(carrito));
            // Mantenemos el descuento de stock:
            setStockActual(stockActual - 1);
            alert("Producto añadido al carrito");
        }
    } else {
        alert("Producto sin stock");
    }
};

return (
  <div className="container mt-5 d-flex justify-content-center">
    {producto && (
      <div className="card shadow-sm p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="card-title text-center mb-4">Detalle del Producto</h2>
        <div className="text-center mb-3">
          <img 
            src={producto.imagen} 
            alt={producto.nombre} 
            style={{ height: '200px', objectFit: 'contain' }} 
          />
        </div>
        <div className="card-body px-0">
          <h3 className="fw-bold">{producto.nombre}</h3>
          <p className="mb-1"><strong>Código:</strong> {producto.codigo}</p>
          <p className="mb-1"><strong>Categoría:</strong> {producto.categoria}</p>
          <p className="mb-1"><strong>Stock:</strong> {stockActual}</p>
          <p className="fs-5 fw-bold text-primary my-2">
            Precio: ${Number(producto.precio).toLocaleString('es-CL')}
          </p>
          <p className="text-muted">{producto.descripcion}</p>
          <div className="d-flex gap-2 mt-4">
            <BotonCarrito onClick={agregar} />
            <BotonVolver />
          </div>
        </div>
      </div>
    )}
  </div>
);
}

export default DetalleProducto;