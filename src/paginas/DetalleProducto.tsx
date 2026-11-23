import { useNavigate, useParams } from "react-router-dom";
import BotonVolver from "../componentes/atomos/BotonVolver";
import { useEffect, useState } from "react";
import BotonCarrito from "../componentes/atomos/BotonCarrito";
import { API } from "../api/config";
import { obtenerUsuario } from "../api/sesion";
import { agregarAlCarrito, cantidadesPorProducto, obtenerCarrito } from "../api/carrito";

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
    const navegacion = useNavigate();
    const [productos, setProductos] = useState<Producto | null>(null);
    const [stockActual, setStockActual] = useState(0);

    useEffect(() => {
      if (!id) return;

      fetch(`${API}/productos/${id}`)
          .then((res) => {
                if (!res.ok) throw new Error("Error al cargar el producto");
                return res.json();
          })
          .then(async (data: Producto) => {
            setProductos(data);
            // Stock disponible = stock del producto - lo que el usuario ya tiene en su carrito (guardado en la BD).
            const usuario = obtenerUsuario();
            const carrito = usuario ? await obtenerCarrito(usuario.id).catch(() => null) : null;
            const enCarrito = cantidadesPorProducto(carrito)[data.id] || 0;
            setStockActual(data.stock - enCarrito);
          })
          .catch((err) => console.error("Error cargando detalle:", err))
    }, [id]);

const agregar = async () => {
    if (!productos) return;

    const usuario = obtenerUsuario();
    if (!usuario) {
        alert("Debe iniciar sesión para agregar productos al carrito");
        navegacion("/login");
        return;
    }
    if (stockActual <= 0) {
        alert("Producto sin stock");
        return;
    }
    if (!window.confirm("¿Estás seguro de añadir este producto?")) return;

    try {
        // Se guarda en el microservicio de carrito; él valida el stock con el microservicio de productos.
        const carrito = await agregarAlCarrito(usuario.id, productos.id, 1);
        const enCarrito = cantidadesPorProducto(carrito)[productos.id] || 0;
        setStockActual(productos.stock - enCarrito);
        alert("Producto añadido al carrito");
    } catch (error) {
        alert(error instanceof Error ? error.message : "No se pudo agregar al carrito");
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
