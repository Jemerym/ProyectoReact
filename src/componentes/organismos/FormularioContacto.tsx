import { useState } from "react"
import CampoFormulario from "../moleculas/CampoFormulario";
import type { SubmitEvent } from "react";
import { API_CONTACTOS } from "../../api/config";

function FormularioContacto(){
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [enviando, setEnviando] = useState(false);

    
    const manejarEnvio = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (enviando) return;

        if (nombre.trim() === "") {
            alert("Debe ingresar su nombre")
            return;
        }
        if (nombre.length > 10) {
            alert("No debe pasar de 10 caracteres")
            return;
        }
        if (correo.trim() === "") {
            alert("Debe ingresar su correo");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)){
            alert("Debe ingresar un correo valido");
            return;
        }
        if (telefono.trim() === "") {
            alert("Debe ingresar su telefono de contacto")
            return;
        }

        if (!/^\+?[0-9]{8,15}$/.test(telefono.trim())) {
            alert("Debe ingresar un numero de telefono valido");
            return;
        }

        if (direccion.trim()=== "") {
            alert("Debe ingresar su direccion de entrega")
            return;
        }
        if (mensaje.trim() === "") {
            alert("Debe ingresar un mensaje o detalle del pedido")
            return;
        }

        setEnviando(true);

        try{
            const respuesta = await fetch(
                `${API_CONTACTOS}/contactos`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nombreCompleto: nombre.trim(),
                        correo: correo.trim(),
                        mensaje: mensaje.trim(),
                    }),
                }
            );

            if(!respuesta.ok){
                throw new Error(`Error HTTP ${respuesta.status}`);
            }
            alert("Mensaje guardado correctamente");

            setNombre("");
            setCorreo("");
            setTelefono("");
            setDireccion("");
            setMensaje("");
        } catch (error) {
            console.error("Error al enviar el contacto:", error);
            alert("No se pudo enviar el mensaje. Intente nuevamente.");
        } finally {
            setEnviando(false);
        }
    } 
    
    return(

        <form onSubmit={manejarEnvio} noValidate>
            <CampoFormulario
                etiqueta="Nombre completo"
                tipo="text"
                nombre="nombre"
                valor={nombre}
                alCambiar={setNombre}
            />

             <CampoFormulario
                etiqueta="Correo electronico"
                tipo="email"
                nombre="correo"
                valor={correo}
                alCambiar={setCorreo}
            />
             <CampoFormulario
                etiqueta="Telefono"
                tipo="tel"
                nombre="telefono"
                valor={telefono}
                alCambiar={setTelefono}
            />
             <CampoFormulario
                etiqueta="Direccion"
                tipo="text"
                nombre="direccion"
                valor={direccion}
                alCambiar={setDireccion}
            />
            <CampoFormulario
                etiqueta="Mensaje"
                tipo="text"
                nombre="mensaje"
                valor={mensaje}
                alCambiar={setMensaje}
            />
            <button type="submit" className="btn btn-warning w-100 fw-bold" disabled={enviando}>
                {enviando ? "Enviando..." : "Enviar mensaje"}
            </button>
        </form>

    )
}

export default FormularioContacto