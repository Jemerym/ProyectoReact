import { useState } from "react";

type Props = {
    tipo: string;
    nombre: string;
    valor: string; // valor actual del campo
    alCambiar: (valor: string) => void; //funcion para actualizar el valor
}

function Input({ tipo, nombre, valor, alCambiar}: Props){
    // Solo se usa en campos de contraseña: true = se ve el texto
    const [mostrar, setMostrar] = useState(false);

    const esPassword = tipo === "password";

    const campo = (
        <input
            // Si es contraseña y se pidió mostrarla, se cambia a "text"
            type={esPassword && mostrar ? "text" : tipo}
            name={nombre}
            className = "form-control"

            // Muestra el valor guardado
            value={valor}

            // Detectamos cuando el usuario escribe
            onChange={(e) => alCambiar(e.target.value)}
        />
    );

    // Campos normales: igual que antes
    if (!esPassword) return campo;

    // Contraseña: campo + botón para mostrar u ocultar
    return(
        <div className="input-group">
            {campo}
            <button
                type="button" // para que no envíe el formulario
                className="btn btn-outline-secondary"
                onClick={() => setMostrar(!mostrar)}
                aria-label={mostrar ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
                {mostrar ? "Ocultar" : "Mostrar"}
            </button>
        </div>
    );

}

export default Input;
