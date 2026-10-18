import { Link } from 'react-router-dom'

interface BotonProps {
    id: number;
}

function Boton({ id }: BotonProps) {

    return (
        <Link
            to={`/producto/${id}`}
            className='btn btn-primary w-100' 
        >
            Ver producto
        </Link>
    )
}

export default Boton