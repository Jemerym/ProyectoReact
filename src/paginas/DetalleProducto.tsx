import { useParams} from "react-router-dom"
import BotonVolver from "../componentes/atomos/BotonVolver"

const productos = [
    {
        id: 1,
        codigo: "CL001",
        nombre: "Cilindro GLP 5 kg",
        categoria: "Cilindros de Gas",
        stock: 8,
        precio: 6500,
        descripcion: "Cilindro de gas licuado de petróleo 5 kg. Para uso residencial (cocina, calefacción pequeña).",
        imagen: '/img/5kg.jpg'
    },
    {  
        id: 2,
        codigo: "CL002",
        nombre: "Cilindro GLP 11 kg",
        categoria: "Cilindros de Gas",
        stock: 12,
        precio: 12000,
        descripcion: "Cilindro estándar doméstico. El más utilizado en hogares chilenos. Compatible con reguladores estándar.",
        imagen: '/img/11kg.jpg'
    }


]

function DetalleProducto() {
    const { id } = useParams()

    const producto = productos.find(
        producto => producto.id === Number(id)
    )

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
            <p>Stock: {producto?.stock}</p>
            <p>Precio: ${producto?.precio}</p>
            <p>Descripcion: {producto?.descripcion}</p>

            <BotonVolver />
        </div>
    )
}

export default DetalleProducto