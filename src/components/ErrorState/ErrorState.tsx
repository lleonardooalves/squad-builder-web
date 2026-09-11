import styles from './ErrorState.module.css';

type ErrorProps = {
  message?: string;
  onRetry: () => void;
};

export function ErrorState({
  message = 'Não foi possível carregar os dados',
  onRetry,
}: ErrorProps) {
  return (
    <div className={styles.container} role="alert">
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button className={styles.button} type="button" onClick={onRetry}>
          Tentar de novo
        </button>
      )}
    </div>
  );
}
