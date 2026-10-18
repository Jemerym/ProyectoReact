import Boton from "../atomos/Boton";

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
                <span className="badge-categoria">{categoria}  </span>
                <span className="badge-stock">Stock: {stock}</span>
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
                    <div className="mt-auto d-flex">
                        <Boton id={id}/>
                    </div>
                </div>
            </div>
        </div>
        
    )

}

export default CardProductos