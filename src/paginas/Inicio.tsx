import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardProductos from '../componentes/moleculas/CardProductos';

interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  categoria: string;
  stock: number;
  precio: number;
  descripcion: string;
  imagen: string;
}

function Inicio() {
    const navegacion = useNavigate();
    const [productos, setProductos] = useState<Producto[]>([]);

    useEffect(() => {
        const sesion = localStorage.getItem("usuarioActivo");
        if (sesion) {
            const usuario = JSON.parse(sesion);
            if (usuario?.rol === "admin") {
                navegacion("/admin", { replace: true });
            }
        }
    }, [navegacion]);

    useEffect(() => {
        fetch("http://localhost:8083/api/productos")
            .then((res) => {
                if (!res.ok) throw new Error("Error al cargar productos");
                return res.json();
            })
            .then((data) => setProductos(data))
            .catch((err) => console.error("Error cargando destacados: ", err));
    }, []);

    return (
        
        <div className="container mt-4">
            <img src='/img/Banner.png'
                 alt="banner"
                 className="img-fluid"
                 style={{ borderRadius: '10px'}} />    
            <div className="container mt-4 text-center">
                <h1 className="fw-bold">Descubre los servicios y productos que ofrecemos</h1>
                <p className="fw-semibold">
                    Las opciones ideales para tu necesidad, al alcance de un click.
                </p>
                <div className="mt-4">
                    <h2 className="fw-bold">Productos destacados</h2>
                      {productos.length > 0 && (
                        <div className="carrusel-contenedor">
                            <div className="carrusel">
                                {[...productos.slice(0, 4)].map((item, index) => (
                                    <div className="carta" key={`${item.id}-${index}`}>
                                        <CardProductos
                                            id={item.id}
                                            nombre={item.nombre}
                                            codigo={item.codigo}
                                            categoria={item.categoria}
                                            stock={item.stock}
                                            precio={item.precio}
                                            descripcion={item.descripcion}
                                            imagen={item.imagen}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className='container mt-4 text-center'>
                <div className="text-center mb-4">
                    <h2 className='fw-bold'>¿Por que elegir El Volcan?</h2>
                    <p className="text-muted fw-semibold">Ventajas pensadas para tu comodidad y tranquilidad</p>
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