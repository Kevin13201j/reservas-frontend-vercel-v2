// pages/index.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [cliente, setCliente] = useState('');
  const [comentario, setComentario] = useState('');
  const [calificacion, setCalificacion] = useState(5);

  useEffect(() => {
    obtenerResenas();
  }, []);

  const obtenerResenas = async () => {
    try {
      const res = await axios.get('/api/reviews');
      setReviews(res.data);
    } catch {
      setReviews([]);
    }
  };

  const enviarResena = async (e) => {
    e.preventDefault();
    const nueva = { cliente, comentario, calificacion: parseInt(calificacion) };

    try {
      await axios.post('/api/reviews', nueva);
      setCliente('');
      setComentario('');
      setCalificacion(5);
      obtenerResenas();
    } catch (err) {
      alert('Error al guardar la reseña.');
    }
  };

  const eliminarResena = async (id) => {
    try {
      await axios.delete(`/api/reviews/${id}`);
      obtenerResenas();
    } catch (err) {
      alert('Error al eliminar la reseña.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a1a40', color: 'white' }}>
      
      {/* Banner sin texto */}
      <div
        style={{
          backgroundImage: 'url("/fondo-reservas.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '300px'
        }}
      />

      {/* Contenido principal */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
        {/* Título movido aquí */}
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: 'white',
          textShadow: '2px 2px 4px #000',
          marginBottom: '1rem'
        }}>
          Sistema de Reseñas
        </h1>

        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Consulta y administra reseñas de clientes
        </p>

        {/* Formulario */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📝 Nueva Reseña</h2>
          <form onSubmit={enviarResena} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <input type="text" placeholder="Nombre del cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} required style={inputEstilo} />
            <textarea placeholder="Comentario" value={comentario} onChange={(e) => setComentario(e.target.value)} required rows={3} style={inputEstilo} />
            <input type="number" placeholder="Calificación (1 a 5)" value={calificacion} onChange={(e) => setCalificacion(e.target.value)} min={1} max={5} required style={inputEstilo} />
            <button type="submit" style={botonEstilo}>Enviar Reseña</button>
          </form>
        </div>

        {/* Reseñas */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📋 Reseñas Registradas</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {reviews.length === 0 && <p>No hay reseñas registradas.</p>}
            {reviews.map((r, i) => (
              <li key={i} style={{ backgroundColor: '#292b63', margin: '0.5rem auto', padding: '1rem', borderRadius: '0.5rem', width: '80%' }}>
                <strong>{r.cliente}</strong> calificó con {r.calificacion}/5
                <p style={{ margin: 0 }}>{r.comentario}</p>
                <button onClick={() => eliminarResena(r.id)} style={{ ...botonEstilo, backgroundColor: 'crimson' }}>Eliminar</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const inputEstilo = {
  width: '300px',
  padding: '0.75rem',
  borderRadius: '0.5rem',
  border: 'none',
  fontSize: '1rem'
};

const botonEstilo = {
  backgroundColor: '#ff3366',
  color: 'white',
  fontWeight: 'bold',
  padding: '0.75rem 2rem',
  borderRadius: '0.75rem',
  border: 'none',
  fontSize: '1rem',
  cursor: 'pointer'
};