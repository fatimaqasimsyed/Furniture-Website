// Pakistani Rupee formatter
// Prices are already in PKR

export function formatPKR(pkrPrice: number): string {
  return `Rs. ${pkrPrice.toLocaleString('en-PK')}`;
}

export function toPKR(pkrPrice: number): number {
  return Math.round(pkrPrice);
}

