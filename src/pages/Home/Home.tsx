import { ErrorState } from '../../components/ErrorState/ErrorState';
import { Loading } from '../../components/Loading/Loading';
import { PlayerCard } from '../../components/PlayerCard/PlayerCard';
import { usePlayers } from '../../hooks/usePlayers';
import styles from './Home.module.css';

export function Home() {
  const { players, isLoading, error, retry } = usePlayers();

  if (isLoading) {
    return (
      <Loading
        message="Carregando jogadores..."
        slowMessage="A API está acordando. Isso pode levar até um minuto."
      />
    );
  }

  if (error) {
    return <ErrorState message="Não foi possível carregar os jogadores" onRetry={retry} />;
  }

  return (
    <main className={styles.container}>
      <div className={styles.grid}>
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </main>
  );
}
