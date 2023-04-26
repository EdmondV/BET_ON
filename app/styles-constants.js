import hexRgb from 'hex-rgb';

export const color = {
  primary: '#232c33',
  primarySecond: '#232c33',
  primaryLighted: '#2d3e4b',
  primaryDarked: 'rgb(35, 44, 51)',
  danger: '#f7412d',
  roomLoss: '#f44336',
  info: '#5bc0de',
  success: '#5cb85c',
  newSuccess: '#49b65d',
  newSuccessHover: '#40865f',
  bullColor: '#44b759',
  bearColor: '#ff8a00',
  buttonColor: '#44b759',
  lightBlue: '#5294de',
  transparent: 'transparent',
  mainFontColor: '#ffffff',
  grayFontColor: 'rgba(256,256,256,.5)',
  betsPanelBg: '#232c33',
  secondLayer: 'rgba(0, 0, 0, 0.2)',
  teamAColor: '#107f37',
  teamBColor: '#ff8a00',
  activeColor: '#fad81e',
};

export const roomPreview = {
  innerArcColor: '#4758a5',
  roomPreviewBg: '#151e43',
};

export const fontSize = {
  displayLarge: '35px',
  displayMedium: '28px',
  displaySmall: '21px',
  headingLarge: '24px',
  heading: '18px',

  bodyLarge: '16px',
  body: '14px',
  caption: '13px',
  small: '12px',
  extraSmall: '10px',
};

export const fontWeight = {
  bold: 900,
  semibold: 700,
  lightBold: 600,
  regular: 500,
  normal: 400,
  light: 300,
};

export const lineHeight = {
  // heading
  displayLarge: '42px',
  displayMedium: '42px',
  displaySmall: '21px',
  heading: '21px',
  subheading: '21px',

  // body
  body: '21px',
  caption: '21px',
};

export const borderRadius = {
  default: '0.25em',
};

const spacingFactor = 7;

export const form = {
  input: {
    fontSize: 14,
    lineHeight: 24,
    padding: 0,
    borderInactiveColor: 'rgba(256,256,256,0.4)',
    borderActiveColor: '#fff',
    focusedLabelHeight: 10,
  },
};

export const fontFamily = {
  heading: "'Lato', sans-serif",
  body: "'Lato', sans-serif",
};

export const letterSpacing = {
  large: '1.5px',
  medium: '1px',
  small: '0.5px',
};

export const zIndex = {
  chartPreloader: 20,
  recommendedRooms: 21,
  mainSidebar: 22, // including chat
  secondSidebar: 23,
  languagePanel: 24,
};

export const buttonAnimation = 'transition: all 300ms;';

/**
 * Theme
 */
export const bgColor = '#000c2a';
export const bgColorOpacity80 = 'rgba(0,12,42,.6)';
export const drawColor = 'rgba(256,256,256,.3)';
export const drawColor10 = 'rgba(256,256,256,.1)';
export const eventIconBg = 'rgba(2,13,41,.3)';

export const Team1Color = '68,183,89';
export const Team1ColorRGB = `rgb(${Team1Color})`;
export const Team2Color = '255,138,0';
export const Team2ColorRGB = `rgb(${Team2Color})`;

export const TeamAColor = '16,127,55';
export const TeamBColor = '255,138,0';

export const minPageWidth = 992;
export const leftPanelWidth = 260;
export const betsPanelWidth = 245;
export const menuWidth = 70;
export const headerHeight = 70;
export const chatWidth = 280;

/**
 * Helpers
 */

/**
 * Default padding/kerning for the app multiplied by custom value
 * @param sMultiplier {number}
 * @returns {string}
 */

export function space(sMultiplier = 1) {
  return `${spacingFactor * sMultiplier}px`;
}

/**
 * Converts hex to RGB color
 * @param colorVal {string} must be valid hex color (3 or 6 numbers)
 * @returns {string} rgbValue
 */

export function hexToRgb(colorVal) {
  return hexRgb(colorVal).join(', ');
}

/*
Returns circle
 */
export function circle() {
  return 'border-radius: 50%';
}

/**
 * Removes scrollbar in webkit browsers (firefox ignores it)
 */
export const noScrollbar = () => (
  `&::-webkit-scrollbar {
      display: none;
  }`
);

/**
 * Flex Helpers
 */

/**
 * Main flex helper. Includes flex type and alignment.
 * Other possible flex props (like shrink and grow) are ignored here and most likely used in children.
 *
 * e.g. Centring by X axis
 * flex('center')
 *
 * e.g. Centring by X axis, column direction
 * flex('center', null, 'column')
 *
 * e.g. center X, space-between Y, column direction
 * flex('center', 'space-between', 'column')
 *
 * e.g. space-between X
 * flex('space-between')
 *
 * @param xAlignment X axis alignment
 * @param yAlignment Y axis alignment
 * @param flexType flex OR inline-flex
 * @param direction row OR column
 */
export function flex(xAlignment, yAlignment, direction, flexType) {
  // define alignment by X axis based on flex direction
  const defineX = (x, fDirection) => {
    if (x) {
      return `${fDirection === 'row' ? `justify-content: ${x};` : `align-items: ${x};`}`;
    }
    return '';
  };

  // define alignment by Y axis based on flex direction
  const defineY = (y, fDirection) => {
    if (y) {
      return `${fDirection === 'row' ? `align-items: ${y};` : `justify-content: ${y};`}`;
    }
    return '';
  };

  return (
    `
      display: ${flexType || 'flex'};
      ${defineX(xAlignment || null, direction || 'row')}
      ${defineY(yAlignment || null, direction || 'row')}
      ${direction && `flex-direction: ${direction};`}
    `
  );
}
