export function formatNumber(value: string) {
  let [integerPart, decimalPart] = value.split('.');

  if (integerPart.length >= 4) {
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  if (decimalPart && decimalPart.length > 2) {
    decimalPart = decimalPart.substring(0, 2);
  }

  return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
}