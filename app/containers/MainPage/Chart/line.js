import { path } from 'd3-path';
import constant from 'd3-shape/src/constant';
import { x as pointX, y as pointY } from 'd3-shape/src/point';
import { curveLinear } from 'd3-shape';

/* eslint-disable
 no-return-assign,
 func-names,
 one-var,
 prefer-const,
 consistent-return,
 no-plusplus,
 no-cond-assign,
 no-sequences,
 unexpected chained assignment,
 */

export default function () {
  let x = pointX,
    y = pointY,
    defined = constant(true),
    context = null,
    curve = curveLinear,
    output = null,
    smoothDisabled = false,
    bets = null,
    animationEnabled = false;

  function line(data) {
    let i,
      n = data.length,
      d,
      defined0 = false,
      buffer;

    if (context == null) output = curve(buffer = path());
    let betIndex = 0;
    const betsSize = bets ? bets.length - 1 : 0;
    if (animationEnabled) {
      const x0 = +x(data[0]),
        y0 = +y(data[0]),
        x1 = +x(data[1]),
        y1 = +y(data[1]);
      output.animationStroke(x0, y0, x1, y1);
    }

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      const px = +x(d, i, data);
      const py = +y(d, i, data);
      if (defined0) {
        const p = output.point(px, py);

        if (bets && bets[betIndex]) {
          const offset = smoothDisabled || betIndex === 0 || betIndex === betsSize ? 0 : 1e3;
          if (d.timestamp >= bets[betIndex].created + offset) {
            if (smoothDisabled || !offset || !p) {
              bets[betIndex].x = bets[betIndex].user ? +x(bets[betIndex]) : px;
              bets[betIndex].y = bets[betIndex].user ? +y(bets[betIndex]) : py;
              bets[betIndex].deadlineX = +x(bets[betIndex].deadline);
            } else {
              bets[betIndex].x = bets[betIndex].user ? +x(bets[betIndex]) : p.x;
              bets[betIndex].y = bets[betIndex].user ? +y(bets[betIndex]) : p.y;
              bets[betIndex].deadlineX = +x(bets[betIndex].deadline);
            }
            betIndex++;
          }
        }
      }
    }


    if (buffer) return output = null, `${buffer}` || null;
  }

  line.config = function (newBets = [], newSmooth, animation = false) {
    bets = newBets.map((b) => (
      {
        ...b,
        created: b.timestamp,
        timestamp: b.timestamp,
        deadline: { timestamp: b.deadline.timestamp },
      }
    ));
    smoothDisabled = newSmooth;
    animationEnabled = animation;
    return this;
  };

  line.getBets = function () {
    return bets;
  };

  line.x = function (_) {
    return arguments.length ? (x = typeof _ === 'function' ? _ : constant(+_), line) : x;
  };

  line.y = function (_) {
    return arguments.length ? (y = typeof _ === 'function' ? _ : constant(+_), line) : y;
  };

  line.defined = function (_) {
    return arguments.length ? (defined = typeof _ === 'function' ? _ : constant(!!_), line) : defined;
  };

  line.curve = function (_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };

  line.context = function (_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context; // eslint-disable-line
  };

  return line;
}
