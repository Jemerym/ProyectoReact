import { useEffect, useState } from "react";
import { API_CONTACTOS, leerError } from "../api/config";

interface Contacto {
    id: number;
    nombreCompleto: string;
    correo: string;
    mensaje: string;
    estado: string;
    fechaCreacion?: string;
}

function ListadoContacto() {
    const [contactos, setContactos] = useState<Contacto[]>([]);

    useEffect(() => {
        fetch(`${API_CONTACTOS}/contactos`)
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error("Error al consultar los contactos");
                }
                return respuesta.json();
            })
            .then((datos) => setContactos(datos))
            .catch(() => alert("No se pudieron cargar los contactos"));
    }, []);

    // PUT /api/contactos/{id}/estado?estado=RESPONDIDO
    const marcarRespondido = async (id: number) => {
        try {
            const respuesta = await fetch(`${API_CONTACTOS}/contactos/${id}/estado?estado=RESPONDIDO`, { method: "PUT" });
            if (!respuesta.ok) {
                throw new Error(await leerError(respuesta, "No se pudo actualizar el mensaje"));
            }
            const actualizado: Contacto = await respuesta.json();
            setContactos((lista) => lista.map((c) => (c.id === id ? actualizado : c)));
        } catch (error) {
            alert(error instanceof Error ? error.message : "No se pudo actualizar el mensaje");
        }
    };

    return(
        <div className="container mt-4">
            <h2>Contactos recibidos</h2>

            {contactos.map((contacto) => (
                <div className="card p-3 mb-3" key={contacto.id}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="m-0">{contacto.nombreCompleto}</h5>
                        <span className={`badge ${contacto.estado === "RESPONDIDO" ? "bg-success" : "bg-secondary"}`}>
                            {contacto.estado}
                        </span>
                    </div>
                    <p className="mb-1">{contacto.correo}</p>
                    {contacto.fechaCreacion && (
                        <p className="text-muted small mb-1">
                            {new Date(contacto.fechaCreacion).toLocaleString("es-CL")}
                        </p>
                    )}
                    <p className="mb-2">{contacto.mensaje}</p>
                    {contacto.estado !== "RESPONDIDO" && (
                        <div>
                            <button className="btn btn-outline-success btn-sm" onClick={() => marcarRespondido(contacto.id)}>
                                Marcar respondido
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
export default ListadoContacto;
