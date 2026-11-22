
import { useParams } from "react-router-dom";
import BotonVolver from "../componentes/atomos/BotonVolver";
import { useEffect, useState } from "react";
import BotonCarrito from "../componentes/atomos/BotonCarrito";

interface Producto {
    id: number;
    codigo: string;
    nombre: string;
    categoria: string;
    stock: number;
    precio: number;
    descripcion: string;
    imagen: string;
}

function DetalleProducto() {
    const { id } = useParams();
    const [productos, setProductos] = useState<Producto | null>(null);
    const [stockActual, setStockActual] = useState(0);

    useEffect(() => {
      if (!id) return;

      fetch(`http://localhost:8083/api/productos/${id}`)
          .then((res) => {
                if (!res.ok) throw new Error("Error al cargar el producto");
                return res.json();
          })
          .then((data : Producto) => {
            setProductos(data);
            const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
            const enCarrito = carrito.find((item: any) => item.id === data.id)?.cantidad || 0;
            setStockActual(data.stock - enCarrito);
          })
          .catch((err) => console.error("Error cargando detalle:", err))
    }, [id]);

const agregar = () => {
    if (stockActual > 0 && productos) {
        if (window.confirm("¿Estás seguro de añadir este producto?")) {
            const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
            const existente = carrito.find((item: any) => item.id === productos.id);
            if (existente) {
                existente.cantidad += 1;
            } else {
                carrito.push({
                    id: productos.id,
                    nombre: productos.nombre,
                    precio: productos.precio,
                    imagen: productos.imagen,
                    cantidad: 1
                });
            }
            localStorage.setItem("carrito", JSON.stringify(carrito));
            setStockActual(stockActual - 1);
            alert("Producto añadido al carrito");
        }
    } else {
        alert("Producto sin stock");
    }
};

return (
  <div className="container mt-5 d-flex justify-content-center">
    {productos && (
      <div className="card shadow-sm p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="card-title text-center mb-4">Detalle del Producto</h2>
        <div className="text-center mb-3">
          <img 
            src={productos.imagen} 
            alt={productos.nombre} 
            style={{ height: '200px', objectFit: 'contain' }} 
          />
        </div>
        <div className="card-body px-0">
          <h3 className="fw-bold">{productos.nombre}</h3>
          <p className="mb-1"><strong>Código:</strong> {productos.codigo}</p>
          <p className="mb-1"><strong>Categoría:</strong> {productos.categoria}</p>
          <p className="mb-1"><strong>Stock:</strong> {stockActual}</p>
          <p className="fs-5 fw-bold text-primary my-2">
            Precio: ${Number(productos.precio).toLocaleString('es-CL')}
          </p>
          <p className="text-muted">{productos.descripcion}</p>
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