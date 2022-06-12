export default function compare(a: string | number | null, b: string | number | null): number {
  if (a === null) {
    return -1;
  }
  if (b === null) {
    return 1;
  }

  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }

  return 0;
}
