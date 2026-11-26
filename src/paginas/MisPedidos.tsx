import { useEffect, useState } from "react";
import { API, leerError } from "../api/config";
import { obtenerUsuario } from "../api/sesion";
import TablaPedido, { type Pedido } from "../componentes/organismos/TablaPedido";

// Pedidos del usuario que inició sesión (GET /api/pedidos?usuarioId=...).
function MisPedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const usuario = obtenerUsuario();
    if (!usuario) return;

    fetch(`${API}/pedidos?usuarioId=${usuario.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar pedidos");
        return res.json();
      })
      .then((datos) => setPedidos(datos))
      .catch(() => alert("No se pudieron cargar tus pedidos"))
      .finally(() => setCargando(false));
  }, []);

  // PUT /api/pedidos/{id}/cancelar  (solo si está PAGADO; el microservicio devuelve el stock)
  const cancelar = async (pedido: Pedido) => {
    if (!window.confirm(`¿Cancelar el pedido N° ${pedido.id}? Esta acción no se puede deshacer.`)) return;
    try {
      const res = await fetch(`${API}/pedidos/${pedido.id}/cancelar`, { method: "PUT" });
      if (!res.ok) throw new Error(await leerError(res, "No se pudo cancelar el pedido"));
      const actualizado: Pedido = await res.json();
      setPedidos((lista) => lista.map((p) => (p.id === actualizado.id ? actualizado : p)));
    } catch (error) {
      alert(error instanceof Error ? error.message : "No se pudo cancelar el pedido");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center fw-bold">Mis pedidos</h2>

      {cargando && <p className="text-center">Cargando...</p>}
      {!cargando && pedidos.length === 0 && (
        <p className="text-center fs-5">Todavía no tienes pedidos.</p>
      )}

      {pedidos.map((pedido) => (
        <TablaPedido key={pedido.id} pedido={pedido}>
          {/* Solo se puede cancelar mientras no haya sido enviado */}
          {pedido.estado === "PAGADO" && (
            <button className="btn btn-outline-danger btn-sm" onClick={() => cancelar(pedido)}>
              Cancelar pedido
            </button>
          )}
        </TablaPedido>
      ))}
    </div>
  );
}

export default MisPedidos;
