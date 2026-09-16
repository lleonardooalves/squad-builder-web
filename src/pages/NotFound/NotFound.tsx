import { Link } from 'react-router';
import styles from './NotFound.module.css';

export function NotFound() {
  return (
    <main className={styles.container}>
      <p className={styles.code}>404</p>
      <h2 className={styles.title}>Página não encontrada</h2>
      <p className={styles.message}>O endereço que você abriu não existe ou foi movido</p>
      <Link to="/" className={styles.link}></Link>
    </main>
  );
}
