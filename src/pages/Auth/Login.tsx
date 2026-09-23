import { Link, useLocation, useNavigate } from 'react-router';
import { useAuthStore } from '../../stores/authStore';
import { useState } from 'react';
import { getMe, login } from '../../services/auth';
import styles from './Auth.module.css';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = (location.state as { from?: string } | null)?.from ?? '/';

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const { access_token } = await login(email, password);
      const user = await getMe(access_token);

      setAuth(access_token, user);
      navigate(from, { replace: true });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Erro ao entrar');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Entrar</h2>
        <label className={styles.label}>
          E-mail
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </label>

        <label className={styles.label}>
          Senha
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <button className={styles.submit} type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </button>

        <p className={styles.footer}>
          Não tem conta?{' '}
          <Link className={styles.link} to={'/register'} state={{ from }}>
            Cadastre-se
          </Link>
        </p>
      </form>
    </main>
  );
}
