import type { PositionFilterValue } from '../../hooks/useCatalog';
import styles from './PositionFilter.module.css';

type PositionFilterProps = {
  value: PositionFilterValue;
  onChange: (value: PositionFilterValue) => void;
};

const options: { value: PositionFilterValue; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'ATT', label: 'ATT' },
  { value: 'DEF', label: 'DEF' },
  { value: 'GK', label: 'GK' },
  { value: 'MID', label: 'MID' },
];

export function PositionFilter({ value, onChange }: PositionFilterProps) {
  return (
    <div className={styles.container}>
      {options.map((option) => (
        <button
          className={`${styles.button} ${value === option.value ? styles.active : ''}`}
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
