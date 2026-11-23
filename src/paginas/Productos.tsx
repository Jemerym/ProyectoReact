import { API } from "../api/config";
import { useEffect, useState } from "react";
import CardProductos from "../componentes/moleculas/CardProductos";
import { obtenerUsuario } from "../api/sesion";
import { cantidadesPorProducto, obtenerCarrito } from "../api/carrito";

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

const API_URL = `${API}/productos`;

function Productos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  // Cantidades que el usuario ya tiene en su carrito (guardado en la BD): { productoId: cantidad }
  const [enCarrito, setEnCarrito] = useState<Record<number, number>>({});
  const usuario = obtenerUsuario();
  const usuarioId = usuario?.id;

  const cargarProductos = () => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar productos");
        return res.json();
      })
      .then((data) => setProductos(data))
      .catch(() => alert("No se pudieron cargar los productos"));
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  useEffect(() => {
    if (!usuarioId) return;
    obtenerCarrito(usuarioId)
      .then((carrito) => setEnCarrito(cantidadesPorProducto(carrito)))
      .catch((err) => console.error("Error cargando carrito:", err));
  }, [usuarioId]);

  const categorias = [...new Set(productos.map((p) => p.categoria))];

  return (
    <div className="container mt-5">
      <h1 className="text-center fw-bold">Productos</h1>
      {categorias.map((categoria) => (
        <div className="text-center" key={categoria}>
          <br /><br />
          <h2 className="fw-normal">{categoria}</h2>
          <br />
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 ">
            {productos
              .filter((p) => p.categoria === categoria)
              .map((p) => {
                const stockDisponible = p.stock - (enCarrito[p.id] || 0);
                return (
                  <div className="col" key={p.id}>
                    <CardProductos
                      {...p}
                      stock={stockDisponible}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Productos;