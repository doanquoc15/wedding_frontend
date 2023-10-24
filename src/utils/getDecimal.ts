export function getDecimal(decimal: any) {
  if (!decimal) return;
  if (decimal?.d.length > 1) {
    const tp = Number(decimal.e) - Number(decimal.d[0].toString().length - 1);
    const format = decimal.d[0] * Math.pow(10, tp) + decimal.d[1];
    return format;
  }
  return decimal.d[0];
}
