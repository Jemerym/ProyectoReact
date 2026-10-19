import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Importamos useNavigate

import CampoFormulario from "../moleculas/CampoFormulario";

function FormularioLogin() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navegacion = useNavigate();   

  // Valida los datos al enviar el formulario
    const manejarEnvio = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault(); // evita recargar la pagina

    if (correo.trim() === "") {
      alert("Debe ingresar su correo");
      return;
    }

    // Comprueba que el correo tenga un formato valido
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      alert("Ingresar un correo valido");
      return;
    }

    // Validamos la contraseña
    if (contraseña.trim() === "") {
      alert("Debe ingresar su contraseña");
      return;
    }
    // Si como admin
    if (correo === "admin@demo.com" && contraseña === "1234") {
      alert("¡Acceso de administrador!");
      localStorage.setItem("usuarioActivo", JSON.stringify({ correo, rol: "admin" }));
      navegacion("/admin");
      return;
    }

    //el usuario almacenado del localstorage se guarda en una constante para validar si existe
    const usuarioGuardado = localStorage.getItem("usuarioRegistrado");
    //validacion de si existe o no un usuario 
    if (!usuarioGuardado) {
      alert("No hay ningún usuario registrado");
      return;
    }
    //almacenan los datos del usuario guardado para validar si los datos ingresados son correctos
    const { correo: correoGuardado, contraseña: passwordGuardado } = JSON.parse(usuarioGuardado);

    if (correo === correoGuardado && contraseña === passwordGuardado) {
      const esAdmin = correo.toLowerCase().includes("admin");
      const rol = esAdmin ? "admin" : "usuario";

      localStorage.setItem("usuarioActivo", JSON.stringify({ correo, rol }));

      if (esAdmin) {
        alert("¡Acceso de administrador!");
        navegacion("/admin");
      } else {
        alert("¡Inicio de sesión exitoso!");
        navegacion("/");
      }
    } 
    else {
      alert("Correo o contraseña incorrectos");
    }
  };

  return (
    <form onSubmit={manejarEnvio} noValidate>
      <CampoFormulario
        etiqueta="Correo electronico"
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

      <button type="submit" className="btn btn-warning w-100 fw-bold mt-3">
        Iniciar Sesión
      </button>
    </form>
  );
}

export default FormularioLogin;