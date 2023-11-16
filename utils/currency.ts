export default function localeCurrency({
    amount,
    decimals,
}: {
    amount: number
    decimals?: number
  }): string {
    // Custom temporary formatting for Brink: Remove last two digits since that's decimals
    amount = Math.floor(amount / 100)
    return new Intl.NumberFormat('sv-SE', {
        style: 'currency',
        currency: 'SEK',
        maximumFractionDigits: decimals || 0,
    }).format(amount)
}
  