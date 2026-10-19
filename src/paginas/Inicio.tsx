import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Inicio() {
    const navegacion = useNavigate();

    useEffect(() => {
        const sesion = localStorage.getItem("usuarioActivo");
        if (sesion) {
            const usuario = JSON.parse(sesion);
            if (usuario?.rol === "admin") {
                navegacion("/admin", { replace: true });
            }
        }
    }, [navegacion]);

    return (
        <div className="container mt-4 text-center">
            <h1>Inicio</h1>
            <p>
                Bienvenido a nuestra tienda.
            </p>
        </div>
    );
}

export default Inicio;