/**
 * @param {number} value
 * @param {{}} meta
 * @returns {number}
 */
export function getXPercent(value, meta) {
  return 100 * (value - meta.x.min) / (meta.x.max - meta.x.min);
}

/**
 * @param {number} value
 * @param {{}} meta
 * @returns {number}
 */
export function getYPercent(value, meta) {
  return 100 * (meta.y.max - value) / (meta.y.max - meta.y.min);
}

/**
 * Calculate diff text between two points
 * @param {number} v1 First number
 * @param {number} v2 Second number
 * @param {number} decimals
 * @returns {*}

 */
export function diffText(v1 = 0, v2 = 0, decimals) {
  const value1 = v1.toFixed(decimals);
  const value2 = v2.toFixed(decimals);

  if (!value1.length || !value2.length) return { left: '', right: '' };

  for (let i = 0, l = value1.length; i < l; i += 1) {
    if (value1[i] !== value2[i]) {
      return {
        left: value1.substring(0, i),
        right: value1.substring(i),
      };
    }
  }

  return {
    left: value1,
    right: '',
  };
}
