import React from 'react';
import PropTypes from 'prop-types';
import Circle from 'components/Icon/Circle';
import { countdown, getFormattedTime } from 'utils/time';
import Bet from './Bet';
import HorizontalLine from './HorizontalLine';
import VerticalLine from './VerticalLine';
import { getYPercent, getXPercent } from './utils';

const startPointRadius = 6;
const startPointMargin = `${-startPointRadius / 2}px`;

class Grid extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { meta, showBets, bets, assets, time } = this.props;
    const count = 20;
    const lines = new Array(count);

    for (let i = 0; i <= count; i += 2) {
      const p = 5 + (85 / count) * i;
      lines[i] = (
        <VerticalLine key={`v${p}`} pos={`${p}%`}>
          {getFormattedTime(meta.x.min + meta.x.delta * (p / 100), 'mm:ss')}
        </VerticalLine>
      );
    }

    lines.push(<HorizontalLine key="h_l" pos="50%" />);

    const created = getXPercent(assets[0].timestamp, meta);
    const startX = `${created}%`;
    const startY = `${getYPercent(assets[0].timestamp.value, meta)}%`;
    const deadlineCountdown = countdown(assets[assets.length - 1].timestamp - 180000);

    let betElems = null;
    if (bets && bets.length) {
      betElems = bets
        .filter((b) => b.x && b.y)
        .map((b) => (
          <Bet
            key={b.id}
            bet={b}
            time={time}
          />
        ));
    }

    if (deadlineCountdown.length) {
      // closeCountdown = '';
    }

    const content = (<div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      {lines}
      {/* point cirlce */}
      {showBets && <Circle
        size={startPointRadius}
        className="startPoint"
        color="#fff"
        style={{
          position: 'absolute',
          left: startX,
          top: startY,
          marginLeft: startPointMargin,
          marginTop: startPointMargin,
        }}
      />}
      {betElems}
    </div>);

    return content;
  }
}

Grid.propTypes = {
  meta: PropTypes.object,
  showBets: PropTypes.bool,
  bets: PropTypes.array,
  assets: PropTypes.array,
  time: PropTypes.number,
};

export default Grid;
