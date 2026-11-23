import { useEffect, useState } from "react";
import { API, leerError } from "../api/config";
import TablaPedido, { type Pedido } from "../componentes/organismos/TablaPedido";

const ESTADOS = ["PAGADO", "ENVIADO", "ENTREGADO"] as const;

// Panel del administrador: ve todos los pedidos y cambia su estado.
function AdminPedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState(true);

  const cargarPedidos = () => {
    fetch(`${API}/pedidos`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar pedidos");
        return res.json();
      })
      .then((datos) => setPedidos(datos))
      .catch(() => alert("No se pudieron cargar los pedidos"))
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    cargarPedidos();
  }, []);

  // PUT /api/pedidos/{id}/estado?estado=ENVIADO
  const cambiarEstado = async (id: number, estado: string) => {
    try {
      const res = await fetch(`${API}/pedidos/${id}/estado?estado=${estado}`, { method: "PUT" });
      if (!res.ok) throw new Error(await leerError(res, "No se pudo cambiar el estado"));
      const actualizado: Pedido = await res.json();
      setPedidos((lista) => lista.map((p) => (p.id === id ? actualizado : p)));
    } catch (error) {
      alert(error instanceof Error ? error.message : "No se pudo cambiar el estado");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center fw-bold">Pedidos</h2>

      {cargando && <p className="text-center">Cargando...</p>}
      {!cargando && pedidos.length === 0 && <p className="text-center fs-5">No hay pedidos.</p>}

      {pedidos.map((pedido) => (
        <TablaPedido key={pedido.id} pedido={pedido}>
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted small">Usuario #{pedido.usuarioId}</span>
            <select
              className="form-select form-select-sm w-auto"
              aria-label={`Estado del pedido ${pedido.id}`}
              value={pedido.estado}
              onChange={(e) => cambiarEstado(pedido.id, e.target.value)}
            >
              {ESTADOS.map((estado) => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </select>
          </div>
        </TablaPedido>
      ))}
    </div>
  );
}

export default AdminPedidos;
