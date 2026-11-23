import { API } from "../api/config";
import { useEffect, useState } from 'react';
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

function Admin(){
    const [productos,setProductos] = useState<Producto[]>([]);

    useEffect(() => {
        fetch(`${API}/productos`)
            .then((res) => {
                if (!res.ok) throw new Error("Error al cargar productos");
                return res.json();
            })
            .then((data) => setProductos(data))
            .catch((err) => console.error("Error cargando productos en admin:", err));
    }, []);

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
                            {[...productos.slice(0, 4), ...productos.slice(0, 4)].map((producto, index) => (
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

export default Admin;