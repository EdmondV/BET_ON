import React from 'react';
import { scaleLinear } from 'd3-scale';
import { area, curveLinear } from 'd3-shape';
import PropTypes from 'prop-types';
// import styled, { keyframes } from 'styled-components';
import styled from 'styled-components';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { Team1Color, Team2Color, bgColor } from 'styles-constants';
import { normalizeY } from 'modules/rooms/utils';

import VideoPlayer from '../../containers/MainPage/BetsPanel/VideoPlayer/VideoPlayer';

import Grid from './Grid';
import smooth from './Smooth';
import line from './line';
import { makeNewBet, toggleWidget } from '../../containers/MainPage/FootballPage/actions';
import { calculateMeta } from '../../modules/rooms/utils';
import bgImage from '../../containers/MainPage/FootballPage/mocks/assets/main_chart_bg.jpg';
import { getMatchData, getMatchEvents, EVENT_TYPES } from '../../containers/MainPage/FootballPage/mocks/matchesData';
import ChartEventLog from '../../containers/MainPage/FootballPage/ChartEventLog/ChartEventLog';
import ChartEventIcons from '../../containers/MainPage/FootballPage/ChartEventIcons/ChartEventIcons';
import PreloadingScreen from '../../containers/MainPage/FootballPage/PreloadingScreen/PreloadingScreen';

import ChartSettings from './ChartSettings';
import bgImg from '../../containers/MainPage/FootballPage/mocks/assets/runningFP.png';
import Widget from './NewWidget';

let ratio = 1;
let newBetDND = [];

export const StyledBgImage = styled.div`
  display: ${({ hidden }) => hidden ? 'none' : 'block'};
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: url(${bgImage});
  .filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.6;
    background-color: ${bgColor};
  }
`;

export const AnimatedFootballer = styled.div`
  position: absolute;
  display: block;
  top: 47%;
  right: 20px;
  background-image: url(${({ img }) => img});
  background-position: 0 0;
  animation: move 1.7s steps(52, start) infinite;
  animation-direction: normal, alternate;
  width: 72px;
  height: 42px;
  opacity: ${({ isFootballerShow }) => isFootballerShow ? 1 : 0};
  @keyframes move {
    0% {background-position: -4645px 0;}
    100% {background-position: 0 0;}
  }
`;

export class Chart extends React.Component {
  static propTypes = {
    room: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    smoothDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    spotlight: PropTypes.number,
    fullScreen: PropTypes.bool,
    makeBet: PropTypes.func,
    data: PropTypes.array,
    isFootballerShow: PropTypes.bool,
    toggleWidgetWrapper: PropTypes.func,
    isWidgetShow: PropTypes.bool,
    currentTs: PropTypes.number,
  }

  static defaultProps = {
    room: {
      data: [],
    },
    width: 0,
    height: 0,
  }

  componentWillMount() {
    this.setState({
      dataReady: false,
      isBetsShow: false,
      isMyBetsShow: true,
      isEventsShow: false,
    });
  }

  componentDidMount() {
    this.canvas = document.getElementById('line');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    const devicePixelRatio = window.devicePixelRatio || 1;
    const backingStoreRatio = this.ctx.webkitBackingStorePixelRatio ||
      this.ctx.mozBackingStorePixelRatio ||
      this.ctx.msBackingStorePixelRatio ||
      this.ctx.oBackingStorePixelRatio ||
      this.ctx.backingStorePixelRatio || 1;

    this.needsRescale = devicePixelRatio !== backingStoreRatio;
    ratio = devicePixelRatio / backingStoreRatio;
    // this.scale();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width
      || this.props.height !== nextProps.height) {
      this.needsRescale = true;
    }

    if (nextProps.room.id !== this.props.room.id) { // reset context
      this.ctx = null;
      this.animationStrokeCTX = null;
      this.ctxBet = null;
      this.forceUpdate();
    }

    if (nextProps.room.id !== this.props.room.id) {
      this.setState({ dataReady: false });
    }

    if (nextProps.room.data.length > 2 && !this.state.dataReady) {
      this.setState({ dataReady: true });
    }
  }

  shouldComponentUpdate(nextProps) {
    return !nextProps.isLoading;
  }

  componentDidUpdate() {
    if (this.needsRescale) {
      // this.scale();
      this.needsRescale = false;
      // TODO redraw normally
      this.forceUpdate();
    }
  }

  scale() {
    const { width, height } = this.props;
    if (this.needsRescale) {
      if (this.ctxBet) this.clearBet();
      this.canvas.width = width * ratio;
      this.canvas.height = height * ratio;

      this.canvas.style.width = `${width}px`;
      this.canvas.style.height = `${height}px`;

      this.ctx.scale(ratio, ratio);
    }
  }

  polyphil = (ctx) => {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio || 1;

    this.needsRescale = devicePixelRatio !== backingStoreRatio;
    ratio = devicePixelRatio / backingStoreRatio;
    // this.scale();
  }

  clear = () => this.ctx && this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  clearBet = () => this.ctxBet && this.ctxBet.clearRect(0, 0, this.canvasBet.width, this.canvasBet.height);

  redrawChart(meta, width, height, { data: assets }) {
    const { room, makeBet } = this.props;
    const bets = room.bets;

    if (!this.ctx && document.getElementById('line')) {
      this.canvas = document.getElementById('line');
      this.ctx = this.canvas.getContext('2d');
      this.polyphil(this.ctx);
    }
    if (!this.ctxBet && document.getElementById('bet')) {
      this.canvasBet = document.getElementById('bet');
      this.ctxBet = this.canvasBet.getContext('2d');
      this.polyphil(this.ctxBet);
    }
    if (!this.animationStrokeCTX && document.getElementById('animationStroke')) {
      this.animationCanvas = document.getElementById('animationStroke');
      this.animationStrokeCTX = this.animationCanvas.getContext('2d');
      this.polyphil(this.animationStrokeCTX);
    }
    if (!this.ctx) return [];
    let sliced = [];
    let pop = [];
    if (assets.length > 2) {
      sliced = assets.slice(0, assets.length - 1);
      pop = assets.slice(assets.length - 2);
    }
    let timer = null;
    const x1 = scaleLinear().domain([0, width]).range([meta.x.min, meta.x.max]);
    // const y1 = scaleLinear().domain([height, 0]).range([meta.y.min, meta.y.max]);
    this.info = document.getElementById('info');
    if (this.canvas) {
      this.canvas.onmousedown = (e) => {
        const lastAsset = assets[assets.length - 1];
        timer = setTimeout(() => {
          newBetDND.push({
            name: localStorage.getItem('demoUserName'),
            isEdited: true,
            user: true,
            avatar: '/assets/neymar.png',
            bet: 1,
            id: Math.random().toString(36).substr(1, 12),
            team: 1,
            startX: e.offsetX,
            startY: e.offsetY,
            value: Math.floor(lastAsset.value),
            timestamp: Math.floor(lastAsset.timestamp),
            createdAt: +x1(e.offsetX),
            deadlineAt: 0,
            deadline: {},
          });
        }, 500);
      };
      this.canvas.onmousemove = (e) => {
        if (newBetDND[0] && newBetDND[0].isEdited && +x(newBetDND[0].timestamp) <= e.offsetX) {
          const top = e.offsetY >= +y(newBetDND[0].value);
          const selectedColor = top ? Team2Color : Team1Color;
          const betValue = top
            ? Math.round((e.offsetY - +y(newBetDND[0].value)) / 10)
            : Math.round((+y(newBetDND[0].value) - e.offsetY) / 10);
          this.clearBet();
          // Draw gradient
          const grd = this.ctxBet.createLinearGradient(0, +y(newBetDND[0].value), 0, e.offsetY);
          grd.addColorStop(0, `rgba(${selectedColor}, 0.5`);
          grd.addColorStop(1, `rgba(${selectedColor},0`);
          this.ctxBet.fillStyle = grd;
          this.ctxBet.beginPath();
          this.ctxBet.moveTo(e.offsetX, e.offsetY);
          this.ctxBet.lineTo(+x(newBetDND[0].timestamp), e.offsetY);
          this.ctxBet.lineTo(+x(newBetDND[0].timestamp), +y(newBetDND[0].value));
          this.ctxBet.lineTo(e.offsetX, +y(newBetDND[0].value));
          this.ctxBet.fill();
          // Draw dot on chart
          this.ctxBet.beginPath();
          this.ctxBet.arc(+x(newBetDND[0].timestamp), +y(newBetDND[0].value), 3, 0, 2 * Math.PI);
          this.ctxBet.fill();
          // Draw horizontal stroke
          this.ctxBet.strokeStyle = `rgb(${selectedColor})`;
          this.ctxBet.lineWidth = 2;
          this.ctxBet.beginPath();
          this.ctxBet.moveTo(+x(newBetDND[0].timestamp), +y(newBetDND[0].value));
          this.ctxBet.lineTo(e.offsetX, +y(newBetDND[0].value));
          this.ctxBet.stroke();
          // Draw bet coast information
          this.info.style.top = `${e.offsetY + 15}px`;
          this.info.style.left = `${e.offsetX - this.info.offsetWidth}px`;
          this.info.style.opacity = 1;
          this.info.style.backgroundColor = `rgb(${selectedColor})`;
          this.info.innerHTML = `$${betValue}`;
          newBetDND[0].team = top ? 2 : 1;
          newBetDND[0].bet = betValue;
          newBetDND[0].deadlineX = +x(newBetDND[0].deadline);
        }
      };
      this.canvas.onmouseup = (e) => {
        clearTimeout(timer);
        if (newBetDND[0]) {
          newBetDND[0].isEdited = false;
          newBetDND[0].deadlineAt = +x1(e.offsetX);
          newBetDND[0].deadline.timestamp = +x1(e.offsetX);
          this.info.style.transition = 'all 0.4s ease-in-out';
          this.info.style.transform = `translate(${this.info.offsetWidth}px, ${+y(newBetDND[0].value) - e.offsetY - 22}px)`;
          makeBet(newBetDND[0]);
          setTimeout(() => {
            this.clearBet();
            newBetDND = [];
            this.info.style.transform = '';
            this.info.style.transition = '';
            this.info.style.opacity = 0;
          }, 500);
        }
      };
    }

    if (!this.ctx) return [];

    const x = scaleLinear().domain([meta.x.min, meta.x.max]).range([0, width]);
    const y = scaleLinear().domain([meta.y.min, meta.y.max]).range([height, 0]);

    const l = line()
      .x((d) => x(d.timestamp))
      .y((d) => y(d.value))
      .curve(!this.props.smoothDisabled ? smooth : curveLinear)
      .context(this.ctx)
      .config(bets, this.props.smoothDisabled);

    const g = line()
      .x((d) => x(d.timestamp))
      .y((d) => y(d.value))
      .curve(!this.props.smoothDisabled ? smooth : curveLinear)
      .context(this.animationStrokeCTX)
      .config(bets, false, true);

    const a = area()
      .x((d) => x(d.timestamp))
      .y0(height)
      .y1((d) => y(d.value))
      .curve(!this.props.smoothDisabled ? smooth : curveLinear)
      .context(this.ctx);

    this.clear();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = '#00f0ff';
    this.ctx.beginPath();
    l(sliced.length ? sliced : assets);
    this.ctx.stroke();
    this.animationStrokeCTX.lineWidth = 2;
    this.animationStrokeCTX.strokeStyle = '#00f0ff';
    g(sliced.length ? pop : assets);
    this.ctx.strokeStyle = 'none';
    this.ctx.fillStyle = 'rgba(255,255,255,.1)';
    this.ctx.beginPath();
    a(sliced.length ? sliced : assets);
    this.ctx.fill();

    return l.getBets();
  }

  render() {
    const { width, height, room, fullScreen } = this.props;
    const assets = room.data;

    if (![assets.length - 1] || !assets[0] || assets.length < 2) {
      return (
        <StyledBgImage>
          <div style={{ display: 'none' }}>
            <VideoPlayer />
          </div>
          <div className="filter" />
          <PreloadingScreen room={room} />
        </StyledBgImage>
      );
    }

    const firstAssetTs = assets[0].timestamp;
    const lastAssetTs = firstAssetTs + getMatchData(room.video.id).duration;

    const frame = lastAssetTs - firstAssetTs;
    // const min = firstAssetTs - frame / 8;
    const min = firstAssetTs;
    const max = lastAssetTs + frame / 7;
    const chartMeta = calculateMeta({ createdAt: firstAssetTs, expiredAt: lastAssetTs, assets });

    const meta = {
      x: {
        min,
        max,
        delta: max - min,
      },
      y: normalizeY(chartMeta.y),
    };
    const x = scaleLinear().domain([meta.x.min, meta.x.max]).range([0, width]);
    const y = scaleLinear().domain([meta.y.min, meta.y.max]).range([height, 0]);
    // const pulse = getPulse(this.props.room, assets, meta);
    const bets = this.redrawChart(meta, width, height, room);
    // this.prevPulse = pulse;
    const events = getMatchEvents(room.id);
    const time = room.data && room.data.length ? room.data[room.data.length - 1].timestamp : 0;

    const activeEvents = events.filter((e) => e.timestamp < time && this.state.isEventsShow).map((e) => {
      const asset = room.data.find((a) => e.timestamp === a.timestamp);
      e.x = +x(e.timestamp);
      e.y = +y(asset ? asset.value : e.value);
      return e;
    });
    return (<div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <StyledBgImage>
        <div className="filter" />
        <PreloadingScreen room={room} hide={this.state.dataReady} />
        {fullScreen && <VideoPlayer hide={!this.state.dataReady} />}
      </StyledBgImage>
      {/* <AssetBackground fontSize="150px"></AssetBackground> */}
      {/* <Pulse x={x(assets[assets.length - 1].timestamp)} y={y(assets[assets.length - 1].value)}>
        <div className="outer" />
        <div className="outer second" />
      </Pulse> */}
      <Grid
        meta={meta}
        // pulse={pulse}
        prevPulse={this.prevPulse}
        room={this.props.room}
        assets={assets}
        width={width}
        stroke={this.stroke}
        spotlight={this.props.spotlight}
        time={time}
        bets={bets.filter((b) => (b.user && this.state.isMyBetsShow) || (!b.user && this.state.isBetsShow))}
      />
      <AnimatedFootballer isFootballerShow={this.props.isFootballerShow} img={bgImg} />
      <div
        id="info"
        style={{
          position: 'absolute',
          background: 'red',
          zIndex: 3,
          opacity: 0,
          display: 'inline-block',
          borderRadius: '5px',
          padding: '0 2px 2px 2px',
        }}
      />
      <ChartSettings
        toggleChartEvents={(field, value) => this.setState({ [field]: value })}
        isBetsShow={this.state.isBetsShow}
        isMyBetsShow={this.state.isMyBetsShow}
        isEventsShow={this.state.isEventsShow}
        isWidgetShow={this.props.isWidgetShow}
        toggleWidgetWrapper={this.props.toggleWidgetWrapper}
      />
      <canvas
        id="line"
        width={width}
        height={height}
        style={{
          position: 'absolute',
          left: '0px',
          top: '0px',
          zIndex: 3,
        }}
      />
      <canvas
        id="animationStroke"
        width={width}
        height={height}
        style={{
          position: 'absolute',
          left: '0px',
          top: '0px',
          zIndex: 2,
        }}
      />
      <canvas
        id="bet"
        width={width}
        height={height}
        style={{
          position: 'absolute',
          left: '0px',
          top: '0px',
          zIndex: 1,
          background: 'rgba(37,44,51, 0.3)',
        }}
      />
      <Widget
        isShow={this.props.isWidgetShow && this.props.room.id === 1}
        currentEvent={getMatchEvents(room.id).filter((e) => e.type !== EVENT_TYPES.NONE).find((e) => e.timestamp === this.props.currentTs)}
        currentEvents={getMatchEvents(room.id).filter((e) => e.type !== EVENT_TYPES.NONE).filter((e) => e.timestamp <= this.props.currentTs)}
      />
      <ChartEventIcons
        events={activeEvents}
      />
      <ChartEventLog
        isWidgetShow={this.props.isWidgetShow && this.props.room.id === 1}
        events={getMatchEvents(this.props.room.id)}
        data={this.props.data}
        room={this.props.room}
        createdAt={getMatchData(this.props.room.id).matchStartTime}
      />
    </div>);
  }
}

const mapStateToProps = createStructuredSelector({
  room: (state) => state.get('footballPage').selectedRoom,
  data: (state) => state.get('footballPage').selectedRoom.data,
  fullScreen: (state) => state.get('footballPage').selectedRoom.video.fullScreen,
  isFootballerShow: (state) => state.get('footballPage').isFootballerShow,
  isWidgetShow: (state) => state.get('footballPage').isWidgetShow,
  currentTs: (state) => state.get('footballPage').currentTs,
});

const makeDispatchToProps = (dispatch) => ({
  makeBet: (data) => dispatch(makeNewBet(data)),
  toggleWidgetWrapper: (data) => dispatch(toggleWidget(data)),
});

export default connect(mapStateToProps, makeDispatchToProps)(Chart);
