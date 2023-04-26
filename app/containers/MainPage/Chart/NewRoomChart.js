import React from 'react';
import { scaleLinear } from 'd3-scale';
import styled from 'styled-components';
import { area, curveLinear } from 'd3-shape';
import { any, object, number, bool } from 'prop-types';
import { bgColor } from 'styles-constants';
import AssetBackground from 'components/AssetBackground';
import Loader from 'components/Loader';

import NewRoomGrid from './NewRoomGrid';
import smooth from './Smooth';
import line from './line';

import { getXPercent, getYPercent, diffText } from './utils';

export const StyledCanvas = styled.canvas`
  position: relative;
  opacity: ${(p) => p.scaled ? '1' : '0'};
  width: ${(p) => p.width};
  height: ${(p) => p.height};
  transition: opacity ${(p) => p.scaled ? '0.5' : '0'}s ease-in;
`;

/* eslint-disable react/no-did-mount-set-state */

const PADDING_VERT = 0.4;

const getPulse = ({ rawData }, meta, showPulse = true) => {
  if (!showPulse) return {};
  const l = rawData.length;

  const last = rawData[l - 1];
  const prev = rawData[l - 2];

  if (!last || !prev) {
    return {};
  }

  return {
    x: `${getXPercent(last.timestamp, meta)}%`,
    y: `${getYPercent(last.value, meta)}%`,
    radius: 14,
    text: diffText(last.value, prev ? prev.value : null),
    dir: prev ? last.value - prev.value : 0,
    teamWin: 0,
  };
};

let needsRescale = false;
let ratio = 1;

export default class NewRoomChart extends React.Component {
  static propTypes = {
    room: object,
    rawData: any,
    width: number,
    height: number,
    smoothDisabled: bool,
    isLoading: bool,
    spotlight: number,
  }

  static defaultProps = {
    rawData: [],
    room: {},
    width: 0,
    height: 0,
  }

  componentDidMount() {
    this.canvas = document.getElementById('line');
    this.ctx = this.canvas.getContext('2d');

    const devicePixelRatio = window.devicePixelRatio || 1;
    const backingStoreRatio = this.ctx.webkitBackingStorePixelRatio ||
      this.ctx.mozBackingStorePixelRatio ||
      this.ctx.msBackingStorePixelRatio ||
      this.ctx.oBackingStorePixelRatio ||
      this.ctx.backingStorePixelRatio || 1;

    needsRescale = devicePixelRatio !== backingStoreRatio;
    ratio = devicePixelRatio / backingStoreRatio;

    this.scale();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width
      || this.props.height !== nextProps.height) {
      this.needsRescale = true;
    }
  }

  // shouldComponentUpdate(nextProps) {
  //   return this.props.rawData !== nextProps.rawData;
  // }

  componentDidUpdate() {
    if (this.needsRescale) {
      this.scale();
      this.needsRescale = false;
    }
  }

  scale() {
    const { width, height } = this.props;
    if (needsRescale) {
      this.canvas.width = width * ratio;
      this.canvas.height = height * ratio;

      this.canvas.style.width = `${width}px`;
      this.canvas.style.height = `${height}px`;

      this.ctx.scale(ratio, ratio);
    }
  }

  clear = () => this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

  // FIXME removed meta to backend, concat meta on ws update
  calculateMeta(reducedData) {
    const l = reducedData.length;
    const minX = this.props.room.createdAt;
    const maxX = this.props.room.expiredAt + 60000;

    const meta = {
      x: {
        min: minX,
        max: maxX,
        delta: maxX - minX,
      },
      y: {
        min: Infinity,
        max: -Infinity,
        delta: 0,
      },
    };

    for (let i = 0; i < l; i += 1) {
      const v = reducedData[i].value;
      meta.y.max = Math.max(meta.y.max, v);
      meta.y.min = Math.min(meta.y.min, v);
    }

    const d = meta.y.max - meta.y.min;

    if (d > 0) {
      meta.y.max += d * PADDING_VERT;
      meta.y.min -= d * (PADDING_VERT + 0.5);
    } else {
      meta.y.max *= (1 - PADDING_VERT / 100);
      meta.y.min *= (1 + PADDING_VERT + 0.5 / 100);
    }

    meta.y.delta = meta.y.max - meta.y.min;

    return meta;
  }

  redrawChart(reducedData, meta, width, height) {
    if (!this.ctx || !reducedData || !reducedData.length) return [];

    const x = scaleLinear().domain([meta.x.min, meta.x.max]).range([0, width]);
    const y = scaleLinear().domain([meta.y.min, meta.y.max]).range([height, 0]);

    const l = line()
      .x((d) => x(d.timestamp))
      .y((d) => y(d.value))
      .curve(!this.props.smoothDisabled ? smooth : curveLinear)
      .context(this.ctx);

    const a = area()
      .x((d) => x(d.timestamp))
      .y0(height)
      .y1((d) => y(d.value))
      .curve(!this.props.smoothDisabled ? smooth : curveLinear)
      .context(this.ctx);

    this.clear();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = 'white';
    this.ctx.beginPath();
    l(reducedData);
    this.ctx.stroke();
    this.ctx.strokeStyle = 'none';
    this.ctx.fillStyle = 'rgba(255,255,255,.1)';
    this.ctx.beginPath();
    a(reducedData);
    this.ctx.fill();

    return [];
  }

  render() {
    const { width, height, room, isLoading, spotlight, rawData } = this.props;
    const meta = this.calculateMeta(rawData);
    const pulse = getPulse(this.props, meta, rawData.length);
    this.redrawChart(rawData, meta, width, height);
    this.prevPulse = pulse;
    return (<div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: 'relative',
        backgroundColor: bgColor,
      }}
    >
      {isLoading && <Loader />}
      <AssetBackground fontSize="150px">{room.asset}</AssetBackground>
      <NewRoomGrid
        meta={meta}
        showPulse={!!rawData.length}
        pulse={pulse}
        prevPulse={this.prevPulse}
        room={room}
        width={width}
        isLoading={isLoading}
        spotlight={spotlight}
      />
      <StyledCanvas
        id="line"
        width={width}
        height={height}
        scaled={!!rawData.length}
      />
    </div>);
  }
}

/* eslint-enable react/no-did-mount-set-state */
