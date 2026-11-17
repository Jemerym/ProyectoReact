import { useEffect, useState } from "react";

interface contacto {
    id: number;
    nombreCompleto: String;
    correo: String;
    mensaje: String;
}

function ListadoContacto() {
    const [contactos, setContactos] = useState<contacto[]>([]);

    useEffect(() => {
        fetch("http://locahost:8082/api/contactos")
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error("Error al consultar los contactos");
                }
                return respuesta.json();
            })
            .then((datos) => setContactos(datos))
            .catch(() => alert("No se pudieron cargar los contactos"));
    }, []);
} 

export default ListadoContacto;