import styles from './SearchBar.module.css';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className={styles.container}>
      <input
        type="search"
        className={styles.input}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar por nome"
        aria-label="Buscar jogadores por"
      />
      {value && (
        <button
          className={styles.clear}
          type="button"
          onClick={() => onChange('')}
          aria-label="Limpar busca"
        >
          x
        </button>
      )}
    </div>
  );
}
