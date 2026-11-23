import { useEffect, useState } from "react";
import { API, leerError } from "../api/config";
import { obtenerUsuario, type UsuarioSesion } from "../api/sesion";

// Panel del administrador: lista de usuarios, cambiar rol y eliminar.
function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState<UsuarioSesion[]>([]);
  const yo = obtenerUsuario();

  const cargarUsuarios = () => {
    fetch(`${API}/usuarios`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar usuarios");
        return res.json();
      })
      .then((datos) => setUsuarios(datos))
      .catch(() => alert("No se pudieron cargar los usuarios"));
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cambiarRol = async (u: UsuarioSesion) => {
    const nuevoRol = u.rol === "ADMIN" ? "CLIENTE" : "ADMIN";
    if (!window.confirm(`¿Cambiar el rol de ${u.correo} a ${nuevoRol}?`)) return;
    try {
      const res = await fetch(`${API}/usuarios/${u.id}/rol?rol=${nuevoRol}`, { method: "PUT" });
      if (!res.ok) throw new Error(await leerError(res, "No se pudo cambiar el rol"));
      cargarUsuarios();
    } catch (error) {
      alert(error instanceof Error ? error.message : "No se pudo cambiar el rol");
    }
  };

  const eliminar = async (u: UsuarioSesion) => {
    if (!window.confirm(`¿Eliminar al usuario ${u.correo}?`)) return;
    try {
      const res = await fetch(`${API}/usuarios/${u.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await leerError(res, "No se pudo eliminar el usuario"));
      cargarUsuarios();
    } catch (error) {
      alert(error instanceof Error ? error.message : "No se pudo eliminar el usuario");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center fw-bold">Usuarios</h2>
      <div className="card shadow-sm p-3">
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.nombre}</td>
                  <td>{u.correo}</td>
                  <td>
                    <span className={`badge ${u.rol === "ADMIN" ? "bg-dark" : "bg-secondary"}`}>{u.rol}</span>
                  </td>
                  <td>
                    {/* El admin no puede quitarse el rol ni eliminarse a sí mismo */}
                    {u.id !== yo?.id && (
                      <div className="d-flex gap-2">
                        <button className="btn btn-outline-dark btn-sm" onClick={() => cambiarRol(u)}>
                          {u.rol === "ADMIN" ? "Quitar admin" : "Hacer admin"}
                        </button>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => eliminar(u)}>
                          Eliminar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminUsuarios;
