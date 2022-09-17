export function formatNumberToCurrencyString(numberString: number | string) {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(Number(numberString));
}

export function formatCurrencyStringToNumber(numberString: string) {
  return Number(numberString.replace(".", "").replace(",", "."));
}
