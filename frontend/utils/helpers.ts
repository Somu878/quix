export function formatCurrency(num: number): string {
  if (num >= 1_000_000_000_000) {
    return (num / 1_000_000_000_000).toFixed(1) + "T";
  } else if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + "B";
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + "K";
  } else {
    return num.toFixed(2);
  }
}

export function generateTotalSupply(): string {
  const minSupply = 1_000_000;
  const maxSupply = 30_000_000;
  const totalSupply =
    Math.floor(Math.random() * (maxSupply - minSupply + 1)) + minSupply;
  return String(totalSupply);
}

export function formatDate(t: string) {
  const date = new Date(Number(t));
  const time = date.toTimeString().split(" ")[0];
  return String(time);
}
