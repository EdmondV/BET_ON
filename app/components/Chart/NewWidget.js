/* eslint-disable
  no-unused-expressions,
 */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { color } from '../../styles-constants';
import { EVENT_TYPES } from '../../containers/MainPage/FootballPage/mocks/matchesData';
import ballImg from '../../containers/MainPage/FootballPage/mocks/assets/ball.png';

export const MainWidgetWrapper = styled.div`
  position: absolute;
  display: flex;
  bottom: 20px;
  left: 0;
  width: 100%;
  height: ${({ isShow }) => isShow ? '210px' : '0px'};
  opacity: ${({ isShow }) => isShow ? 1 : 0};
  transition: height 300ms, opacity 300ms;
  z-index: 3;
  justify-content: center;
`;
export const WidgetWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 380px;
`;
export class Widget extends React.PureComponent {
  static propTypes = {
    isShow: PropTypes.bool,
    currentEvent: PropTypes.object,
    currentEvents: PropTypes.array,
  }
  componentWillMount() {
    this.setState({
      currentEvent: { ballPosition: { x: 50, y: 50 } },
      fillColor: '250,216,30',
      plusD: 0,
      slicedElms: 4,
      stopped: false,
    });
  }
  componentDidMount() {
    this.drawWidgetField();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.currentEvents.length === nextProps.currentEvents.length) {
      this.setState({ slicedElms: this.state.slicedElms === 1 ? 1 : this.state.slicedElms - 1, stopped: true });
    } else {
      this.setState({ slicedElms: 4, stopped: false });
    }
    if (nextProps.currentEvent && nextProps.currentEvent !== this.props.currentEvent) {
      let fillColor = '#fff';
      let plusD = 0;
      const x = nextProps.currentEvent.ballPosition.x;
      if (nextProps.currentEvent.team === 1) {
        if (x > 70) {
          fillColor = '244,67,54'; // red
          plusD = 50;
        } else if (x > 50 && x < 70) {
          fillColor = '250,216,30'; // yellow
          plusD = 10;
        } else if (x < 50) {
          fillColor = '92,184,92'; // green
          plusD = 0;
        }
      } else if (x < 30) {
        fillColor = '244,67,54';
        plusD = 50;
      } else if (x < 50 && x > 30) {
        fillColor = '250,216,30';
        plusD = 10;
      } else {
        fillColor = '92,184,92';
        plusD = 0;
      }
      this.drawFieldAnimation(nextProps.currentEvent.type);
      this.drawBallTrajectory(nextProps.currentEvents.slice(-5));
      this.setState({
        currentEvent: nextProps.currentEvent,
        fillColor,
        plusD,
        rotate: ![1, 2, 4].includes(nextProps.currentEvent.type),
      });
    }
  }
  // DRAW WIDGET FIELD
  drawWidgetField() {
    this.canvas = document.getElementById('widget');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    const bg = document.getElementById('background');
    const bgCtx = bg.getContext('2d');
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    // Field
    bgCtx.beginPath();
    bgCtx.fillStyle = 'rgba(20,90,169,0.8)';
    bgCtx.moveTo(33, 3);
    bgCtx.lineTo(347, 3);
    bgCtx.lineTo(347, 207);
    bgCtx.lineTo(33, 207);
    bgCtx.fill();
    // Perimetr
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#fff';
    this.ctx.moveTo(43, 8);
    this.ctx.lineTo(337, 8);
    this.ctx.lineTo(337, 202); // Perimetr height 194
    this.ctx.lineTo(43, 202); // Perimetr width 294
    this.ctx.lineTo(43, 8);
    this.ctx.stroke();
    // CentralY line
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#fff';
    this.ctx.moveTo(190, 8);
    this.ctx.lineTo(190, 202);
    this.ctx.stroke();
    // Central circle
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#fff';
    this.ctx.arc(191, 105, 30, 0, Math.PI * 2, true);
    // Left vorota
    this.ctx.moveTo(43, 78);
    this.ctx.lineTo(63, 78);
    this.ctx.lineTo(63, 132);
    this.ctx.lineTo(43, 132);
    // Left vorota background
    this.ctx.moveTo(43, 92);
    this.ctx.lineTo(39, 92);
    this.ctx.lineTo(39, 118);
    this.ctx.lineTo(43, 118);
    // Left vorota wrapper
    this.ctx.moveTo(43, 48);
    this.ctx.lineTo(97, 48);
    this.ctx.lineTo(97, 162);
    this.ctx.lineTo(43, 162);
    // Right vorota
    this.ctx.moveTo(337, 78);
    this.ctx.lineTo(317, 78);
    this.ctx.lineTo(317, 132);
    this.ctx.lineTo(337, 132);
    // Right vorota background
    this.ctx.moveTo(337, 92);
    this.ctx.lineTo(341, 92);
    this.ctx.lineTo(341, 118);
    this.ctx.lineTo(337, 118);
    // Right vorota wrapper
    this.ctx.moveTo(337, 48);
    this.ctx.lineTo(283, 48);
    this.ctx.lineTo(283, 162);
    this.ctx.lineTo(337, 162);
    this.ctx.stroke();
  }
  // DRAW BALL TRAJECTORY ANIMATION
  drawBallTrajectory(events, type) {
    this.canvas = document.getElementById('ballTrajectory');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    if (events.length >= 2 && events.length <= 4) {
      let start = null;
      const duration = 1000;
      const step = (timestamp) => {
        if (start === null) start = timestamp;
        const delta = timestamp - start;
        const progress = Math.min(delta / duration, 1);
        this.drawAnimatedEndedLine(this.ctx, events[events.length - 2].ballPosition, events[events.length - 1].ballPosition, progress);
        if (events.length >= 3) this.drawCentralLine(this.ctx, events[0].ballPosition, events[1].ballPosition);
        if (events.length === 4) this.drawCentralLine(this.ctx, events[1].ballPosition, events[2].ballPosition);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    } else if (events.length > 4) {
      let start = null;
      const duration = 1000;
      const step = (timestamp) => {
        if (start === null) start = timestamp;
        const delta = timestamp - start;
        const progress = Math.min(delta / duration, 1);
        this.drawAnimatedEndedLine(this.ctx, events[3].ballPosition, events[4].ballPosition, progress, type);
        this.drawCentralLine(this.ctx, events[2].ballPosition, events[3].ballPosition);
        this.drawCentralLine(this.ctx, events[1].ballPosition, events[2].ballPosition);
        this.drawAnimatedStartLine(this.ctx, events[0].ballPosition, events[1].ballPosition, progress);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }
  drawAnimatedEndedLine(ctx, start, end, progress) {
    const newX = start.x + (end.x - start.x) * progress;
    const newY = start.y + (end.y - start.y) * progress;
    const pic = new Image();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color.info;
    ctx.moveTo(43 + (294 / 100 * start.x), 8 + (194 / 100 * start.y));
    ctx.lineTo(43 + (294 / 100 * newX), 8 + (194 / 100 * newY));
    ctx.stroke();
    pic.src = `${ballImg}`;
    // pic.style.transform = `rotate(${720 * progress}deg)`;
    ctx.drawImage(pic, 38 + (294 / 100 * newX), 194 / 100 * newY, 14, 14);
  }
  drawAnimatedStartLine(ctx, start, end, progress) {
    const newX = end.x + (start.x - end.x) * (1 - progress);
    const newY = end.y + (start.y - end.y) * (1 - progress);
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(91,192,222,${1 - progress})`; // color.info ${1-progress}
    ctx.fillStyle = `rgba(91,192,222,${1 - progress})`;
    ctx.moveTo(43 + (294 / 100 * newX), 8 + (194 / 100 * newY));
    ctx.lineTo(43 + (294 / 100 * end.x), 8 + (194 / 100 * end.y));
    ctx.stroke();
    ctx.arc(43 + (294 / 100 * end.x), 8 + (194 / 100 * end.y), 2, 0, Math.PI * 2, true);
    ctx.fill();
  }
  drawCentralLine(ctx, start, end) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color.info;
    ctx.fillStyle = color.info;
    ctx.moveTo(43 + (294 / 100 * start.x), 8 + (194 / 100 * start.y));
    ctx.lineTo(43 + (294 / 100 * end.x), 8 + (194 / 100 * end.y));
    ctx.stroke();
    ctx.arc(43 + (294 / 100 * end.x), 8 + (194 / 100 * end.y), 2, 0, Math.PI * 2, true);
    ctx.fill();
  }
  // SELECT CURRENT ANIMATION
  selectCurrentAnimation(type) {
    switch (type) {
      case EVENT_TYPES.PASS_INTERCEPTION:
      case EVENT_TYPES.PASS:
        return this.passAnimation;
      case EVENT_TYPES.SAVE:
        return this.saveAnimation;
      case EVENT_TYPES.GOAL:
        return this.goalAnimation;
      case EVENT_TYPES.CORNER:
        return this.cornerAmination;
      case EVENT_TYPES.FREE_KICK:
      case EVENT_TYPES.CICK_OFF:
        return this.cickAmination;
      default:
        return this.clearCtx;
    }
  }
  // DRAW OTHER FIELD ANIMATIONS
  drawFieldAnimation(type) {
    const canvas = document.getElementById('fieldAnimations');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    this.selectedAnim = this.selectCurrentAnimation(type);
    // this is animation magic
    let start = null;
    const duration = [1, 2, 4].includes(type) ? 400 : 1400;
    const step = (timestamp) => {
      if (start === null) start = timestamp;
      const delta = timestamp - start;
      const progress = Math.min(delta / duration, 1);
      this.selectedAnim(ctx, progress);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        start = null;
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  clearCtx(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  geitOnFire(ctx) {
    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
  }
  goalAnimation(ctx, progress) {
    const { currentEvent: { ballPosition } } = this.state;
    const reverseProgress = progress <= 0.5 ? progress : 1 - progress;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(250,216,30,0.9)';
    ctx.arc(43 + (294 / 100 * ballPosition.x), 8 + (194 / 100 * ballPosition.y), 10, 0, Math.PI * 2, true);
    ctx.fill();
    // second point
    ctx.beginPath();
    ctx.fillStyle = 'rgba(250,216,30,0.6)';
    ctx.arc(43 + (294 / 100 * ballPosition.x), 8 + (194 / 100 * ballPosition.y), 32 * reverseProgress, 0, Math.PI * 2, true);
    ctx.fill();
    // third point
    ctx.beginPath();
    ctx.fillStyle = 'rgba(250,216,30,0.3)';
    ctx.arc(43 + (294 / 100 * ballPosition.x), 8 + (194 / 100 * ballPosition.y), 55 * reverseProgress, 0, Math.PI * 2, true);
    ctx.fill();
  }
  saveAnimation(ctx, progress) {
    const reverseProgress = progress <= 0.5 ? progress : 1 - progress;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(250,216,30,0.5)';
    ctx.moveTo(43, 78);
    ctx.lineTo(63, 78);
    ctx.lineTo(73, 105);
    ctx.lineTo(63, 132);
    ctx.lineTo(43, 132);
    ctx.moveTo(65 + reverseProgress * 10, 78);
    ctx.lineTo(80 + reverseProgress * 10, 78);
    ctx.lineTo(90 + reverseProgress * 10, 105);
    ctx.lineTo(80 + reverseProgress * 10, 132);
    ctx.lineTo(65 + reverseProgress * 10, 132);
    ctx.lineTo(75 + reverseProgress * 10, 105);
    ctx.lineTo(65 + reverseProgress * 10, 78);
    ctx.fill();
  }
  passAnimation(ctx, progress) {
    const reverseProgress = progress <= 0.5 ? progress : 1 - progress;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.fillStyle = `rgba(${this.state.fillColor},0.7)`;
    ctx.moveTo(43, 8);
    ctx.lineTo(73 + this.state.plusD + reverseProgress * 20, 8);
    this.state.plusD > 10
      ? ctx.lineTo(113 + this.state.plusD + reverseProgress * 20, 103)
      : ctx.quadraticCurveTo(113 + this.state.plusD + reverseProgress * 20, 103, 73 + this.state.plusD + reverseProgress * 20, 202);
    ctx.lineTo(73 + this.state.plusD + reverseProgress * 20, 202);
    ctx.lineTo(43, 202);
    ctx.fill();
    ctx.fillStyle = `rgba(${this.state.fillColor},0.5)`;
    ctx.moveTo(43, 8);
    ctx.lineTo(133 + this.state.plusD + reverseProgress * 20, 8);
    this.state.plusD > 10
      ? ctx.lineTo(173 + this.state.plusD + reverseProgress * 20, 103)
      : ctx.quadraticCurveTo(173 + this.state.plusD + reverseProgress * 20, 103, 133 + this.state.plusD + reverseProgress * 20, 202);
    ctx.lineTo(133 + this.state.plusD + reverseProgress * 20, 202);
    ctx.lineTo(43, 202);
    ctx.fill();
    ctx.fillStyle = `rgba(${this.state.fillColor},0.3)`;
    ctx.moveTo(43, 8);
    ctx.lineTo(183 + this.state.plusD + reverseProgress * 20, 8);
    this.state.plusD >= 10
      ? ctx.lineTo(223 + this.state.plusD + reverseProgress * 20, 103)
      : ctx.quadraticCurveTo(233 + this.state.plusD + reverseProgress * 20, 103, 183 + this.state.plusD + reverseProgress * 20, 202);
    ctx.lineTo(183 + this.state.plusD + reverseProgress * 20, 202);
    ctx.lineTo(43, 202);
    ctx.fill();
    if (this.state.plusD > 10) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(${this.state.fillColor},0.7)`;
      ctx.fillRect(283, 48, 54, 114);
      ctx.clearRect(293, 58, 34, 94);
      ctx.fillStyle = `rgba(${this.state.fillColor},0.5)`;
      ctx.fillRect(293, 58, 34, 94);
    }
  }
  // not complite
  trowInAnimation(ctx, progress) {
    // const { currentEvent: { ballPosition } } = this.state;
    const ballPosition = { x: 30, y: 0 };
    const reverseProgress = progress <= 0.55 ? progress : 1 - progress;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.drawArrowForTrowIn(ctx, 43 + (294 / 100 * ballPosition.x), 8 + (194 / 100 * ballPosition.y));
    this.drawArrowForTrowIn(ctx, 43 + (294 / 100 * ballPosition.x), 8 + (194 / 100 * ballPosition.y) + 7 + 3 * reverseProgress);
    this.drawArrowForTrowIn(ctx, 43 + (294 / 100 * ballPosition.x), 8 + (194 / 100 * ballPosition.y) + 14 + 6 * reverseProgress);
    this.drawArrowForTrowIn(ctx, 43 + (294 / 100 * ballPosition.x), 8 + (194 / 100 * ballPosition.y) + 21 + 9 * reverseProgress);
  }
  // not complite
  drawArrowForTrowIn(ctx, x, y) {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(250, 216,30,0.8)';
    ctx.moveTo(x - 6, y);
    ctx.lineTo(x - 6, y + 6);
    ctx.lineTo(x, y + 9);
    ctx.lineTo(x + 6, y + 6);
    ctx.lineTo(x + 6, y);
    ctx.lineTo(x, y + 3);
    ctx.lineTo(x - 6, y);
    ctx.fill();
  }
  cornerAmination(ctx, progress) {
    const { currentEvent: { ballPosition } } = this.state;
    const reverseProgress = progress <= 0.5 ? progress : 1 - progress;
    const canvas = document.getElementById('corner');
    const ctxC = canvas.getContext('2d');
    ctxC.clearRect(0, 0, ctxC.canvas.width, ctxC.canvas.height);
    ctxC.beginPath();
    ctxC.fillStyle = 'rgba(250, 216,30,0.6)';
    ctxC.arc(ballPosition.x, ballPosition.y, 20 + 10 * reverseProgress, 0, 2 * Math.PI, true);
    ctxC.fill();
    ctxC.beginPath();
    ctxC.fillStyle = 'rgba(250, 216,30,0.5)';
    ctxC.arc(ballPosition.x, ballPosition.y, 40 + 10 * reverseProgress, 0, 2 * Math.PI, true);
    ctxC.fill();
    ctxC.beginPath();
    ctxC.fillStyle = 'rgba(250, 216,30,0.4)';
    ctxC.arc(ballPosition.x, ballPosition.y, 60 + 10 * reverseProgress, 0, 2 * Math.PI, true);
    ctxC.fill();
  }
  cickAmination(ctx, progress) {
    const { currentEvent, currentEvent: { ballPosition } } = this.state;
    const reverseProgress = 1 - progress;
    const radius = currentEvent.type === 16 ? [10, 20, 30] : [5, 10, 15];
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(250, 216,30,1)';
    ctx.arc(43 + (294 / 100 * ballPosition.x), 8 + (194 / 100 * ballPosition.y), radius[0], 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = `rgba(250, 216,30,${reverseProgress})`;
    ctx.arc(43 + (294 / 100 * ballPosition.x), 8 + (194 / 100 * ballPosition.y), radius[1] * progress, 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = `rgba(250, 216,30,${reverseProgress})`;
    ctx.arc(43 + (294 / 100 * ballPosition.x), 8 + (194 / 100 * ballPosition.y), radius[2] * progress, 0, 2 * Math.PI, true);
    ctx.fill();
  }
  render() {
    const { isShow } = this.props;
    return (
      <MainWidgetWrapper
        isShow={isShow}
      >
        <WidgetWrapper>
          <canvas
            id="background"
            width="380px"
            height="210px"
            style={{
              position: 'absolute',
              top: '0px',
              left: '0px',
              zIndex: 4,
            }}
          />
          <canvas
            id="widget"
            width="380px"
            height="210px"
            style={{
              position: 'relative',
              zIndex: 5,
            }}
          />
          <canvas
            id="fieldAnimations"
            width="380px"
            height="210px"
            style={{
              position: 'absolute',
              top: '0px',
              left: '0px',
              zIndex: 4,
              transform: `rotateY(${this.state.rotate || this.state.currentEvent.team === 1 ? '0deg' : '180deg'})`,
            }}
          />
          <canvas
            id="corner"
            width="294px"
            height="194px"
            style={{
              position: 'absolute',
              top: '8px',
              left: '43px',
              zIndex: 7,
            }}
          />
          <canvas
            id="ballTrajectory"
            width="380px"
            height="210px"
            style={{
              position: 'absolute',
              bottom: '0px',
              left: '0px',
              zIndex: 7,
            }}
          />
        </WidgetWrapper>
      </MainWidgetWrapper>
    );
  }
}

export default Widget;
