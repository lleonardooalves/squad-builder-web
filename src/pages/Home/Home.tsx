import { ErrorState } from '../../components/ErrorState/ErrorState';
import { Loading } from '../../components/Loading/Loading';
import { PlayerCard } from '../../components/PlayerCard/PlayerCard';
import { PositionFilter } from '../../components/PositionFilter/PositionFilter';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { useCatalog } from '../../hooks/useCatalog';
import styles from './Home.module.css';

export function Home() {
  const {
    players,
    isLoading,
    error,
    retry,
    filteredPlayers,
    position,
    search,
    setPosition,
    setSearch,
  } = useCatalog();

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
      <div className={styles.filters}>
        <SearchBar value={search} onChange={setSearch} />
        <PositionFilter value={position} onChange={setPosition} />
      </div>

      <p className={styles.count}>
        {filteredPlayers.length} de {players.length} jogadores
      </p>

      {filteredPlayers.length === 0 ? (
        <p className={styles.empty}>Nenhum jogador encontrado com esses filtros.</p>
      ) : (
        <div className={styles.grid}>
          {filteredPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      )}
    </main>
  );
}
