import { PlayerCard } from '../../components/PlayerCard/PlayerCard';
import { usePlayers } from '../../hooks/usePlayers';
import styles from '../Home/Home.module.css';

export function Home() {
  const { players, isLoading } = usePlayers();

  if (isLoading) {
    return <p>Carregando jogadores...</p>;
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
