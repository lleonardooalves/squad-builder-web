import { Link, useParams } from 'react-router';
import { ErrorState } from '../../components/ErrorState/ErrorState';
import { Loading } from '../../components/Loading/Loading';
import { usePlayer } from '../../hooks/usePlayer';
import { getPlayerFormLabel, getPlayerFormModifier } from '../../utils/getPlayerForm';
import { getRatingTier } from '../../utils/getRatingTier';
import styles from './PlayerDetail.module.css';

export function PlayerDetail() {
  const { id } = useParams();
  const { player, isLoading, error } = usePlayer(id);

  if (isLoading) {
    return <Loading message="Carregando jogador..." />;
  }

  if (error || !player) {
    return <ErrorState message="Jogador não encontrado" />;
  }

  const tier = getRatingTier(player.rating);
  const modifier = getPlayerFormModifier(player.form);

  const attributes =
    player.position === 'GK'
      ? [
          { label: 'Reflexes', base: player.attributes.reflexes },
          { label: 'Handling', base: player.attributes.handling },
          { label: 'Diving', base: player.attributes.diving },
          { label: 'Positioning', base: player.attributes.positioning },
          { label: 'Kicking', base: player.attributes.kicking },
        ]
      : [
          { label: 'Pace', base: player.attributes.pace },
          { label: 'Passing', base: player.attributes.passing },
          { label: 'Finishing', base: player.attributes.fin },
          { label: 'Dribbling', base: player.attributes.dribbling },
          { label: 'Defense', base: player.attributes.defense },
        ];

  return (
    <main className={styles.container}>
      <Link to="/" className={styles.back}>
        ← Voltar para o catálogo
      </Link>

      <article className={styles.card}>
        <img className={styles.image} src={player.image} alt={player.name} />

        <div>
          <div className={styles.header}>
            <div>
              <h2 className={styles.name}>{player.name}</h2>
              <p className={styles.meta}>
                {player.team} · {player.position}
              </p>

              <div className={styles.badges}>
                <span className={`${styles.form} ${styles[player.form]}`}>
                  {getPlayerFormLabel(player.form)}
                </span>
              </div>
            </div>

            <span className={`${styles.rating} ${styles[tier]}`}>{player.rating}</span>
          </div>

          <p className={styles.price}>€ {player.price}M</p>

          <h3 className={styles.sectionTitle}>Atributos</h3>

          <ul className={styles.attributes}>
            {attributes.map((attribute) => (
              <li key={attribute.label} className={styles.attribute}>
                <span className={styles.label}>{attribute.label}</span>

                <span className={styles.value}>
                  {attribute.base + modifier}
                  {modifier !== 0 && (
                    <span className={`${styles.delta} ${modifier > 0 ? styles.up : styles.down}`}>
                      {modifier > 0 ? `+${modifier}` : modifier}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </main>
  );
}
