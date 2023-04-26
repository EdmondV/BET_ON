import React from 'react';
import { string, number, object, bool } from 'prop-types';
import { Team1Color, Team2Color, zIndex, color as styledColor } from 'styles-constants';

export function randomColor() {
  return Math.random() > 0.5 ? Team1Color : Team2Color;
}

const Loader = ({ color = randomColor(), bgColor, opacity, scale = 1, root, loaderCss, overlayCss }) => (
  <div>
    <div
      style={{
        position: 'absolute',
        backgroundColor: bgColor,
        zIndex: zIndex.chartPreloader + (root ? 10 : 0),
        left: '0',
        top: '0',
        right: '0',
        bottom: '0',
        opacity,
        ...overlayCss,
      }}
    />
    <div
      style={{
        position: 'absolute',
        background: 'rgba(255,255,255,.1)',
        border: '1px solid rgba(255,255,255,.1)',
        borderRadius: '40px',
        height: '50px',
        width: '50px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: zIndex.chartPreloader + (root ? 11 : 1),
        left: '50%',
        top: '50%',
        margin: '-15px 0 0 -15px',
        transform: scale !== 1 ? `scale(${scale}) translateY(${-scale * 50}px)` : '',
        transformOrigin: '50% 50%',
        ...loaderCss,
      }}
    >
      <svg width="24px" height="30px">
        <rect x="0" y="0" width="4" height="10" fill={`rgb(${color})`} transform="translate(0 5.55556)">
          <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0" dur="0.6s" repeatCount="indefinite" />
        </rect>
        <rect x="10" y="0" width="4" height="10" fill={`rgb(${color})`} transform="translate(0 18.8889)">
          <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.2s" dur="0.6s" repeatCount="indefinite" />
        </rect>
        <rect x="20" y="0" width="4" height="10" fill={`rgb(${color})`} transform="translate(0 7.77777)">
          <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.4s" dur="0.6s" repeatCount="indefinite" />
        </rect>
      </svg>
    </div>
  </div>
);

Loader.propTypes = {
  color: string,
  bgColor: string,
  opacity: number,
  scale: number,
  root: bool,
  loaderCss: object,
  overlayCss: object,
};

Loader.defaultProps = {
  bgColor: styledColor.transparent,
  opacity: 0.5,
};

export default Loader;
