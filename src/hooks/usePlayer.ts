import { useEffect, useState } from 'react';
import type { Player } from '../types/player';
import { getPlayerById } from '../services/players';

export function usePlayer(id: string | undefined) {
  const [player, setPlayer] = useState<Player | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    getPlayerById(id)
      .then(setPlayer)
      .catch((requestError) => {
        console.error(requestError);
        setError(true);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  return { player, isLoading, error };
}
