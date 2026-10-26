function Footer() {
    return(
        <footer className="bg-dark text-white py-5 mt-5">
            <div className="container text-center">
                <h3 className='mb-3 text-warning'>El Volcan</h3>
                <p className='text-light'>Gas a domicilio, rapido, seguro y al mejor precio para tu hogar o negocio</p>
                <div className="d-flex justify-content-center gap-3 mt-5 small">
                    <a href="/" className='text-white text-decoration-underline'>Inicio</a>
                    <a href="/productos" className='text-white text-decoration-underline'>Catalogo</a>
                    <a href="/nosotros" className='text-white text-decoration-underline'>Nosotros</a>
                    <a href="/contacto" className='text-white text-decoration-underline'>Contacto</a>
                </div>
                <div className='text-light small'>
                    <p>&copy; 2023 El Volcan. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;  