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

            <div className='container mt-4 text-center'>
                <div className="text-center mb-4">
                    <h2>¿Por que elegir El Volcan?</h2>
                    <p className="text-muted">Ventajas pensadas para tu comodidad y tranquilidad</p>
                </div>
                <div className="row g-4">
                    <div className="col-12 col-sm-6 col-md-3">
                        <div className="bg-dark text-white card border shadow-sm p-3 rounded-4 h-100">
                            <h3 className="text-warning">Entrega Express</h3>
                            <p className="text-light">Llegamos a tu domicilio en tiempo record para que no te quedes sin gas</p>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3">
                        <div className="bg-dark text-white card border shadow-sm p-3 rounded-4 h-100">
                            <h3 className="text-warning">Pago Seguro</h3>
                            <p className="text-light">Aceptamos tarjetas de debito, credito, efectivo y transferencias al recibir</p>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3">
                        <div className="bg-dark text-white card border shadow-sm p-3 rounded-4 h-100">
                            <h3 className="text-warning">Cilindros Seguros</h3>
                            <p className="text-light">Todos nuestros envases cumplen con estrictos controles de seguridad e higiene</p>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3">
                        <div className="bg-dark text-white card border shadow-sm p-3 rounded-4 h-100">
                            <h3 className="text-warning">Atencion Directa</h3>
                            <p className="text-light">Soporte rapido para resolver tus dudas antes, durante y despues de tu pedido</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
            
    );
}

export default Inicio;