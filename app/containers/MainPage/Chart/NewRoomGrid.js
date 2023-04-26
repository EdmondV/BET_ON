import React from 'react';
import { object, bool, number } from 'prop-types';

import { bgColor, bgColorOpacity80, Team1ColorRGB, Team2ColorRGB } from 'styles-constants';
import { round } from 'utils/math';
import { getFormattedTime } from 'utils/time';
import Pulse from './Pulse';
import HorizontalLine from './HorizontalLine';
import VerticalLine from './VerticalLine';

class NewRoomGrid extends React.Component {
  render() {
    const { meta, pulse, prevPulse, room, isLoading, showPulse, spotlight } = this.props;
    if (!room.firstAsset) return null;

    const count = 10;
    const lines = new Array(count);

    for (let i = 0; i <= count; i += 2) {
      const p = 5 + (85 / count) * i;

      lines[i] = (
        <HorizontalLine key={`h${p}`} pos={`${p}%`} right="0px" bg="transparent">
          {round(meta.y.max - meta.y.delta * (p / 100), room.assetDecimals)}
        </HorizontalLine>
      );
      lines[i + 1] = (
        <VerticalLine key={`v${p}`} pos={`${p}%`}>
          {getFormattedTime(meta.x.min + meta.x.delta * (p / 100), 'HH:mm:ss')}
        </VerticalLine>
      );
    }

    const content = (<div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        opacity: isLoading ? 0.5 : 1,
      }}
    >
      <div
        className="shadow"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '150px',
          background: 'linear-gradient(to bottom, rgba(0,12,42,0) 0%,rgba(0,12,42,0.65) 100%)',
          zIndex: 4,
        }}
      />
      {lines}
      {showPulse && <Pulse
        pulse={pulse}
        prevPulse={prevPulse}
        animated
        spotlight={spotlight}
        roomActive
      />}
      <div
        style={{
          position: 'absolute',
          top: pulse ? pulse.y : -100,
          right: 0,
          zIndex: 9,
          margin: '-8px 0 0 0',
          padding: '3px 5px',
          fontSize: '10px',
          lineHeight: 1,
          transition: 'all 300ms',
          background: bgColorOpacity80,
        }}
      >
        <span
          style={{
            /* eslint-disable no-nested-ternary  */
            color: pulse && pulse.dir > 0 ? Team1ColorRGB : (pulse && pulse.dir < 0 ? Team2ColorRGB : '#fff'),
            /* eslint-enable no-nested-ternary  */
            padding: '1px 0px',
            marginTop: '-1px',
            transition: 'color 0.5s',
            textShadow: `0 1px 0px rgb(${bgColor})`,
          }}
        />
      </div>

    </div>);

    return content;
  }
}

NewRoomGrid.propTypes = {
  meta: object,
  pulse: object,
  prevPulse: object,
  showPulse: bool,
  room: object,
  isLoading: bool,
  spotlight: number,
};

export default NewRoomGrid;
