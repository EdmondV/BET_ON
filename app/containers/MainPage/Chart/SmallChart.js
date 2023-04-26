import React from 'react';
import { scaleLinear } from 'd3-scale';
import styled from 'styled-components';
import { area, line, curveBasis } from 'd3-shape';
import { bool, object } from 'prop-types';
import { Team1Color, Team2Color } from 'styles-constants';
import Loader from 'components/Loader';

export const StyledCanvas = styled.canvas`
  display: ${(p) => p.visible ? '' : 'none'};
`;
// transition: opacity ${(p) => p.visible ? '0.1' : '0'}s ease-in;

const loaderCss = {
  margin: '0 auto',
  left: 0,
  right: 0,
};

const sceneWidth = 200;
const sceneHeight = 65;
const chartHeight = 65;

export default class Chart extends React.PureComponent {
  static propTypes = {
    room: object,
    showRecommended: bool,
  }

  static defaultProps = {
    room: {},
  }

  componentDidMount() {
    this.canvas = document.getElementById(`line${this.props.room.id}${this.props.showRecommended}`);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.forceUpdate();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.room.id !== this.props.room.id) {
      this.canvas = document.getElementById(`line${this.props.room.id}${this.props.showRecommended}`);
      this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
      this.clear();
    }
  }

  clear = () => this.ctx && this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

  redrawChart(width, height) {
    if (!this.ctx) return false;

    const { chartMeta, assets } = this.props.room;

    const x = scaleLinear().domain([chartMeta.x.min, Date.now()]).range([0, width]);
    const y = scaleLinear().domain([chartMeta.y.min, chartMeta.y.max]).range([height, 0]);

    const l = line()
      .x((d) => x(d.timestamp))
      .y((d) => y(d.value))
      .curve(curveBasis)
      .context(this.ctx);

    const a = area()
      .x((d) => x(d.timestamp))
      .y0(height)
      .y1((d) => y(d.value))
      .curve(curveBasis)
      .context(this.ctx);

    this.clear();
    this.ctx.lineWidth = 0.7;

    const r = assets.length - 1;
    const firstAsset = this.props.room.firstAsset.value;
    if (!assets || !assets.length || assets[r].value === firstAsset) {
      this.ctx.strokeStyle = 'rgb(255,255,255)';
    } else if (assets[r].value > firstAsset) {
      this.ctx.strokeStyle = `rgb(${Team1Color})`;
    } else {
      this.ctx.strokeStyle = `rgb(${Team2Color})`;
    }
    this.ctx.beginPath();
    l(assets);
    this.ctx.stroke();
    this.ctx.strokeStyle = 'none';
    if (assets[r].value === firstAsset || !assets || !assets.length) {
      this.ctx.fillStyle = 'rgba(255,255,255,.1)';
    } else if (assets[r].value > firstAsset) {
      this.ctx.fillStyle = `rgba(${Team1Color},.4)`;
    } else {
      this.ctx.fillStyle = `rgba(${Team2Color},.4)`;
    }
    this.ctx.beginPath();
    a(assets);
    this.ctx.fill();
    return true;
  }

  render() {
    const isVisible = this.redrawChart(sceneWidth, chartHeight);

    return (<div
      style={{
        marginTop: '0',
        marginLeft: '0',
        width: `${sceneWidth}px`,
        height: `${sceneHeight}px`,
        position: 'absolute',
        backgroundColor: 'transparent',
        overflow: 'hidden',
      }}
    >
      {!isVisible && <Loader loaderCss={loaderCss} scale={0.6} />}
      <StyledCanvas
        id={`line${this.props.room.id}${this.props.showRecommended}`}
        width={sceneWidth}
        height={sceneHeight}
        visible={isVisible}
      />
    </div>);
  }
}
