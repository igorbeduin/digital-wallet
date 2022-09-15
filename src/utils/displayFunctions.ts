export function formatNumberToCurrencyString(number) {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(number);
}

export function formatCurrencyStringToNumber(numberString) {
  return Number(numberString.replace(".", "").replace(",", "."));
}
