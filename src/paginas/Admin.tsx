import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API, API_CONTACTOS } from "../api/config";
import { obtenerUsuario } from "../api/sesion";

interface Producto {
    id: number;
    codigo: string;
    nombre: string;
    stock: number;
}

interface Resumen {
    productos: Producto[] | null;
    pedidosPorEnviar: number | null;
    mensajesPendientes: number | null;
    usuarios: number | null;
}

const STOCK_BAJO = 5;

async function pedir<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
    return res.json();
}

// Panel principal del administrador: resumen de cada microservicio y accesos directos.
function Admin() {
    const usuario = obtenerUsuario();
    const [resumen, setResumen] = useState<Resumen>({
        productos: null, pedidosPorEnviar: null, mensajesPendientes: null, usuarios: null,
    });

    useEffect(() => {
        // allSettled: si un microservicio está apagado, los demás se muestran igual.
        Promise.allSettled([
            pedir<Producto[]>(`${API}/productos`),
            pedir<{ estado: string }[]>(`${API}/pedidos`),
            pedir<{ estado: string }[]>(`${API_CONTACTOS}/contactos`),
            pedir<unknown[]>(`${API}/usuarios`),
        ]).then(([productos, pedidos, contactos, usuarios]) => {
            setResumen({
                productos: productos.status === "fulfilled" ? productos.value : null,
                pedidosPorEnviar: pedidos.status === "fulfilled"
                    ? pedidos.value.filter((p) => p.estado === "PAGADO").length : null,
                mensajesPendientes: contactos.status === "fulfilled"
                    ? contactos.value.filter((c) => c.estado !== "RESPONDIDO").length : null,
                usuarios: usuarios.status === "fulfilled" ? usuarios.value.length : null,
            });
        });
    }, []);

    const stockBajo = (resumen.productos ?? []).filter((p) => p.stock <= STOCK_BAJO);

    const tarjetas = [
        { titulo: "Productos", valor: resumen.productos?.length, detalle: `${stockBajo.length} con stock bajo`, link: "/admin/productos", boton: "Administrar productos" },
        { titulo: "Pedidos por enviar", valor: resumen.pedidosPorEnviar, detalle: "en estado PAGADO", link: "/admin/pedidos", boton: "Ver pedidos" },
        { titulo: "Mensajes pendientes", valor: resumen.mensajesPendientes, detalle: "sin responder", link: "/admin/mensajes", boton: "Ver mensajes" },
        { titulo: "Usuarios", valor: resumen.usuarios, detalle: "registrados", link: "/admin/usuarios", boton: "Ver usuarios" },
    ];

    return (
        <div className="container mt-4">
            <h1 className="fw-bold">Panel de administración</h1>
            <p className="text-muted">Hola, {usuario?.nombre}. Este es el resumen de la tienda.</p>

            <div className="row g-4 mt-1">
                {tarjetas.map((t) => (
                    <div className="col-12 col-sm-6 col-lg-3" key={t.titulo}>
                        <div className="card shadow-sm h-100 p-3 bg-dark text-white rounded-4">
                            <h5 className="text-warning">{t.titulo}</h5>
                            <p className="display-6 fw-bold m-0">{t.valor ?? "—"}</p>
                            <p className="text-light small">{t.valor === undefined || t.valor === null ? "No disponible" : t.detalle}</p>
                            <Link to={t.link} className="btn btn-warning btn-sm fw-bold mt-auto">{t.boton}</Link>
                        </div>
                    </div>
                ))}
            </div>

            {stockBajo.length > 0 && (
                <div className="card shadow-sm p-3 mt-4">
                    <h4 className="fw-bold">Productos con stock bajo (≤ {STOCK_BAJO})</h4>
                    <ul className="list-group list-group-flush">
                        {stockBajo.map((p) => (
                            <li className="list-group-item d-flex justify-content-between" key={p.id}>
                                <span>{p.nombre} <span className="text-muted">({p.codigo})</span></span>
                                <span className={`badge ${p.stock === 0 ? "bg-danger" : "bg-warning text-dark"}`}>{p.stock}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Admin;
