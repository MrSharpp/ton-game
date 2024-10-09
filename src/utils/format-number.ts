export function formatNumber(count: number) {
  if (count < 1000) return count / 1000 + "K";
  return count;
}
