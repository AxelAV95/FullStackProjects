import { useState, useEffect } from 'react';
import { usuariosAPI } from '../services/api';

const UserList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: '', email: '' });
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      const response = await usuariosAPI.obtenerTodos();
      setUsuarios(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar usuarios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const crearUsuario = async (e) => {
    e.preventDefault();
    if (!nuevoUsuario.nombre || !nuevoUsuario.email) return;

    try {
      await usuariosAPI.crear(nuevoUsuario);
      setNuevoUsuario({ nombre: '', email: '' });
      cargarUsuarios();
    } catch (err) {
      setError('Error al crear usuario');
    }
  };

  const eliminarUsuario = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;

    try {
      await usuariosAPI.eliminar(id);
      cargarUsuarios();
    } catch (err) {
      setError('Error al eliminar usuario');
    }
  };

  const iniciarEdicion = (usuario) => {
    setEditando(usuario);
    setNuevoUsuario({ nombre: usuario.nombre, email: usuario.email });
  };

  const guardarEdicion = async (e) => {
    e.preventDefault();
    if (!editando || !nuevoUsuario.nombre || !nuevoUsuario.email) return;

    try {
      await usuariosAPI.actualizar(editando.id, nuevoUsuario);
      setEditando(null);
      setNuevoUsuario({ nombre: '', email: '' });
      cargarUsuarios();
    } catch (err) {
      setError('Error al actualizar usuario');
    }
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setNuevoUsuario({ nombre: '', email: '' });
  };

  if (loading) return <div className="loading">Cargando usuarios...</div>;

  return (
    <div className="user-list">
      <h2>Gestión de Usuarios</h2>
      
      {error && <div className="error">{error}</div>}

      {/* Formulario */}
      <form onSubmit={editando ? guardarEdicion : crearUsuario} className="user-form">
        <input
          type="text"
          placeholder="Nombre"
          value={nuevoUsuario.nombre}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={nuevoUsuario.email}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })}
          required
        />
        <div className="form-buttons">
          <button type="submit">
            {editando ? 'Actualizar' : 'Crear'} Usuario
          </button>
          {editando && (
            <button type="button" onClick={cancelarEdicion}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Lista de usuarios */}
      <div className="users">
        {usuarios.map((usuario) => (
          <div key={usuario.id} className="user-card">
            <div className="user-info">
              <h3>{usuario.nombre}</h3>
              <p>{usuario.email}</p>
            </div>
            <div className="user-actions">
              <button onClick={() => iniciarEdicion(usuario)}>Editar</button>
              <button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;