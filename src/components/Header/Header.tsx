import { Link, useLocation } from 'react-router';
import { useAuthStore } from '../../stores/authStore';
import styles from './Header.module.css';

export function Header() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.brandLink} to={'/'}>
          <h1 className={styles.brand}>
            Squad <span className={styles.brandAccent}>Builder</span>
          </h1>
        </Link>
        {user ? (
          <div className={styles.session}>
            <span className={styles.user}>{user.name ?? user.email}</span>
            <button className={styles.logout} type="button" onClick={logout}>
              Sair
            </button>
          </div>
        ) : (
          <Link className={styles.login} to="/login" state={{ from: location.pathname }}>
            Entrar
          </Link>
        )}
      </div>
    </header>
  );
}
