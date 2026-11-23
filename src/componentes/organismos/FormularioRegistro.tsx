import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";
import { API, leerError } from "../../api/config";

function FormularioRegistro() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [enviando, setEnviando] = useState(false);

  const navegacion = useNavigate();

  const manejarRegistro = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (enviando) return;

    if (nombre.trim() === "") {
      alert("Debe ingresar su nombre");
      return;
    }
    if (correo.trim() === "") {
      alert("Debe ingresar su correo");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      alert("Ingrese un correo válido");
      return;
    }
    if (contraseña.trim() === "") {
      alert("Debe ingresar su contraseña");
      return;
    }
    // El microservicio exige mínimo 4 caracteres
    if (contraseña.length < 4) {
      alert("La contraseña debe tener al menos 4 caracteres");
      return;
    }
    if (contraseña !== confirmarPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    setEnviando(true);
    try {
      // La contraseña viaja al microservicio y ahí se guarda con hash (BCrypt), nunca en localStorage.
      const respuesta = await fetch(`${API}/usuarios/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombre.trim(), correo: correo.trim(), password: contraseña }),
      });

      if (!respuesta.ok) {
        // 409 = "El correo ya está registrado"
        alert(await leerError(respuesta, "No se pudo completar el registro"));
        return;
      }

      alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
      navegacion("/login");
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("No se pudo conectar con el servidor. Intente nuevamente.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={manejarRegistro} noValidate>
      <CampoFormulario
        etiqueta="Nombre"
        tipo="text"
        nombre="nombre"
        valor={nombre}
        alCambiar={setNombre}
      />

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

      <button type="submit" className="btn btn-warning w-100 fw-bold mt-3" disabled={enviando}>
        {enviando ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
}

export default FormularioRegistro;
