import { useEffect, useState } from 'react';
import { getPlayers } from '../services/players';
import type { Player } from '../types/player';

export function usePlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPlayers()
      .then(setPlayers)
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  return { players, isLoading };
}
