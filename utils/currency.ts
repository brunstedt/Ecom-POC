export default function localeCurrency({
    amount,
    decimals,
}: {
    amount: number
    decimals?: number
  }): string {
    return new Intl.NumberFormat('sv-SE', {
        style: 'currency',
        currency: 'SEK',
        maximumFractionDigits: decimals || 0,
    }).format(amount)
}
  