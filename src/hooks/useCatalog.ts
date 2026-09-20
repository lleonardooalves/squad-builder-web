import { useState } from 'react';
import type { PlayerPosition } from '../types/player';
import { usePlayers } from './usePlayers';

export type PositionFilterValue = PlayerPosition | 'all';

export function useCatalog() {
  const { players, isLoading, error, retry } = usePlayers();

  const [search, setSearch] = useState('');
  const [position, setPosition] = useState<PositionFilterValue>('all');

  const term = search.trim().toLowerCase();

  const filteredPlayers = players
    .filter((player) => position === 'all' || player.position === position)
    .filter((player) => player.name.toLowerCase().includes(term));

  return {
    players,
    isLoading,
    error,
    retry,
    filteredPlayers,
    search,
    setSearch,
    position,
    setPosition,
  };
}
