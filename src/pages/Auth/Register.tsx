import { Link, useLocation, useNavigate } from 'react-router';
import { useAuthStore } from '../../stores/authStore';
import { useState } from 'react';
import { getMe, register } from '../../services/auth';
import styles from './Auth.module.css';

export function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [name, setName] = useState('');
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
      const { access_token } = await register(email, password, name || undefined);
      const user = await getMe(access_token);

      setAuth(access_token, user);
      navigate(from, { replace: true });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Erro ao cadastrar');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Registrar</h2>

        <label className={styles.label}>
          Nome
          <input
            className={styles.input}
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
          />
        </label>

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
            autoComplete="new-password"
            required
          />
        </label>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <button className={styles.submit} type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registrando...' : 'Registrar'}
        </button>

        <p className={styles.footer}>
          Já tem conta?{' '}
          <Link className={styles.link} to={'/login'} state={{ from }}>
            Entrar
          </Link>
        </p>
      </form>
    </main>
  );
}
