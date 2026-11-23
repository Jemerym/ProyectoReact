import { useEffect, useState } from "react";
import { API_CONTACTOS } from "../api/config";

interface Contacto {
    id: number;
    nombreCompleto: string;
    correo: string;
    mensaje: string;
    estado?: string;
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

    return(
        <div className="container mt-5">
            <h2>Contactos recibidos</h2>

            {contactos.map((contacto) => (
                <div className="card p-3 mb-3" key={contacto.id}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="m-0">{contacto.nombreCompleto}</h5>
                        {contacto.estado && <span className="badge bg-secondary">{contacto.estado}</span>}
                    </div>
                    <p className="mb-1">{contacto.correo}</p>
                    {contacto.fechaCreacion && (
                        <p className="text-muted small mb-1">
                            {new Date(contacto.fechaCreacion).toLocaleString("es-CL")}
                        </p>
                    )}
                    <p className="mb-0">{contacto.mensaje}</p>
                </div>
            ))}
        </div>
    );
}
export default ListadoContacto;
