import { color, hexToRgb } from 'styles-constants';

const opacityWhite = `rgba(${hexToRgb(color.mainFontColor)}, 0.5)`;
const opacifiedBorder = `1px solid ${opacityWhite}`;

export {
  opacityWhite,
  opacifiedBorder,
};
