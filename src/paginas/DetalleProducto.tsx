
import { useParams } from "react-router-dom";
import BotonVolver from "../componentes/atomos/BotonVolver";
import { useState } from "react";
import BotonCarrito from "../componentes/atomos/BotonCarrito";
import { productos } from "./Productos";
function DetalleProducto() {
    const { id } = useParams()

    const producto = productos.find(
        producto => producto.id === Number(id)
    )

    const [stockActual, setStockActual] = useState(producto ? producto.stock : 0)

    const agregar = () => {
        if(stockActual > 0) {
            if (window.confirm("Estas seguro de añadir este producto?")) {
                if (producto) {
                    producto.stock = producto.stock - 1;
                }
                setStockActual(stockActual - 1);
                alert("Producto añadido")
            }
        }else{
            alert("Producto sin stock")
        }
    };

    return(
        <div className="container mt-5">
            <h1>Detalle del producto</h1>

            <img src={producto?.imagen}
            alt={producto?.nombre} 
            style={{height: '200px', objectFit: 'contain'}}   
        />

            <h2>{producto?.nombre}</h2>
            <p>Codigo: {producto?.codigo}</p>
            <p>Categoria: {producto?.categoria}</p>
            <p>Stock: {stockActual}</p>
            <p>Precio: ${producto?.precio}</p>
            <p>Descripcion: {producto?.descripcion}</p>
            <div>
                <BotonCarrito onClick={agregar} />
            </div>
            <BotonVolver />
        </div>
    )
}

export default DetalleProducto