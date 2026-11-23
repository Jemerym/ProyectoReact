import { useState } from "react";

export interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  categoria: string;
  stock: number;
  precio: number;
  descripcion: string;
  imagen: string;
}

// Datos que se envían al microservicio (sin id).
export type DatosProducto = Omit<Producto, "id">;

type Props = {
  inicial?: Producto | null;          // si viene, el formulario es para modificar
  categorias: string[];               // sugerencias para el campo categoría
  guardando: boolean;
  alGuardar: (datos: DatosProducto) => void;
  alCancelar: () => void;
};

// Formulario para crear o modificar un producto (lo usa la página AdminProductos).
function FormularioProducto({ inicial, categorias, guardando, alGuardar, alCancelar }: Props) {
  const [codigo, setCodigo] = useState(inicial?.codigo ?? "");
  const [nombre, setNombre] = useState(inicial?.nombre ?? "");
  const [categoria, setCategoria] = useState(inicial?.categoria ?? "");
  const [precio, setPrecio] = useState(inicial ? String(inicial.precio) : "");
  const [stock, setStock] = useState(inicial ? String(inicial.stock) : "");
  const [descripcion, setDescripcion] = useState(inicial?.descripcion ?? "");
  const [imagen, setImagen] = useState(inicial?.imagen ?? "");
  const [error, setError] = useState("");

  const manejarEnvio = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (codigo.trim() === "") return setError("Debe ingresar el código");
    if (nombre.trim() === "") return setError("Debe ingresar el nombre");
    if (categoria.trim() === "") return setError("Debe ingresar la categoría");
    if (!/^\d+$/.test(precio)) return setError("El precio debe ser un número entero mayor o igual a 0");
    if (!/^\d+$/.test(stock)) return setError("El stock debe ser un número entero mayor o igual a 0");

    setError("");
    alGuardar({
      codigo: codigo.trim().toUpperCase(),
      nombre: nombre.trim(),
      categoria: categoria.trim(),
      precio: Number(precio),
      stock: Number(stock),
      descripcion: descripcion.trim(),
      imagen: imagen.trim(),
    });
  };

  return (
    <form onSubmit={manejarEnvio} noValidate>
      {error && <div className="alert alert-danger py-2">{error}</div>}

      <div className="row g-3">
        <div className="col-12 col-md-4">
          <label className="form-label" htmlFor="prod-codigo">Código</label>
          <input id="prod-codigo" className="form-control" value={codigo}
                 onChange={(e) => setCodigo(e.target.value)} placeholder="Ej: AC004" maxLength={20} />
        </div>
        <div className="col-12 col-md-8">
          <label className="form-label" htmlFor="prod-nombre">Nombre</label>
          <input id="prod-nombre" className="form-control" value={nombre}
                 onChange={(e) => setNombre(e.target.value)} maxLength={150} />
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label" htmlFor="prod-categoria">Categoría</label>
          {/* datalist: sugiere las categorías que ya existen, pero permite escribir una nueva */}
          <input id="prod-categoria" className="form-control" list="lista-categorias" value={categoria}
                 onChange={(e) => setCategoria(e.target.value)} maxLength={100} />
          <datalist id="lista-categorias">
            {categorias.map((c) => <option key={c} value={c} />)}
          </datalist>
        </div>
        <div className="col-6 col-md-3">
          <label className="form-label" htmlFor="prod-precio">Precio</label>
          <input id="prod-precio" type="number" min={0} className="form-control" value={precio}
                 onChange={(e) => setPrecio(e.target.value)} />
        </div>
        <div className="col-6 col-md-3">
          <label className="form-label" htmlFor="prod-stock">Stock</label>
          <input id="prod-stock" type="number" min={0} className="form-control" value={stock}
                 onChange={(e) => setStock(e.target.value)} />
        </div>

        <div className="col-12">
          <label className="form-label" htmlFor="prod-descripcion">Descripción</label>
          <textarea id="prod-descripcion" className="form-control" rows={3} value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)} maxLength={500} />
        </div>

        <div className="col-12 col-md-9">
          <label className="form-label" htmlFor="prod-imagen">Imagen</label>
          <input id="prod-imagen" className="form-control" value={imagen}
                 onChange={(e) => setImagen(e.target.value)} placeholder="Ej: /img/ac001.jpg o una URL" maxLength={255} />
          <div className="form-text">Ruta de una imagen de la carpeta public/img o una dirección web.</div>
        </div>
        <div className="col-12 col-md-3 d-flex align-items-center justify-content-center">
          {imagen.trim() && (
            <img src={imagen} alt="Vista previa" style={{ maxHeight: "80px", maxWidth: "100%", objectFit: "contain" }} />
          )}
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <button type="button" className="btn btn-outline-secondary" onClick={alCancelar} disabled={guardando}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-warning fw-bold" disabled={guardando}>
          {guardando ? "Guardando..." : inicial ? "Guardar cambios" : "Agregar producto"}
        </button>
      </div>
    </form>
  );
}

export default FormularioProducto;
