import { useCallback, useEffect, useState } from 'react';
import { getPlayers } from '../services/players';
import type { Player } from '../types/player';

export function usePlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPlayers = useCallback(() => {
    getPlayers()
      .then(setPlayers)
      .catch((error) => {
        console.error(error);
        setError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  const retry = useCallback(() => {
    setIsLoading(true);
    setError(false);
    fetchPlayers();
  }, [fetchPlayers]);

  return { players, isLoading, error, retry };
}
