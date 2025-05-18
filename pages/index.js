import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [clientes, setClientes] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_CLIENTES_API)
      .then(res => setClientes(res.data))
      .catch(() => setClientes([]));

    axios.get(process.env.NEXT_PUBLIC_RESERVAS_API)
      .then(res => setReservas(res.data))
      .catch(() => setReservas([]));

    axios.get(process.env.NEXT_PUBLIC_MENU_API)
      .then(res => setMenu(res.data))
      .catch(() => setMenu([]));
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>🍝 Sistema de reservas para restaurantes</h1>
        <p className={styles.subtitle}>Cocina de estilo italiano en el corazón de tu ciudad</p>
        <div className={styles.buttons}>
        <a className={styles.button} href="#clientes">Clientes</a>
          <a className={styles.button} href="#menu">Nuestro menú</a>
          <a className={styles.button} href="#reservas">Reservar mesa</a>
        </div>
      </header>

      <main className={styles.main}>
      <section id="clientes" className={styles.section}>
      <h2 className={styles.sectionTitle}>👥 Clientes</h2>
  <ul className={styles.sectionList}>
    {clientes.map((c, i) => (
      <li key={i}>{c.nombre} - {c.email}</li>
     ))}
  </ul>
       </section>

        <section id="reservas" className={styles.section}>
        <h2 className={styles.sectionTitle}>📅 Reservas</h2>
  <ul className={styles.sectionList}>
    {reservas.map((r, i) => (
      <li key={i}>{r.fecha} - Mesa: {r.mesa}</li>
    ))}
  </ul>
</section>

        <section id="menu" className={styles.section}>
        <h2 className={styles.sectionTitle}>📜 Menú</h2>
  <ul className={styles.sectionList}>
    {menu.map((p, i) => (
      <li key={i}>{p.nombre} - ${p.precio}</li>
    ))}
  </ul>
</section>
      </main>
    </div>
  );
}
