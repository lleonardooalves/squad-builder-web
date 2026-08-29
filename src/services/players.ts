import { API_URL } from '../config/api';
import type { Player } from '../types/player';

export async function getPlayers(): Promise<Player[]> {
  const response = await fetch(`${API_URL}/players`);

  if (!response.ok) {
    throw new Error('Failed to fetch players');
  }

  return response.json();
}

export async function getPlayerById(id: string): Promise<Player> {
  const response = await fetch(`${API_URL}/players/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch player');
  }

  return response.json();
}
