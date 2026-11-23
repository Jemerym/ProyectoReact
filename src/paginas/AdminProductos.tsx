import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import BotonModificar from "../componentes/atomos/BotonModificar";
import BotonEliminar from "../componentes/atomos/BotonEliminar";
import FormularioProducto, { type DatosProducto, type Producto } from "../componentes/organismos/FormularioProducto";
import { API, leerError } from "../api/config";

const STOCK_BAJO = 5;

// Panel del administrador: listar, agregar, modificar y eliminar productos.
function AdminProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  // Modal: null = cerrado, "nuevo" = agregar, Producto = modificar ese producto
  const [editando, setEditando] = useState<Producto | "nuevo" | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [errorModal, setErrorModal] = useState("");

  const cargarProductos = () => {
    fetch(`${API}/productos`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar productos");
        return res.json();
      })
      .then((datos) => setProductos(datos))
      .catch(() => alert("No se pudieron cargar los productos"))
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const categorias = [...new Set(productos.map((p) => p.categoria))];

  const texto = busqueda.trim().toLowerCase();
  const visibles = productos.filter((p) =>
    texto === "" ||
    p.nombre.toLowerCase().includes(texto) ||
    p.codigo.toLowerCase().includes(texto) ||
    p.categoria.toLowerCase().includes(texto)
  );

  const abrir = (producto: Producto | "nuevo") => {
    setErrorModal("");
    setEditando(producto);
  };

  const cerrar = () => {
    if (!guardando) setEditando(null);
  };

  // POST /api/productos (nuevo) o PUT /api/productos/{id} (modificar)
  const guardar = async (datos: DatosProducto) => {
    const esNuevo = editando === "nuevo";
    const url = esNuevo ? `${API}/productos` : `${API}/productos/${(editando as Producto).id}`;

    setGuardando(true);
    setErrorModal("");
    try {
      const res = await fetch(url, {
        method: esNuevo ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      if (!res.ok) {
        // Ej: "Ya existe un producto con el código CL001" o "El precio no puede ser negativo"
        throw new Error(await leerError(res, "No se pudo guardar el producto"));
      }
      const guardado: Producto = await res.json();
      setProductos((lista) =>
        esNuevo ? [...lista, guardado] : lista.map((p) => (p.id === guardado.id ? guardado : p))
      );
      setEditando(null);
    } catch (error) {
      setErrorModal(error instanceof Error && error.message !== "Failed to fetch"
        ? error.message
        : "No se pudo conectar con el servidor");
    } finally {
      setGuardando(false);
    }
  };

  // DELETE /api/productos/{id}
  const eliminar = async (producto: Producto) => {
    if (!window.confirm(`¿Eliminar "${producto.nombre}" (${producto.codigo})? Esta acción no se puede deshacer.`)) return;
    try {
      const res = await fetch(`${API}/productos/${producto.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await leerError(res, "No se pudo eliminar el producto"));
      setProductos((lista) => lista.filter((p) => p.id !== producto.id));
    } catch (error) {
      alert(error instanceof Error ? error.message : "No se pudo eliminar el producto");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
        <h2 className="fw-bold m-0">Administrar productos</h2>
        <button className="btn btn-warning fw-bold" onClick={() => abrir("nuevo")}>
          + Agregar producto
        </button>
      </div>

      <input
        type="search"
        className="form-control mb-3"
        placeholder="Buscar por nombre, código o categoría"
        aria-label="Buscar producto"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="card shadow-sm p-3">
        {cargando ? (
          <p className="text-center m-0">Cargando...</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Código</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th style={{ width: "220px" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {visibles.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <img src={p.imagen} alt="" width="40" height="40" className="me-2" style={{ objectFit: "contain" }} />
                      {p.nombre}
                    </td>
                    <td>{p.codigo}</td>
                    <td>{p.categoria}</td>
                    <td>${p.precio.toLocaleString("es-CL")}</td>
                    <td>
                      <span className={`badge ${p.stock === 0 ? "bg-danger" : p.stock <= STOCK_BAJO ? "bg-warning text-dark" : "bg-success"}`}>
                        {p.stock}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2" aria-label={`Acciones de ${p.nombre}`} role="group">
                        <BotonModificar alClickear={() => abrir(p)} />
                        <BotonEliminar alClikear={() => eliminar(p)} />
                      </div>
                    </td>
                  </tr>
                ))}
                {visibles.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-muted">No hay productos que coincidan.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal show={editando !== null} onHide={cerrar} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{editando === "nuevo" ? "Agregar producto" : "Modificar producto"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorModal && <div className="alert alert-danger py-2">{errorModal}</div>}
          {editando !== null && (
            <FormularioProducto
              key={editando === "nuevo" ? "nuevo" : editando.id}
              inicial={editando === "nuevo" ? null : editando}
              categorias={categorias}
              guardando={guardando}
              alGuardar={guardar}
              alCancelar={cerrar}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AdminProductos;
