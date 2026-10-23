function Nosotros() {
    return (
        
        <div className="container mt-4 text-center" style={{ maxWidth: '800px' }}>
            <div>
                <br />
            <h1>Sobre nosotros</h1>
            <p>Gas a domicilio, rapido y al mejor precio</p>
            <br />
            </div>
            <div className='card bg-dark text-white shadow-sm p-4 rounded-4' >
                <div className='row align-items-center'>
                    <div className='col-md-6'>
                        <h3 className='text-warning'>¿Quienes somos en El Volcan?</h3>
                        <p className='text-light '>
                            Somos una empresa familiar con años de trayectoria entregando energia y confianza a hogares y negocios.
                            Nos especializamos en la distribucion rapida y segura de cilindros de gas licuado, 
                            llegando directo a tu puerta con el compromiso de un servicio eficiente.
                        </p>
                    </div>
                    <div className='col-md-6 text-center'>
                    <img src='/img/nosotros.png' 
                         alt='Sobre nosotros' 
                         className='img-fluid rounded' />
                    </div>
                </div>
            </div>

            <section className="container mt-5">
            <div className='row text-center g-4 mb-3'>
                <div className='col-md-4'>
                    <div className='bg-dark text-white card border shadow-sm p-3 rounded-4 h-100'>
                        <h4 className='text-warning'>Rapidez</h4>
                        <p className='text-light'>
                            Entregamos tu gas a domicilio en el menor tiempo posible.
                        </p>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='bg-dark text-white card border shadow-sm p-3 rounded-4 h-100'>
                        <h4 className='text-warning'>Seguridad</h4>
                        <p className='text-light'>
                            Trabajamos con productos de calidad y cumplimos con todas las normas de seguridad.
                        </p>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='bg-dark text-white card border shadow-sm p-3 rounded-4 h-100'>
                        <h4 className='text-warning'>Calidad</h4>
                        <p className='text-light'>
                            Ofrecemos productos de alta calidad y servicio excepcional.
                        </p>
                    </div>
                </div>
            </div>
            </section>
            <br /> <br />
            <section>
                <div className='row g-4 mb-4'>
                    <div className='col-md-6'>
                        <div className="p-4 bg-dark text-light rounded-4">
                            <h3 className="text-warning">Misión</h3>
                            <p>Brindar un serviciode distribucion de gas eficiente y seguro para cada hogar.</p>
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className='p-4 bg-dark text-light rounded-4'>
                            <h3 className='text-warning'>Vision</h3>
                            <p>Ser la distribuidora de gas preferida y lider en la region por nuestra rapidez</p>
                        </div>

                    </div>

                </div>
            </section>

        </div>
            
    )
}

export default Nosotros