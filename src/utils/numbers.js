export function formatValuePrices(num) {
  if (num >= 1_000_000_000_000) {
    return (num / 1_000_000_000_000).toFixed(1) + "T"; // 1 Billion or more
  } else if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + "B"; // 1 Million or more
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "M"; // 1 Million or more
  } else {
    return num?.toString(); // Less than 1 Million
  }
}
