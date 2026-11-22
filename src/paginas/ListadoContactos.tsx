import { useEffect, useState } from "react";

interface Contacto {
    id: number;
    nombreCompleto: String;
    correo: String;
    mensaje: String;
}

function ListadoContacto() {
    const [contactos, setContactos] = useState<Contacto[]>([]);

    useEffect(() => {
        fetch("http://localhost:8082/api/contactos")
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
                    <h5>{contacto.nombreCompleto}</h5>
                    <p>{contacto.correo}</p>
                    <p>{contacto.mensaje}</p>
                </div>
            ))}
        </div>
    );
}
export default ListadoContacto;