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
  // Buscador y filtro por categoría ("" = todas)
  const [busqueda, setBusqueda] = useState("");
  const [categoriaElegida, setCategoriaElegida] = useState("");
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

  // Todas las categorías (para el selector)
  const categorias = [...new Set(productos.map((p) => p.categoria))];

  // Productos que cumplen la búsqueda y la categoría elegida
  const texto = busqueda.trim().toLowerCase();
  const filtrados = productos.filter((p) =>
    (categoriaElegida === "" || p.categoria === categoriaElegida) &&
    (texto === "" || p.nombre.toLowerCase().includes(texto) || p.categoria.toLowerCase().includes(texto))
  );
  const categoriasVisibles = categorias.filter((c) => filtrados.some((p) => p.categoria === c));

  return (
    <div className="container mt-5">
      <h1 className="text-center fw-bold">Productos</h1>

      <div className="row g-2 justify-content-center mt-3">
        <div className="col-12 col-md-6">
          <input
            type="search"
            className="form-control"
            placeholder="Buscar productos (ej: cilindro, regulador...)"
            aria-label="Buscar productos"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-3">
          <select
            className="form-select"
            aria-label="Filtrar por categoría"
            value={categoriaElegida}
            onChange={(e) => setCategoriaElegida(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {productos.length > 0 && filtrados.length === 0 && (
        <p className="text-center fs-5 mt-5">No se encontraron productos.</p>
      )}

      {categoriasVisibles.map((categoria) => (
        <div className="text-center" key={categoria}>
          <br /><br />
          <h2 className="fw-normal">{categoria}</h2>
          <br />
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 ">
            {filtrados
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