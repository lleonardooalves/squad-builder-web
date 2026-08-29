export function getRatingTier(rating: number) {
  if (rating >= 80) return 'gold';
  if (rating >= 70) return 'silver';
  if (rating >= 60) return 'bronze';
  return 'default';
}
