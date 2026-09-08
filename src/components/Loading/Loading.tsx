import { useEffect, useState } from 'react';
import styles from './Loading.module.css';

type LoadingProps = {
  message?: string;
  slowMessage?: string;
  slowAfterMs?: number;
};

export function Loading({
  message = 'Carregando...',
  slowMessage,
  slowAfterMs = 5000,
}: LoadingProps) {
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    if (!slowMessage) return;
    const timeout = setTimeout(() => setIsSlow(true), slowAfterMs);

    return () => clearTimeout(timeout);
  }, [slowMessage, slowAfterMs]);

  return (
    <div className={styles.container} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <p className={styles.message}>{isSlow && slowMessage ? slowMessage : message}</p>
    </div>
  );
}
