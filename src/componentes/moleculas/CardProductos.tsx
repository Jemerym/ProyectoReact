import Boton from "../atomos/Boton";
import BotonEliminar from "../atomos/BotonEliminar";
import BotonModificar from "../atomos/BotonModificar";
interface CardProductosProps {
  id: number;
  codigo: string;
  nombre: string;
  categoria: string;
  stock: number;
  precio: number;
  descripcion: string;
  imagen: string;
  //se asignan como bolean 
  onEliminar?: () => void;
  onModificar?: () => void;
}
function CardProductos({ id, nombre, categoria, stock, precio, descripcion, imagen, onEliminar, onModificar }: CardProductosProps) {
    return (
        <div className="card-container">
            
            <div className="card h-100" >
                <div className="bg-white p-2 d-flex ">
                <span className="bg-secondary text-white fw-bold px-3 py-1 rounded-pill small">
                    {categoria}
                </span>
                <span className="bg-warning text-dark fw-bold px-3 py-1 rounded-pill small ms-auto">
                    Stock: {stock}
                </span>
                </div>
                <img

                    src = {imagen}
                    className = "card-img-top"
                    alt = {nombre}
                    style={{height: '200px', objectFit: 'contain'}}
                />

                <div className="card-body d-flex flex-column">
                    <h5 className = "card-title fw-bold">
                        {nombre}
                    </h5>
                    <p className = "card-text">
                        {descripcion}
                    </p>

                    <h4 className = "card-text fw-bold">
                    ${Number(precio).toLocaleString('es-CL')}
                    </h4>
                    <div className="d-flex gap-4 mt-auto">
                        <Boton id={id}/>
                    </div>
                    {/*nuevo botones que se muestran dependiendo del rol del usuario */}
                    {(onModificar || onEliminar) && (
                    <div className="d-flex gap-2 mt-2">
                        {onModificar && <BotonModificar alClickear={onModificar} />}
                        {onEliminar && <BotonEliminar alClikear={onEliminar} />}
                    </div>
)}
                </div>
            </div>
        </div>
        
    )

}

export default CardProductos