import { useEffect, useState } from "react";
import { API } from "../api/config";
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

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center fw-bold">Mis pedidos</h2>

      {cargando && <p className="text-center">Cargando...</p>}
      {!cargando && pedidos.length === 0 && (
        <p className="text-center fs-5">Todavía no tienes pedidos.</p>
      )}

      {pedidos.map((pedido) => (
        <TablaPedido key={pedido.id} pedido={pedido} />
      ))}
    </div>
  );
}

export default MisPedidos;
