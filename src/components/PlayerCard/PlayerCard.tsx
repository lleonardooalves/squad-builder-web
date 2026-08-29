import { useState } from 'react';
import type { Player } from '../../types/player';
import { getRatingTier } from '../../utils/getRatingTier';
import styles from '../PlayerCard/PlayerCard.module.css';

type PlayerCardProps = {
  player: Player;
};

export function PlayerCard({ player }: PlayerCardProps) {
  const [imageError, setImageError] = useState(false);
  const tier = getRatingTier(player.rating);

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        {imageError ? (
          <div className={styles.imagePlaceholder}>👤</div>
        ) : (
          <img
            className={styles.image}
            src={player.image}
            alt={player.name}
            onError={() => setImageError(true)}
          />
        )}

        <div className={styles.info}>
          <h3 className={styles.name}>{player.name}</h3>
          <p className={styles.team}>{player.team}</p>
          <p className={styles.position}>{player.position}</p>
        </div>
        <span className={`${styles.rating} ${styles[tier]}`}>{player.rating}</span>
      </div>
      <p className={styles.price}>€ {player.price}M</p>
    </article>
  );
}
