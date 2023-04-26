
export function decimalsForAsset(asset) {
  switch (asset) {
    case 'DEMO':
    case 'USDJPY':
      return 4;
    default:
      return 6;
  }
}
