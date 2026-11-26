import type { ReactNode } from "react";

export interface ItemPedido {
  productoId: number;
  nombre: string;
  precioUnitario: number;
  cantidad: number;
}

export interface Pedido {
  id: number;
  usuarioId: number;
  total: number;
  metodoPago: string;
  direccionEntrega: string;
  estado: "PAGADO" | "ENVIADO" | "ENTREGADO" | "CANCELADO";
  fechaCreacion: string;
  items: ItemPedido[];
}

const COLOR_ESTADO: Record<string, string> = {
  PAGADO: "bg-secondary",
  ENVIADO: "bg-warning text-dark",
  ENTREGADO: "bg-success",
  CANCELADO: "bg-danger",
};

type Props = {
  pedido: Pedido;
  children?: ReactNode; // espacio para acciones extra (ej: botones del administrador)
};

// Card con el detalle de un pedido. La usan "Mis pedidos" y el panel de pedidos del admin.
function TablaPedido({ pedido, children }: Props) {
  return (
    <div className="card shadow-sm p-3 mb-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
        <h5 className="m-0 fw-bold">Pedido N° {pedido.id}</h5>
        <span className={`badge ${COLOR_ESTADO[pedido.estado] ?? "bg-secondary"}`}>{pedido.estado}</span>
      </div>
      <p className="mb-1 text-muted">
        {new Date(pedido.fechaCreacion).toLocaleString("es-CL")} · {pedido.metodoPago}
      </p>
      <p className="mb-2">Entrega: {pedido.direccionEntrega}</p>

      <div className="table-responsive">
        <table className="table table-sm align-middle mb-2">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {pedido.items.map((item) => (
              <tr key={item.productoId}>
                <td>{item.nombre}</td>
                <td>${item.precioUnitario.toLocaleString("es-CL")}</td>
                <td>{item.cantidad}</td>
                <td>${(item.precioUnitario * item.cantidad).toLocaleString("es-CL")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
        <h5 className="m-0 fw-bold">Total: ${pedido.total.toLocaleString("es-CL")}</h5>
        {children}
      </div>
    </div>
  );
}

export default TablaPedido;
