import type { PlayerForm } from '../types/player';

export function getPlayerFormModifier(form: PlayerForm) {
  if (form === 'hot') return 2;
  if (form === 'cold') return -2;

  return 0;
}

export function getPlayerFormLabel(form: PlayerForm) {
  if (form === 'hot') return 'In Form';
  if (form === 'cold') return 'Bad Form';

  return 'Normal Form';
}
