function BotonCarrito() {
    const añadido = () =>{
        if (window.confirm("Estas seguro de añadir este producto?")) {
            console.log("Añadido");
        }
    };
    
    return (

        <button className="btn btn-secondary" onClick={añadido}>
            Añadir al carro
        </button>
        
    );
}

export default BotonCarrito
