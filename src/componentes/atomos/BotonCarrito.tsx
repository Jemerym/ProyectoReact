function BotonCarrito({ onClick }: { onClick?: () => void }) {
    
    return (

        <button className="btn btn-secondary" onClick={onClick}>
            Añadir al carro
        </button>
        
    );
}

export default BotonCarrito
