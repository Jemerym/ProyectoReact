import { Link } from "react-router-dom";
import FormularioRegistro from "../componentes/organismos/FormularioRegistro";

function Registro() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow-sm p-4">
                        <h2 className="mb-4 text-center">Crear Cuenta</h2>
                        
                        <FormularioRegistro />

                        <div className="text-center mt-3">
                        <p className="mb-1 text-muted">¿Ya tiene una cuenta?</p>
                        <Link to="/Login" className="btn btn-outline-secondary w-100 fw-bold">
                            Iniciar Sesion
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registro;
