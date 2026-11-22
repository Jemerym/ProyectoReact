import { useEffect, useState } from "react";
import CardProductos from "../componentes/moleculas/CardProductos";

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

const API_URL = "http://localhost:8083/api/productos";

function Productos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
  const admin = JSON.parse(localStorage.getItem("usuarioActivo") || "{}").rol === "admin";

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

  const categorias = [...new Set(productos.map((p) => p.categoria))];

  const eliminar = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar");
      cargarProductos();
    } catch {
      alert("No se pudo eliminar el producto");
    }
  };

  const modificar = async (id: number) => {
    const p = productos.find((prod) => prod.id === id);
    if (!p) return;

    const actualizado: Producto = {
      ...p,
      nombre: prompt("Nombre:", p.nombre) || p.nombre,
      precio: Number(prompt("Precio:", String(p.precio))) || p.precio,
      stock: Number(prompt("Stock:", String(p.stock))) || p.stock,
    };

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(actualizado),
      });
      if (!res.ok) throw new Error("Error al modificar");
      cargarProductos();
    } catch {
      alert("No se pudo modificar el producto");
    }
  };

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
                const enCarrito = carrito.find((item: any) => item.id === p.id)?.cantidad || 0;
                const stockDisponible = p.stock - enCarrito;
                return (
                  <div className="col" key={p.id}>
                    <CardProductos
                      {...p}
                      stock={stockDisponible}
                      onModificar={admin ? () => modificar(p.id) : undefined}
                      onEliminar={admin ? () => eliminar(p.id) : undefined}
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