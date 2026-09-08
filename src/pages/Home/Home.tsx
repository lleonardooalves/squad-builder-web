import { Loading } from '../../components/Loading/Loading';
import { PlayerCard } from '../../components/PlayerCard/PlayerCard';
import { usePlayers } from '../../hooks/usePlayers';
import styles from './Home.module.css';

export function Home() {
  const { players, isLoading } = usePlayers();

  if (isLoading) {
    return (
      <Loading
        message="Carregando jogadores..."
        slowMessage="A API está acordando. Isso pode levar até um minuto."
      />
    );
  }

  return (
    <main className={styles.container}>
      <h1>Squad Builder</h1>
      <div className={styles.grid}>
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </main>
  );
}
