/* eslint-disable
  no-underscore-dangle,
  no-fallthrough,
  no-param-reassign,
  default-case,
  no-unused-expressions,
  no-sequences

 */

export function point(that, x, y) {
  const x0 = (2 * that._x0 + that._x1) / 3;
  const y0 = (2 * that._y0 + that._y1) / 3;
  const x1 = (that._x0 + 2 * that._x1) / 3;
  const y1 = (that._y0 + 2 * that._y1) / 3;
  const x2 = (that._x0 + 4 * that._x1 + x) / 6;
  const y2 = (that._y0 + 4 * that._y1 + y) / 6;

  that._context.bezierCurveTo(x0, y0, x1, y1, x2, y2);
  return { x: x2, y: y2 };
}

function drawBezierSplit(ctx, x0, y0, x1, y1, x2, y2, t0, t1) {
  const r = t1 <= 0.5 ? t1 : 1 - t1;
  ctx.beginPath();
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  let t00 = t0 * t0;
  let t01 = 1.0 - t0;
  let t02 = t01 * t01;
  let t03 = 2.0 * t0 * t01;

  const nx0 = t02 * x0 + t03 * x1 + t00 * x2;
  const ny0 = t02 * y0 + t03 * y1 + t00 * y2;

  t00 = t1 * t1,
  t01 = 1.0 - t1,
  t02 = t01 * t01,
  t03 = 2.0 * t1 * t01;

  const nx1 = lerp(lerp(x0, x1, t0), lerp(x1, x2, t0), t1);
  const ny1 = lerp(lerp(y0, y1, t0), lerp(y1, y2, t0), t1);
  const nx2 = t02 * x0 + t03 * x1 + t00 * x2;
  const ny2 = t02 * y0 + t03 * y1 + t00 * y2;

  // ctx.bezierCurveTo(nx0, ny0, nx1 + 3 * t1, ny1, nx2 + 1.5 * t1, ny2);
  ctx.bezierCurveTo(nx0, ny0, nx1, ny1, nx2, ny2);
  ctx.stroke();
  // main point
  ctx.beginPath();
  ctx.fillStyle = '#00f0ff';
  ctx.arc(nx2, ny2, 5, 0, Math.PI * 2, true);
  ctx.fill();
  // second point
  ctx.beginPath();
  ctx.fillStyle = 'rgba(42,234,247,0.4)';
  ctx.arc(nx2, ny2, 20 * r, 0, Math.PI * 2, true);
  ctx.fill();
  // third point
  ctx.beginPath();
  ctx.fillStyle = 'rgba(42,234,247,0.2)';
  ctx.arc(nx2, ny2, 32 * r, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.beginPath();
  ctx.strokeStyle = 'none';
  ctx.fillStyle = 'rgba(255,255,255,.1)';
  // ctx.moveTo(nx0 + 1, ny0 - 1);
  // ctx.lineTo(nx2 + 1.5 * t1, ny2);
  // ctx.lineTo(nx2 + 1.5 * t1, 1000);
  // ctx.lineTo(nx0 + 1, 1000);
  ctx.moveTo(nx0 + 1, ny0 - 1);
  ctx.lineTo(nx2 + 1, ny2);
  ctx.lineTo(nx2 + 1, 1000);
  ctx.lineTo(nx0 + 1, 1000);
  ctx.fill();
}

function lerp(v0, v1, t) {
  return (1.0 - t) * v0 + t * v1;
}

export function Smooth(context) {
  this._context = context;
}

Smooth.prototype = {
  areaStart() {
    this._line = 0;
  },
  areaEnd() {
    this._line = NaN;
  },
  lineStart() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN; // eslint-disable-line
    this._point = 0;
  },
  lineEnd() {
    switch (this._point) {
      case 3: point(this, this._x1, this._y1); // proceed
      case 2: this._context.lineTo(this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point(x, y) {
    x = +x, y = +y;
    let res = { x, y };

    switch (this._point) {
      case 0:
        this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;
      case 1:
        this._point = 2;
        break;
      case 2: this._point = 3;
        this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // proceed
      default:
        res = point(this, x, y);
        break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;

    return res;
  },
  animationStroke(x0, y0, x1, y1) {
    const xB = (2 * x0 + x1) / 3;
    const yB = (2 * y0 + y1) / 3;
    let start = null;
    const duration = 1100;
    const step = (timestamp) => {
      if (start === null) start = timestamp;
      const delta = timestamp - start;
      const progress = Math.min(delta / duration, 1);
      // Draw curve
      drawBezierSplit(this._context, x0 - 1, y0, xB, yB, x1, y1, 0, progress);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  },
};

export default function (context) {
  return new Smooth(context);
}
