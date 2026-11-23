import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";
import { API } from "../../api/config";
import { guardarUsuario, type UsuarioSesion } from "../../api/sesion";

function FormularioLogin() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [enviando, setEnviando] = useState(false);
  const navegacion = useNavigate();

  const manejarEnvio = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault(); // evita recargar la pagina

    if (enviando) return;

    if (correo.trim() === "") {
      alert("Debe ingresar su correo");
      return;
    }

    // Comprueba que el correo tenga un formato valido
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      alert("Ingresar un correo valido");
      return;
    }

    if (contraseña.trim() === "") {
      alert("Debe ingresar su contraseña");
      return;
    }

    setEnviando(true);
    try {
      // El microservicio de usuarios compara la contraseña con el hash guardado (BCrypt).
      const respuesta = await fetch(`${API}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: correo.trim(), password: contraseña }),
      });

      if (respuesta.status === 401) {
        alert("Correo o contraseña incorrectos");
        return;
      }
      if (!respuesta.ok) {
        throw new Error(`Error HTTP ${respuesta.status}`);
      }

      // Respuesta: { id, nombre, correo, rol } (sin contraseña)
      const usuario: UsuarioSesion = await respuesta.json();
      guardarUsuario(usuario);

      if (usuario.rol === "ADMIN") {
        alert("¡Acceso de administrador!");
        navegacion("/admin");
      } else {
        alert("¡Inicio de sesión exitoso!");
        navegacion("/");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("No se pudo conectar con el servidor. Intente nuevamente.");
    } finally {
      setEnviando(false);
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

      <button type="submit" className="btn btn-warning w-100 fw-bold mt-3" disabled={enviando}>
        {enviando ? "Ingresando..." : "Iniciar Sesión"}
      </button>
    </form>
  );
}

export default FormularioLogin;
