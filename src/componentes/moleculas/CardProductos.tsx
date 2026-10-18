import Boton from "../atomos/Boton";
import BotonCarrito from "../atomos/BotonCarrito";

interface CardProductosProps {
    id : number;
    codigo : string;
    nombre : string;
    categoria : string;
    stock : number;
    precio : number;
    descripcion : string;
    imagen : string;
}

function CardProductos({ id , codigo , nombre, categoria, stock , precio, descripcion, imagen }: CardProductosProps) {

    return (
        <div className="card-container">
            
            <div className="card h-100" style={{ width: '20rem' }}>
                <div className="d-flex gap-5">
                <span className="text-secondary small">{categoria}  </span>
                <span className="text-secondary small ms-auto">Stock: {stock}</span>
                </div>
                <img

                    src = {imagen}
                    className = "card-img-top"
                    alt = {nombre}
                    style={{height: '200px', objectFit: 'contain'}}
                />

                <div className="card-body d-flex flex-column">
                    <h5 className = "card-title">
                        {nombre}
                    </h5>
                    <p className = "card-text">
                        {descripcion}
                    </p>

                    <h4 className = "card-text">
                        ${precio}
                    </h4>
                    <div className="d-flex gap-4">
                        <Boton id={id}/>
                        <BotonCarrito />
                    </div>
                </div>
            </div>
        </div>
        
    )

}

export default CardProductos