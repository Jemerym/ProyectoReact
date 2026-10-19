import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardProductos from '../componentes/moleculas/CardProductos';
import { productos } from './Productos';

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
const prod = [...productos]
    return (
        <div className="container mt-4">
            <img src='/img/Banner.png'
                 alt="banner"
                 className="img-fluid"
                 style={{ borderRadius: '10px'}} />    
            <div className="container mt-4 text-center">
                <h1>Descubre los servicios y productos que ofrecemos</h1>
                <p>
                    Las opciones ideales para tu necesidad, al alcance de un click.
                </p>
<div className="mt-4">
    <h2>Productos destacados</h2>
    <div className="carrusel-contenedor">
        <div className="carrusel">
            {[...prod.slice(0, 4), ...prod.slice(0, 4)].map((producto, index) => (
                <div className="carta" key={`${producto.id}-${index}`}>
                    <CardProductos
                        id={producto.id}
                        nombre={producto.nombre}
                        codigo={producto.codigo}
                        categoria={producto.categoria}
                        stock={producto.stock}
                        precio={producto.precio}
                        descripcion={producto.descripcion}
                        imagen={producto.imagen}
                    />
                </div>
            ))}
        </div>
    </div>
</div>
            </div>
        </div>
    );
}

export default Inicio;