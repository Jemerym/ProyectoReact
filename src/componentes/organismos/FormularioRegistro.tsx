import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Importamos useNavigate
import CampoFormulario from "../moleculas/CampoFormulario";

function FormularioRegistro() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  
  //permite navegar entre paginas como el link, la diferenicia es que esta es mas practica ya que le digo que tiene que hacer para llegar a dicha pagina
  const navegacion = useNavigate();   

    const manejarRegistro = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    //validacion si el correo esta vacio
    if (correo.trim() === "") {
      alert("Debe ingresar su correo");
      return;
    }
    //validacion para un formato correo valido
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      alert("Ingrese un correo válido");
      return;
    }
    //validacion si la contraseña esta vacia
    if (contraseña.trim() === "") {
      alert("Debe ingresar su contraseña");
      return;
    }
    //validacion si la contraseña es diferente a la primera 
    if (contraseña !== confirmarPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    //guarda el correo y contraña bajo el nombre usuarioRegistrado
    const nuevoUsuario = { correo, contraseña };
    localStorage.setItem("usuarioRegistrado", JSON.stringify(nuevoUsuario));
    //se cumple la condicion y nos lleva al login
    alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
    navegacion("/login"); 
  };

  return (
    <form onSubmit={manejarRegistro} noValidate>
      <CampoFormulario
        etiqueta="Correo electrónico"
        tipo="email"
        nombre="correo"
        valor={correo}
        alCambiar={setCorreo}
      />

      <CampoFormulario
        etiqueta="Contraseña"
        tipo="password"
        nombre="contraseña"
        valor={contraseña}
        alCambiar={setContraseña}
      />

      <CampoFormulario
        etiqueta="Confirmar contraseña"
        tipo="password"
        nombre="confirmarContraseña"
        valor={confirmarPassword}
        alCambiar={setConfirmarPassword}
      />

      <button type="submit" className="btn btn-warning w-100 fw-bold mt-3">
        Registrarse
      </button>

    </form>
  );
}

export default FormularioRegistro;