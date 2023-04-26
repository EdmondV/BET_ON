export const round = (value, decimals) => (value && value.toFixed) ? value.toFixed(decimals) : 0;

export function convertTimeframe(val) {
  switch (val) {
    case '1h':
      return 3600;
    default:
      return parseFloat(val.replace(/\D+/g, '')) * 60;
  }
}

export const convertShortAsset = (i) => ({ timestamp: i.t * 1000, value: i.v });
