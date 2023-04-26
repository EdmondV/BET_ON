/* eslint-disable
  no-unused-expressions,
  one-var,
  no-unused-vars,
  no-sequences,
  no-plusplus,
  no-shadow,
  react/sort-comp,
 */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { color, hexToRgb } from '../../../../styles-constants';
import { EVENT_TYPES } from '../../FootballPage/mocks/matchesData';
import ballImg from '../../FootballPage/mocks/assets/ball2.svg';
import {
  MainWidgetWrapper,
  WidgetWrapper,
  Slider,
  Thumb,
} from './WidgetStyles';

const fieldSizes = [
  {
    canvasWidth: 380,
    canvasHeight: 210,
    fieldTop: 314,
    fieldBottom: 314,
    fieldHeight: 204,
    marginTop: 3,
    animMargin: 0,
  },
  {
    canvasWidth: 380,
    canvasHeight: 210,
    fieldTop: 294,
    fieldBottom: 364,
    fieldHeight: 164,
    marginTop: 43,
    animMargin: -10,
  },
  {
    canvasWidth: 380,
    canvasHeight: 210,
    fieldTop: 284,
    fieldBottom: 374,
    fieldHeight: 154,
    marginTop: 53,
    animMargin: -10,
  },
];
const fieldElementsHeight = [
  {
    gate: 54,
    gateBg: 26,
    gateWr: 114,
  },
  {
    gate: 40,
    gateBg: 17,
    gateWr: 100,
  },
  {
    gate: 35,
    gateBg: 15,
    gateWr: 90,
  },
];
export class Widget extends React.PureComponent {
  static propTypes = {
    isShow: PropTypes.bool,
    currentEvent: PropTypes.object,
    currentEvents: PropTypes.array,
    toggleProjection: PropTypes.func,
    selectedProjection: PropTypes.number,
  }
  componentWillMount() {
    const size = fieldSizes;
    const elements = fieldElementsHeight;
    const { chartWidth, chartHeight } = this.props;
    size.forEach((s, i) => {
      s.canvasWidth = chartWidth - 100;
      s.canvasHeight = chartHeight - 100;
      s.fieldTop = chartWidth - 150 - 20 * i;
      s.fieldBottom = chartWidth - 150 + 20 * i;
      s.fieldHeight = chartHeight - 150 - 20 * i;
      s.marginTop = 25 + 20 * i;
      return s;
    })
    elements.forEach(e => {
      e.gate = chartHeight / 6
      e.gateBg = chartHeight / 15
      e.gateWr = chartHeight / 4
      return e;
    })
    console.log(elements);
    this.setState({
      currentEvent: { ballPosition: { x: 50, y: 50 } },
      fillColor: '92,184,92',
      plusD: 0,
      sizes: size,
      elements,
      p: this.props.selectedProjection,
    });
  }
  componentDidMount() {
    this.drawWidgetField(this.props.selectedProjection);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentEvent && nextProps.currentEvent !== this.props.currentEvent) {
      let fillColor = '92,184,92';
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
      const drawerPoints = nextProps.currentEvents.slice(-5).map((el) => {
        const calcPoints = this.calculateBallPosition(el.ballPosition.x, el.ballPosition.y, nextProps.selectedProjection);
        return { ...el, calcBallPosition: { x: calcPoints.tX, y: calcPoints.tY } };
      });
      this.drawFieldAnimation(drawerPoints[drawerPoints.length - 1], nextProps.selectedProjection || this.props.selectedProjection);
      this.drawBallTrajectory(drawerPoints, nextProps.selectedProjection);
      this.setState({
        currentEvent: drawerPoints[drawerPoints.length - 1],
        fillColor,
        plusD,
        rotate: ![1, 2, 4].includes(nextProps.currentEvent.type),
      });
    }
    if (nextProps.selectedProjection !== this.props.selectedProjection && nextProps.currentEvents.length > 0) {
      const drawerPoints = nextProps.currentEvents.slice(-5).map((el) => {
        const calcPoints = this.calculateBallPosition(el.ballPosition.x, el.ballPosition.y, nextProps.selectedProjection);
        return { ...el, calcBallPosition: { x: calcPoints.tX, y: calcPoints.tY } };
      });
      this.drawWidgetField(nextProps.selectedProjection);
      this.drawBallTrajectory(drawerPoints, nextProps.selectedProjection);
      this.drawFieldAnimation(drawerPoints[drawerPoints.length - 1], nextProps.selectedProjection);
      this.setState({
        p: nextProps.selectedProjection,
        currentEvent: drawerPoints[drawerPoints.length - 1],
        rotate: ![1, 2, 4].includes(drawerPoints[drawerPoints.length - 1].type),
      });
    }

  }
  // DRAW WIDGET FIELD
  drawWidgetField(projection) {
    const { elements, sizes } = this.state;
    const perimetrPoints = this.calculateFieldElementStartPoints(0, sizes[projection].fieldHeight - 10, projection);
    this.ball = document.getElementById('ball');
    this.thumb = document.querySelector('.thumb');
    this.slider = document.querySelector('.slider');
    this.canvas = document.getElementById('widget');
    this.ctx = this.canvas.getContext('2d');
    this.backCanvas = document.getElementById('background');
    this.backCtx = this.backCanvas.getContext('2d');
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.backCtx.clearRect(0, 0, this.backCtx.canvas.width, this.backCtx.canvas.height);
    // constants
    const fieldX0 = (sizes[projection].canvasWidth - sizes[projection].fieldTop) / 2;
    const fieldX1 = (sizes[projection].canvasWidth - sizes[projection].fieldBottom) / 2;
    const topFieldMargin = projection === 0 ? 0 : 4;
    // Field
    this.backCtx.beginPath();
    this.backCtx.fillStyle = `rgba(${hexToRgb(color.primary)}, 0.8)`;
    this.backCtx.moveTo(fieldX0 + topFieldMargin, sizes[projection].marginTop);
    this.backCtx.lineTo(fieldX0 + sizes[projection].fieldTop - topFieldMargin, sizes[projection].marginTop);
    this.backCtx.lineTo(fieldX1 + sizes[projection].fieldBottom, sizes[projection].fieldHeight + sizes[projection].marginTop);
    this.backCtx.lineTo(fieldX1, sizes[projection].fieldHeight + sizes[projection].marginTop);
    this.backCtx.fill();
    // Perimetr
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#fff';
    this.ctx.moveTo(perimetrPoints.x0, perimetrPoints.y0);
    this.ctx.lineTo(perimetrPoints.x1, perimetrPoints.y1);
    this.ctx.lineTo(perimetrPoints.x3, perimetrPoints.y3);
    this.ctx.lineTo(perimetrPoints.x2, perimetrPoints.y2);
    this.ctx.lineTo(perimetrPoints.x0, perimetrPoints.y0);
    this.ctx.stroke();
    // CentralY line
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#fff';
    this.ctx.moveTo(sizes[projection].canvasWidth / 2, 5 + sizes[projection].marginTop);
    // this.ctx.lineTo(sizes[projection].canvasWidth / 2, 202);
    this.ctx.lineTo(sizes[projection].canvasWidth / 2, this.props.chartHeight - 120);
    this.ctx.stroke();
    // Central circle
    this.drawEllipse(this.ctx, sizes[projection].canvasWidth / 2, sizes[projection].fieldHeight / 2 + sizes[projection].marginTop, 30, projection === 0 ? 30 : 20);
    this.ctx.strokeStyle = '#fff';
    // Left gate
    this.drawSquare(this.ctx, this.calculateFieldElementStartPoints(0, elements[projection].gate, projection), 20);
    // // Left gate background
    this.drawSquare(this.ctx, this.calculateFieldElementStartPoints(0, elements[projection].gateBg, projection), -4);
    // // Left gate wrapper
    this.drawSquare(this.ctx, this.calculateFieldElementStartPoints(0, elements[projection].gateWr, projection), 54);
    // // Right gate
    this.drawSquare(this.ctx, this.calculateFieldElementStartPoints(100, elements[projection].gate, projection), -20);
    // // Right gate background
    this.drawSquare(this.ctx, this.calculateFieldElementStartPoints(100, elements[projection].gateBg, projection), 4);
    // // Right gate wrapper
    this.drawSquare(this.ctx, this.calculateFieldElementStartPoints(100, elements[projection].gateWr, projection), -54);
    this.ctx.stroke();
  }
  // DRAW BALL TRAJECTORY
  drawBallTrajectory(events, projection) {
    this.ballTrajectory = document.getElementById('ballTrajectory').getContext('2d');
    this.ballTrajectory.lineWidth = 2;
    this.ballTrajectory.lineJoin = 'round';
    if (events.length >= 2) {
      let start = null;
      const duration = 800;
      const ballDuration = duration + 40;
      const longStroke = 45;
      const isDrawCurve = Math.abs(events[events.length - 2].calcBallPosition.x - events[events.length - 1].calcBallPosition.x) > longStroke;
      const degrees = isDrawCurve ? 720 : 360;
      const ballRotateDirection = events[events.length - 2].calcBallPosition.x < events[events.length - 1].calcBallPosition.x ? degrees : -degrees;

      this.ball.style.opacity = 1; // FIXME
      this.ball.style.zIndex = 8;

      const step = (timestamp) => {
        if (start === null) start = timestamp;
        const delta = timestamp - start;
        const ballProgress = Math.min(delta / ballDuration, 1);
        const progress = Math.min(delta / duration, 1);

        this.drawAnimatedEndedLine(this.ballTrajectory, projection, events[events.length - 2].calcBallPosition, events[events.length - 1].calcBallPosition, projection === 0 ? false : isDrawCurve, progress, ballRotateDirection); // FIXME p === 0 ? true : isDrawCurve
        progress < 0.95 && this.drawAnimatedArc(this.ballTrajectory, projection, events[events.length - 1].calcBallPosition, progress);
        projection > 0 && isDrawCurve && this.drawBezierSplitLine(this.ballTrajectory, projection, events[events.length - 2].calcBallPosition, events[events.length - 1].calcBallPosition, 0, ballProgress, ballRotateDirection);

        if (events.length >= 3) {
          this.drawCentralLine(this.ballTrajectory, projection, events[events.length - 3].calcBallPosition, events[events.length - 2].calcBallPosition);
          this.drawAnimatedArc(this.ballTrajectory, projection, events[events.length - 2].calcBallPosition, 1);
        }
        if (events.length > 3) {
          this.drawCentralLine(this.ballTrajectory, projection, events[events.length - 4].calcBallPosition, events[events.length - 3].calcBallPosition);
          this.drawAnimatedArc(this.ballTrajectory, projection, events[events.length - 3].calcBallPosition, 1);
        }
        if (events.length > 4) {
          this.drawAnimatedStartLine(this.ballTrajectory, projection, events[events.length - 5].calcBallPosition, events[events.length - 4].calcBallPosition, progress);
          this.drawAnimatedArc(this.ballTrajectory, projection, events[events.length - 4].calcBallPosition, 1 - progress);
        }
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }
  // DRAW BALL TRAJECTORY LINES
  drawCentralLine(ctx, projection, start, end) {
    const { sizes } = this.state;
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255, 242, 0, 0.7)';
    ctx.moveTo(start.x, sizes[projection].marginTop + start.y);
    ctx.lineTo(end.x, sizes[projection].marginTop + end.y);
    ctx.stroke();
  }
  drawBezierSplitLine(ctx, projection, start, end, t0, progress, ballRotateDirection) {
    const { sizes } = this.state;
    const x0 = start.x,
      y0 = sizes[projection].marginTop + start.y,
      x1 = start.x > end.x ? end.x + Math.abs((start.x - end.x) / 3) : end.x - Math.abs((start.x - end.x) / 3),
      y1 = sizes[projection].marginTop + Math.abs((start.y - end.y) / 2) - 30, // or start.y ?????
      x2 = end.x,
      y2 = sizes[projection].marginTop + end.y;
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.lineWidth = 1;

    // const grd = ctx.createLinearGradient(0,0,170,0);
    // grd.addColorStop(0, color.danger);
    // grd.addColorStop(1, 'transparent');
    // ctx.strokeStyle = grd;

    // ctx.strokeStyle = `rgba(${hexToRgb(color.success)}, ${1 - progress})`;
    let t00 = t0 * t0;
    let t01 = 1.0 - t0;
    let t02 = t01 * t01;
    let t03 = 2.0 * t0 * t01;

    const nx0 = t02 * x0 + t03 * x1 + t00 * x2;
    const ny0 = t02 * y0 + t03 * y1 + t00 * y2;

    t00 = progress * progress,
    t01 = 1.0 - progress,
    t02 = t01 * t01,
    t03 = 2.0 * progress * t01;

    const nx1 = this.lerp(this.lerp(x0, x1, t0), this.lerp(x1, x2, t0), progress);
    const ny1 = this.lerp(this.lerp(y0, y1, t0), this.lerp(y1, y2, t0), progress);
    const nx2 = t02 * x0 + t03 * x1 + t00 * x2;
    const ny2 = t02 * y0 + t03 * y1 + t00 * y2;

    // ctx.bezierCurveTo(nx0, ny0, nx1, ny1, nx2, ny2);
    // ctx.stroke();
    this.drawBall(ctx, nx2, ny2, progress, ballRotateDirection);
  }
  drawAnimatedStartLine(ctx, projection, start, end, progress) {
    const { sizes } = this.state;
    const newX = end.x + (start.x - end.x) * (1 - progress);
    const newY = end.y + (start.y - end.y) * (1 - progress);
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = `rgba(255, 242, 0,${0.7 - progress})`; // color.info ${1-progress}
    ctx.fillStyle = `rgba(91,192,222,${0.7 - progress})`;
    ctx.moveTo(newX, sizes[projection].marginTop + newY);
    ctx.lineTo(end.x, sizes[projection].marginTop + end.y);
    ctx.stroke();
  }
  drawAnimatedEndedLine(ctx, projection, start, end, isDrawCurve, progress, ballRotateDirection) {
    const { sizes } = this.state;
    const reverseProgress = progress <= 0.7 ? progress : 1 - progress;
    const newX = start.x + (end.x - start.x) * progress;
    const newY = start.y + (end.y - start.y) * progress;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255, 242, 0, 0.7)';;
    ctx.moveTo(start.x, sizes[projection].marginTop + start.y);
    ctx.lineTo(newX, sizes[projection].marginTop + newY);
    ctx.stroke();
    !isDrawCurve && this.drawBall(ctx, newX, sizes[projection].marginTop + newY, progress, ballRotateDirection);
    // DRAW SHADOW
    ctx.fillStyle = color.secondLayer;
    this.drawEllipse(ctx, newX + 2, sizes[projection].marginTop + newY, 4 + 4 * reverseProgress, 3 + 3 * reverseProgress);
    ctx.fill();
  }
  // SELECT CURRENT ANIMATION
  selectCurrentAnimation({ type, ballPosition }, projection) {
    const { sizes, elements } = this.state;
    switch (type) {
      case EVENT_TYPES.PASS_INTERCEPTION:
      case EVENT_TYPES.PASS:
        return {
          func: this.passAnimation,
          points: {
            field: this.calculateFieldElementStartPoints(0, sizes[projection].fieldHeight - 10, projection),
            gate: this.calculateFieldElementStartPoints(0, elements[projection].gateWr, projection),
          },
          clip: this.restore,
          duration: 400,
        };
      case EVENT_TYPES.SAVE:
        return {
          func: this.saveAnimation,
          points: this.calculateFieldElementStartPoints(0, elements[projection].gate, projection),
          clip: this.restore,
          duration: 400,
        };
      case EVENT_TYPES.GOAL:
        return {
          func: this.goalAnimation,
          points: this.calculateFieldElementStartPoints(0, 0, projection),
          clip: this.restore,
          duration: 1200,
        };
      case EVENT_TYPES.CORNER:
        return {
          func: this.cornerAnimation,
          points: this.calculateFieldElementStartPoints(0, sizes[projection].fieldHeight - 10, projection),
          clip: this.cornerAnimationClip,
          duration: 1000,
        };
      case EVENT_TYPES.FREE_KICK:
        return {
          func: this.cickAnimation,
          points: this.calculateBallPosition(ballPosition.x, ballPosition.y, projection),
          clip: this.restore,
          duration: 1000,
        };
      case EVENT_TYPES.CICK_OFF:
        return {
          func: this.cickAnimation,
          points: this.calculateBallPosition(50, 50, projection),
          clip: this.restore,
          duration: 1000,
        };
      case EVENT_TYPES.OUT:
        return {
          func: this.outAnimation,
          points: this.calculateFieldElementStartPoints(0, sizes[projection].fieldHeight - 10, projection),
          clip: this.outClip,
          duration: 1000,
        };
      case EVENT_TYPES.THROW_IN:
        return {
          func: this.trowInAnimation,
          points: this.calculateBallPosition(40, 0, projection),
          clip: this.trowInClip,
          duration: 1000,
        };
      case EVENT_TYPES.PENALTY:
        return {
          func: this.penaltyAnimation,
          points: this.calculateFieldElementStartPoints(0, elements[projection].gateBg, projection),
          clip: this.penaltyAnimationClip,
          duration: 1400,
        };
      case EVENT_TYPES.CARD:
        return {
          func: this.cardAnimation,
          points: this.calculateBallPosition(50, 50, projection),
          clip: this.restore,
          duration: 1000,
          styles: { fillColor: color.danger },
        };
      default:
        return {
          func: this.clearCtx,
          clip: this.restore,
        };
    }
  }
  // DRAW FIELD ANIMATIONS
  drawFieldAnimation(event, projection) {
    const canvas = document.getElementById('fieldAnimations');
    const ctx = canvas.getContext('2d');
    const selectedAnim = this.selectCurrentAnimation(event, projection);
    // this is animation magic
    let start = null;

    selectedAnim.clip = selectedAnim.clip.bind(this);
    selectedAnim.clip(ctx, projection, selectedAnim.points);

    const duration = selectedAnim.duration;

    const step = (timestamp) => {
      if (start === null) start = timestamp;
      const delta = timestamp - start;
      const progress = Math.min(delta / duration, 1);

      selectedAnim.func = selectedAnim.func.bind(this);
      selectedAnim.func(ctx, progress, selectedAnim.points, projection);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        start = null;
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  // ANIMATION FUNCTIONS
  outAnimation(ctx, progress, points, projection) {
    const size = this.state.sizes[projection];
    const padding = projection === 0 ? 0 : 3;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Top rectangle
    ctx.beginPath();
    ctx.fillStyle = `rgba(${hexToRgb(color.activeColor)}, ${1.2 - progress})`;
    ctx.moveTo(points.x0, points.y0);
    ctx.lineTo(points.x2, points.y2);
    ctx.lineTo(points.x2 - padding, points.y2 - 10);
    ctx.lineTo(points.x0 + padding, points.y0 - 10);
    // Right rectangle
    ctx.fillStyle = `rgba(${hexToRgb(color.activeColor)}, ${1.2 - progress})`;
    ctx.moveTo(points.x2, points.y2);
    ctx.lineTo(points.x2 + 10, points.y2);
    ctx.lineTo(points.x3 + 10, points.y3);
    ctx.lineTo(points.x3, points.y3);
    // Bottom rectangle
    ctx.fillStyle = `rgba(${hexToRgb(color.activeColor)}, ${1.2 - progress})`;
    ctx.moveTo(points.x1, points.y1);
    ctx.lineTo(points.x1 - padding, points.y1 + 10);
    ctx.lineTo(points.x3 + padding, points.y3 + 10);
    ctx.lineTo(points.x3, points.y3);
    // Left rectangle
    ctx.fillStyle = `rgba(${hexToRgb(color.activeColor)}, ${1.2 - progress})`;
    ctx.moveTo(points.x0, points.y0);
    ctx.lineTo(points.x0 - 10, points.y0);
    ctx.lineTo(points.x1 - 10, points.y1);
    ctx.lineTo(points.x1, points.y1);
    ctx.fill();
  }
  goalAnimation(ctx, progress, points, projection) {
    const { currentEvent: { ballPosition } } = this.state;
    const reverseProgress = progress <= 0.5 ? progress : 1 - progress;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(250,216,30,0.9)';
    projection === 0
      ? ctx.arc(points.x1, points.y1, 10, 0, Math.PI * 2, true)
      : this.drawEllipse(ctx, points.x1, points.y1, 10, 5);
    ctx.fill();
    // second point
    ctx.beginPath();
    ctx.fillStyle = 'rgba(250,216,30,0.6)';
    projection === 0
      ? ctx.arc(points.x1, points.y1, 32 * reverseProgress, 0, Math.PI * 2, true)
      : this.drawEllipse(ctx, points.x1, points.y1, 32 * reverseProgress, 16 * reverseProgress);
    ctx.fill();
    // third point
    ctx.beginPath();
    ctx.fillStyle = 'rgba(250,216,30,0.3)';
    projection === 0
      ? ctx.arc(points.x1, points.y1, 56 * reverseProgress, 0, Math.PI * 2, true)
      : this.drawEllipse(ctx, points.x1, points.y1, 56 * reverseProgress, 28 * reverseProgress);
    ctx.fill();
  }
  saveAnimation(ctx, progress, points, projection) {
    const reverseProgress = progress <= 0.5 ? progress : 1 - progress;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(250,216,30,0.7)';
    ctx.moveTo(points.x0, points.y0);
    ctx.lineTo(points.x0 + 20, points.y0);
    ctx.lineTo(points.x0 + 30, points.y0 + (points.y1 - points.y0) / 2);
    ctx.lineTo(points.x1 + 20, points.y1);
    ctx.lineTo(points.x1, points.y1);
    ctx.moveTo(points.x0 + 22 + reverseProgress * 10, points.y0);
    ctx.lineTo(points.x0 + 37 + reverseProgress * 10, points.y0);
    ctx.lineTo(points.x0 + 47 + reverseProgress * 10, points.y0 + (points.y1 - points.y0) / 2);
    ctx.lineTo(points.x1 + 37 + reverseProgress * 10, points.y1);
    ctx.lineTo(points.x1 + 22 + reverseProgress * 10, points.y1);
    ctx.lineTo(points.x0 + 32 + reverseProgress * 10, points.y0 + (points.y1 - points.y0) / 2);
    ctx.lineTo(points.x0 + 22 + reverseProgress * 10, points.y0);
    ctx.fill();
  }
  passAnimation(ctx, progress, { field, gate }, projection) {
    const { sizes, plusD, fillColor } = this.state,
      size = sizes[projection],
      reverseProgress = progress <= 0.5 ? progress : 1 - progress,
      addition = plusD + reverseProgress * 20,
      halfFieldHeight = (size.fieldHeight - 10) / 2;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.fillStyle = `rgba(${fillColor},0.7)`;
    ctx.moveTo(field.x0, field.y0);
    ctx.lineTo(field.x0 + size.fieldTop / 12.1 + addition, field.y0);
    plusD > 10
      ? ctx.lineTo(field.x0 + size.fieldTop / 5 + addition, field.y0 + halfFieldHeight)
      : ctx.quadraticCurveTo(field.x0 + size.fieldTop / 5 + addition, field.y0 + halfFieldHeight, field.x1 + field.tC / 2 + size.fieldTop / 12.1 + addition, field.y1); // sizes[projection].animMargin + field.y0.....
    ctx.lineTo(field.x1 + field.tC / 2 + size.fieldTop / 12.1 + addition, field.y1);
    ctx.lineTo(field.x1, field.y1);
    ctx.fill();
    ctx.fillStyle = `rgba(${fillColor},0.5)`;
    ctx.moveTo(field.x0, field.y0);
    ctx.lineTo(field.x0 + size.fieldTop / 3.7 + addition, field.y0);
    plusD > 10
      ? ctx.lineTo(field.x0 + size.fieldTop / 2.4 + addition, field.y0 + halfFieldHeight)
      : ctx.quadraticCurveTo(field.x0 + size.fieldTop / 2.4 + addition, field.y0 + halfFieldHeight, field.x1 + field.tC / 2 + size.fieldTop / 3.7 + addition, field.y1);
    ctx.lineTo(field.x1 + field.tC / 2 + size.fieldTop / 3.7 + addition, field.y1);
    ctx.lineTo(field.x1, field.y1);
    ctx.fill();
    ctx.fillStyle = `rgba(${fillColor},0.3)`;
    ctx.moveTo(field.x0, field.y0);
    ctx.lineTo(field.x0 + size.fieldTop / 2.2 + addition, field.y0);
    plusD >= 10
      ? ctx.lineTo(field.x0 + size.fieldTop / 1.6 + addition, field.y0 + halfFieldHeight)
      : ctx.quadraticCurveTo(field.x0 + size.fieldTop / 1.6 + addition, field.y0 + halfFieldHeight, field.x1 + field.tC + size.fieldTop / 2.2 + addition, field.y1);
    ctx.lineTo(field.x1 + field.tC + size.fieldTop / 2.2 + addition, field.y1);
    ctx.lineTo(field.x1, field.y1);
    ctx.fill();
    if (plusD > 10) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(${fillColor},0.3)`;
      ctx.moveTo(gate.x2, gate.y2);
      ctx.lineTo(gate.x3, gate.y3);
      ctx.lineTo(gate.x3 - 54, gate.y3);
      ctx.lineTo(gate.x2 - 54, gate.y2);
      ctx.fill();
      ctx.beginPath();
      ctx.lineWidth = 10;
      ctx.strokeStyle = `rgba(${fillColor},0.8)`;
      ctx.moveTo(gate.x2 - 5, gate.y2 + 5);
      ctx.lineTo(gate.x3 - 5, gate.y3 - 5);
      ctx.lineTo(gate.x3 - 50, gate.y3 - 5);
      ctx.lineTo(gate.x2 - 48, gate.y2 + 5);
      ctx.lineTo(gate.x2, gate.y2 + 5);
      ctx.stroke();
    }
  }
  cickAnimation(ctx, progress, points, projection) {
    const { currentEvent, currentEvent: { ballPosition }, sizes } = this.state;
    const reverseProgress = 1 - progress;
    const radius = currentEvent.type === 16 ? [10, 20, 30] : [10, 15, 20];
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(250, 216,30,0.9)';
    projection === 0
      ? ctx.arc(points.tX, points.tY + sizes[projection].marginTop, radius[0], 0, 2 * Math.PI, true)
      : this.drawEllipse(ctx, points.tX, points.tY + sizes[projection].marginTop, radius[0], radius[0] / 2);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = `rgba(250, 216,30,${reverseProgress})`;
    projection === 0
      ? ctx.arc(points.tX, points.tY + sizes[projection].marginTop, radius[1] * progress, 0, 2 * Math.PI, true)
      : this.drawEllipse(ctx, points.tX, points.tY + sizes[projection].marginTop, radius[1] * progress, radius[1] / 2 * progress);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = `rgba(250, 216,30,${reverseProgress})`;
    projection === 0
      ? ctx.arc(points.tX, points.tY + sizes[projection].marginTop, radius[2] * progress, 0, 2 * Math.PI, true)
      : this.drawEllipse(ctx, points.tX, points.tY + sizes[projection].marginTop, radius[2] * progress, radius[2] / 2 * progress);
    ctx.fill();
  }
  cardAnimation(ctx, progress, points, projection) {
    const { sizes } = this.state;
    const reverseProgress = progress <= 0.5 ? progress : 1 - progress;
    const cardWidth = 30;
    const cardHeight = 50;
    const topMargin = projection === 0 ? cardHeight / 2 - 3 : 10;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (projection > 0) {
      ctx.beginPath();
      ctx.fillStyle = color.primaryDarked;
      this.roundRect(ctx, points.tX - cardWidth / 2, points.tY + sizes[projection].marginTop, cardWidth, 5, 5);
      ctx.fill();
    }
    ctx.beginPath();
    ctx.fillStyle = `rgba(${hexToRgb(color.activeColor)}, ${0.5 + reverseProgress})`;
    this.roundRect(ctx, points.tX - cardWidth / 2, points.tY - topMargin, cardWidth, cardHeight, 5);
    ctx.fill();
  }
  cornerAnimation(ctx, progress, points, projection) {
    const { sizes } = this.state;
    const reverseProgress = progress <= 0.5 ? progress : 1 - progress;
    const ellipseHeight = 20;
    const ellipsWidth = projection === 0 ? 20 : 10;
    const ellipsAnimation = 10 * reverseProgress;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(250, 216, 30, 0.6)';
    for (let i = 1; i < 4; i++) {
      this.drawEllipse(ctx, points.x0, points.y0, (ellipseHeight * i) + ellipsAnimation, (ellipsWidth * i) + ellipsAnimation);
      ctx.fill();
    }
  }
  trowInAnimation(ctx, progress, points, projection) {
    const { sizes } = this.state;
    const reverseProgress = progress <= 0.5 ? progress : 1 - progress;
    const leftXPoint = points.tX - 6 - 12,
      rightXPoint = points.tX + 6 - 12,
      startYPoint = points.tY + sizes[projection].marginTop,
      elementHeight = 40;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(64, 134, 95, 0.8)';
    ctx.moveTo(leftXPoint, startYPoint);
    ctx.lineTo(rightXPoint, startYPoint);
    ctx.lineTo(rightXPoint, startYPoint + elementHeight);
    ctx.lineTo(points.tX - 12, startYPoint + elementHeight + 5);
    ctx.lineTo(leftXPoint, startYPoint + elementHeight);
    ctx.lineTo(leftXPoint, startYPoint);
    ctx.fill();
    for (let i = 0; i < 6; i++) {
      this.drawArrowForTrowIn(ctx, points.tX - 12, points.tY + sizes[projection].marginTop + 7 * i + 3 * i * reverseProgress);
    }
  }
  penaltyAnimation(ctx, progress, points, projection) {
    const { elements } = this.state;
    ctx.fillStyle = `rgba(${hexToRgb(color.buttonColor)}, 0.6)`;
    ctx.lineWidth = 2;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.moveTo(points.x0 - 4, points.y0);
    ctx.lineTo(points.x0 + 55, points.y0);
    ctx.lineTo(points.x1 + 55, points.y1);
    ctx.lineTo(points.x1 - 4, points.y1);
    ctx.fill();
    ctx.beginPath();
    for (let i = 1; i < 4; i++) {
      ctx.fillStyle = `rgba(${hexToRgb(color.activeColor)}, ${1.2 - progress})`;
      this.drawPenaltyArrow(ctx, points.x0 + 45 - 15 * i * progress, points.y0 + elements[projection].gateBg / 2);
      ctx.fill();
    }
  }
  // HELPERS
  lerp(v0, v1, t) {
    return (1.0 - t) * v0 + t * v1;
  }
  calculateBallPosition(x, y, projection) {
    const size = this.state.sizes[projection],
      insideFieldBorderX = 20, // left + right
      insideFieldBorderY = 10, // top + bottom
      multiplier = (size.fieldBottom - size.fieldTop) / (size.fieldHeight), // коэфициент увеличения х от у
      topCatheters = multiplier * (size.fieldHeight / 100 * (100 - y)),
      xWidth = size.fieldBottom - topCatheters,
      overflow = (size.canvasWidth - xWidth) / 2,
      tX = (xWidth - insideFieldBorderX) / 100 * x,
      tY = (size.fieldHeight - insideFieldBorderY) / 100 * y;
    return {
      tX: 10 + overflow + tX,
      tY: 5 + tY,
    }; // 10 - left inside field border, 5 - top inside border;
  }
  calculateFieldElementStartPoints(x, height, projection) {
    const size = this.state.sizes[projection],
      insideFieldBorderX = 20, // left + right
      multiplier = (size.fieldBottom - size.fieldTop) / size.fieldHeight,
      topCatheters = multiplier * (size.fieldHeight / 2 + height / 2),
      botCatheters = multiplier * (size.fieldHeight / 2 - height / 2),
      xWidthTop = size.fieldBottom - topCatheters,
      xWidthBot = size.fieldBottom - botCatheters,
      overflowTop = (size.canvasWidth - xWidthTop) / 2,
      overflowBot = (size.canvasWidth - xWidthBot) / 2,
      topX = (xWidthTop - insideFieldBorderX) / 100 * x,
      botX = (xWidthBot - insideFieldBorderX) / 100 * x,
      topY = (size.fieldHeight / 2 - height / 2) + size.marginTop,
      botY = (size.fieldHeight / 2 + height / 2) + size.marginTop;
    return {
      x0: 10 + overflowTop + topX, // top left x point
      y0: topY, // top left y point
      x1: 10 + overflowBot + botX, // bottom left x point
      y1: botY, // bottom left y point
      x2: overflowTop + topX + xWidthTop - 10, // top right x point
      y2: topY, // top right y point
      x3: overflowBot + botX + xWidthBot - 10, // bottom right x point
      y3: botY, // bottom right y point
      bC: botCatheters / 2,
      tC: topCatheters / 2,
    };
  }
  // DRAWERS
  clearCtx(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  drawBall(ctx, x, y, progress, ballRotateDirection) {
    this.ball.style.transform = `rotate(${(ballRotateDirection * progress).toFixed()}deg)`;
    this.ball.style.top = `${y - 5}px`;
    this.ball.style.left = `${x - 5}px`;
  }
  roundRect(ctx, x, y, width, height, radius) {
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
  }
  geitOnFire(ctx) {
    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
  }
  drawSquare(ctx, points, width) {
    this.ctx.moveTo(points.x0, points.y0);
    this.ctx.lineTo(points.x0 + width, points.y0);
    this.ctx.lineTo(points.x1 + width, points.y1);
    this.ctx.lineTo(points.x1, points.y1);
  }
  drawEllipse(ctx, x, y, a, b) {
    ctx.strokeStyle = 'rgba(250,216,30,0.3)';
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.scale(a / b, 1);
    ctx.arc(0, 0, b, 0, Math.PI * 2, true);
    ctx.restore();
  }
  drawOutSquare(ctx, points, width) {
    this.ctx.moveTo(points.x0, points.y0);
    this.ctx.lineTo(points.x0 + width, points.y0);
    this.ctx.lineTo(points.x1 + width, points.y1);
    this.ctx.lineTo(points.x1, points.y1);
  }
  drawAnimatedArc(ctx, projection, { x, y }, progress) {
    const { sizes } = this.state;
    ctx.beginPath();
    ctx.fillStyle = `rgba(91,192,222,${progress})`;
    ctx.arc(x, y + sizes[projection].marginTop, 3, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 242, 0,${progress - 0.2})`;
    ctx.arc(x, y + sizes[projection].marginTop, 1, 0, Math.PI * 2, true);
    ctx.fill();
  }
  drawPenaltyArrow(ctx, x, y) {
    const arrowWidth = 8;
    const arrowHalfHeight = 10;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 4, y - arrowHalfHeight);
    ctx.lineTo(x + 4 + arrowWidth, y - arrowHalfHeight);
    ctx.lineTo(x + arrowWidth, y);
    ctx.lineTo(x + 4 + arrowWidth, y + arrowHalfHeight);
    ctx.lineTo(x + 4, y + arrowHalfHeight);
    ctx.lineTo(x, y);
  }
  drawArrowForTrowIn(ctx, x, y, exponent) {
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
  // CLIPS
  restore(ctx, projection, points) {
    ctx.restore();
  }
  cornerAnimationClip(ctx, projection, points) {
    const { sizes } = this.state,
      fieldX0 = (sizes[projection].canvasWidth - sizes[projection].fieldTop) / 2,
      fieldX1 = (sizes[projection].canvasWidth - sizes[projection].fieldBottom) / 2;
    ctx.restore();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(fieldX0 + 10, 5 + sizes[projection].marginTop);
    ctx.lineTo(fieldX0 + sizes[projection].fieldTop - 10, 5 + sizes[projection].marginTop);
    ctx.lineTo(fieldX1 + sizes[projection].fieldBottom - 10, 5 + sizes[projection].fieldHeight - 10 + sizes[projection].marginTop); // Perimetr height 194
    ctx.lineTo(fieldX1 + 10, 5 + sizes[projection].fieldHeight - 10 + sizes[projection].marginTop); // Perimetr width 294
    ctx.lineTo(fieldX0 + 10, 5 + sizes[projection].marginTop);
    ctx.clip();
  }
  penaltyAnimationClip(ctx, projection, points) {
    const { elements } = this.state;
    ctx.restore();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(points.x0 - 4, points.y0);
    ctx.lineTo(points.x0 - 4 + 45, points.y0 + elements[projection].gateBg / 2);
    ctx.lineTo(points.x1 - 4, points.y1);
    ctx.clip();
  }
  trowInClip(ctx, projection, points) {
    const { sizes } = this.state,
      leftXPoint = points.tX - 6 - 12,
      rightXPoint = points.tX + 6 - 12,
      startYPoint = points.tY + sizes[projection].marginTop,
      elementHeight = 40;
    ctx.restore();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    ctx.beginPath();
    ctx.beginPath();
    ctx.moveTo(leftXPoint, startYPoint);
    ctx.lineTo(rightXPoint, startYPoint);
    ctx.lineTo(rightXPoint, startYPoint + elementHeight);
    ctx.lineTo(points.tX - 12, startYPoint + elementHeight + 5);
    ctx.lineTo(leftXPoint, startYPoint + elementHeight);
    ctx.lineTo(leftXPoint, startYPoint);
    ctx.clip();
  }
  outClip(ctx, projection, points) {
    const size = this.state.sizes[projection];
    const padding = projection === 0 ? 0 : 3;
    ctx.restore();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    ctx.beginPath();

    ctx.moveTo(points.x0, points.y0);
    ctx.lineTo(points.x2, points.y2);
    ctx.lineTo(points.x2 - padding, points.y2 - 10);
    ctx.lineTo(points.x0 + padding, points.y0 - 10);
    // Right rectangle
    ctx.moveTo(points.x2, points.y2);
    ctx.lineTo(points.x2 + 10, points.y2);
    ctx.lineTo(points.x3 + 10, points.y3);
    ctx.lineTo(points.x3, points.y3);
    // Bottom rectangle
    ctx.moveTo(points.x1, points.y1);
    ctx.lineTo(points.x1 - padding, points.y1 + 10);
    ctx.lineTo(points.x3 + padding, points.y3 + 10);
    ctx.lineTo(points.x3, points.y3);
    // Left rectangle
    ctx.moveTo(points.x0, points.y0);
    ctx.lineTo(points.x0 - 10, points.y0);
    ctx.lineTo(points.x1 - 10, points.y1);
    ctx.lineTo(points.x1, points.y1);

    ctx.clip();
  }
  // SLIDER FUNCTIONS
  choose(e) {
    const coordsThumb = this.getCoords(this.thumb),
      coordsSlider = this.getCoords(this.slider),
      shiftX = e.pageX - coordsSlider.left,
      { selectedProjection, toggleProjection } = this.props;
    if (shiftX >= 120 && shiftX <= 240) {
      toggleProjection(1);
      this.moveThumb(1);
    }
    if (shiftX >= 240) {
      toggleProjection(2);
      this.moveThumb(2);
    }
    if (shiftX < 120) {
      toggleProjection(0);
      this.moveThumb(0);
    }
  }
  drag(e) {
    const coordsThumb = this.getCoords(this.thumb),
      coordsSlider = this.getCoords(this.slider),
      shiftX = e.pageX - coordsThumb.left,
      sliderMin = coordsSlider.left + shiftX,
      sliderMax = coordsSlider.left + this.slider.offsetWidth - shiftX,
      { selectedProjection, toggleProjection } = this.props;

    let projection = selectedProjection;

    const moveAt = (e) => {
      let left = e.pageX - coordsSlider.left - shiftX;
      if (e.pageX < sliderMin) left = 0;
      if (e.pageX > sliderMax) left = this.slider.offsetWidth - this.thumb.offsetWidth;

      if (left > 120 && left < 240 && projection !== 1) {
        projection = 1;
        toggleProjection(projection);
      }
      if (left >= 240 && projection !== 2) {
        projection = 2;
        toggleProjection(projection);
      }
      if (left <= 120 && projection !== 0) {
        projection = 0;
        toggleProjection(projection);
      }

      this.thumb.style.left = `${left}px`;
    };

    document.onmousemove = (e) => {
      moveAt(e);
    };

    document.onmouseup = (e) => {
      const position = Number(this.thumb.style.left.slice(0, -2)) + 60;
      if (position > 120 && position < 240) this.thumb.style.left = '120px';
      if (position >= 240) this.thumb.style.left = '240px';
      if (position <= 120) this.thumb.style.left = '0px';
      document.onmousemove = null;
    };
  }
  moveThumb(p) {
    this.thumb.style.left = `${[0, 120, 240][p]}px`;
  }
  getCoords(element) {
    const box = element.getBoundingClientRect();
    return {
      left: pageXOffset + box.left,
      top: pageYOffset + box.top,
    };
  }
  render() {
    const { isShow, chartWidth, chartHeight } = this.props;
    return (
      <MainWidgetWrapper isShow={isShow} width={chartWidth} height={chartHeight}>
        <WidgetWrapper width={chartWidth} height={chartHeight}>
          <canvas
            id="widget"
            width={chartWidth - 100 + 'px'}
            height={chartHeight - 100 + 'px'}
            style={{
              position: 'relative',
              zIndex: 5,
            }}
          />
          <canvas
            id="fieldAnimations"
            width={chartWidth - 100 + 'px'}
            height={chartHeight - 100 + 'px'}
            style={{
              position: 'absolute',
              top: '0px',
              left: '0px',
              zIndex: this.state.currentEvent.type === EVENT_TYPES.CARD ? 6 : 4,
              transform: `rotateY(${this.state.rotate || this.state.currentEvent.team === 1 ? '0deg' : '180deg'})`,
            }}
          />
          <canvas
            id="background"
            width={chartWidth - 100 + 'px'}
            height={chartHeight - 100 + 'px'}
            style={{
              position: 'absolute',
              bottom: '0px',
              left: '0px',
              zIndex: 3,
            }}
          />
          <canvas
            id="ballTrajectory"
            width={chartWidth - 100 + 'px'}
            height={chartHeight - 100 + 'px'}
            style={{
              position: 'absolute',
              bottom: '0px',
              left: '0px',
              zIndex: 7,
            }}
          />
          <img id="ball" alt="ball" src={ballImg} style={{ zIndex: 1, height: '14px', width: '14px', position: 'absolute', opacity: 0 }} />
          <Slider
            id="slider"
            className="slider"
            onClick={(e) => this.choose(e)}
          >
            <Thumb
              onMouseDown={(e) => this.drag(e)}
              onDragStart={(e) => (false)}
              className="thumb"
            >
            </Thumb>
          </Slider>
        </WidgetWrapper>
      </MainWidgetWrapper>
    );
  }
}

export default Widget;
