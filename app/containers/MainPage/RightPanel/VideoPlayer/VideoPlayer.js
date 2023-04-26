import React from 'react';
import PropTypes from 'prop-types';
import { Player } from 'video-react';
import Styles from 'video-react/dist/video-react.css';
import styled, { injectGlobal } from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Match1 from '../../../../videos/BRA_GER.mp4';
import Match2 from '../../../../videos/PSG_BRC.mp4';
import Match3 from '../../../../videos/RMA_BAR.mp4';
import Match4 from '../../../../videos/DOR_S04.mp4';
import Match5 from '../../../../videos/RKA_SPM.mp4';
import { generateData } from '../../FootballPage/mocks/utils';
import { Ticker } from '../../FootballPage/modules/ticker';
import { toggleVideoFullScreen, saveVideoTs } from '../../FootballPage/actions';
import { selectSound } from '../../selectors';

/* eslint-disable
  no-unused-expressions
*/

injectGlobal`
  @import ${Styles};

  .video-react {
    .video-react-big-play-button {
      display: none;
    }

    .video-react-icon-fullscreen {
      display: none;
    }

    .video-react-control-bar {
      display: none;
    }
  }
`;

const StyledVideoContainer = styled.div`
  display: ${({ fullScreen }) => fullScreen ? 'block' : 'flex'};
  height: ${({ fullScreen }) => fullScreen ? '100%' : 'auto'};
  flex: 1;
  opacity: 0;
  background: black;
  transition: opacity 500ms ease-out;
  .video-react {
    position: ${({ fullScreen }) => fullScreen ? 'absolute' : 'static'};
    top: ${({ fullScreen }) => fullScreen ? '50%' : 'auto'};
    transform: ${({ fullScreen }) => fullScreen ? 'translateY(-50%)' : 'none'};
  }
`;

// const StyledFullScreen = styled.button`
//   display: block!important;
//   position: absolute!important;
//   right: 0!important;
//   bottom: 0!important;
//   width: 30px!important;
//   height: 30px!important;
//   z-index: 10;
// `;

// const ToggleFullScreen = ({ toggleFullScreen }) => (
//   <StyledFullScreen
//     className="video-react-icon-fullscreen video-react-fullscreen-control video-react-control video-react-button video-react-icon"
//     tabIndex="0"
//     onClick={() => { toggleFullScreen(); }}
//   >
//     <span className="video-react-control-text">Non-Fullscreen</span>
//   </StyledFullScreen>
// );
//
// ToggleFullScreen.propTypes = {
//   toggleFullScreen: PropTypes.func,
// };

const videos = {
  1: Match1,
  2: Match2,
  3: Match3,
  4: Match4,
  5: Match5,
};

export class VideoPlayer extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      ticker: null,
      lastVideoTs: 0,
      player: {
        paused: true,
      },
    };
  }

  componentWillMount() {
    const { data } = this.props.video;

    this.setState({
      ticker: new Ticker(data),
    });

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);

    this.setState({
      lastVideoTs: Math.floor(this.props.video.time),
    });
  }

  componentDidMount() {
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));

    !this.props.isExplModalOpen && this.player.play();

    if (this.props.video.time) this.player.seek(this.props.video.time);
  }

  componentWillReceiveProps(nextProps) {
    const { id } = this.props.video;
    const { id: nextId, data } = nextProps.video;

    if (id !== nextId) {
      // save time
      this.props.saveVideoTime({ ts: this.state.player.currentTime, id: this.props.room.id });

      this.state.ticker.pause(); // FIXME: remove old ticker from data, save current data to it on switching room
      this.setState({
        ticker: new Ticker(data.length ? data : generateData()),
      });
    }
    if (this.props.isExplModalOpen !== nextProps.isExplModalOpen && nextProps.isExplModalOpen === false) {
      this.player.play();
    }
  }

  shouldComponentUpdate(_, nextState) {
    if (this.state.lastVideoTs !== Math.floor(nextState.player.currentTime)) {
      this.setState({ lastVideoTs: Math.floor(nextState.player.currentTime) });
    }

    if (this.state.lastVideoTs !== nextState.lastVideoTs) {
      this.state.ticker.tick(nextState.lastVideoTs);
    }

    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.player.currentSrc !== prevState.player.currentSrc) {
      this.player.load();
      !this.props.isExplModalOpen && this.player.play();

      if (this.props.video.time) this.player.seek(this.props.video.time);
    }
  }

  componentWillUnmount() {
    this.state.ticker.pause();

    // save time
    this.props.saveVideoTime({ ts: this.state.player.currentTime, id: this.props.room.id });
  }

  pause() {
    this.state.ticker.pause();
  }

  play(from = null) {
    this.state.ticker.startFrom(from);
  }

  toggleFullScreen() {
    const { player } = this.player.getState();
    const { currentTime: time } = player;

    const { fullScreen } = this.props.video;

    this.props.toggleFullScreen({
      time,
      fullScreen: !fullScreen,
      data: this.state.ticker.getData(),
    });

    this.play(); // TODO: find the closest data for currentTime in player
  }

  handleStateChange(state) {
    // copy player state to this component's state
    this.setState({
      player: state,
    });
  }

  render() {
    return (
      <StyledVideoContainer fullScreen={this.props.video.fullScreen} hide={this.props.hide} style={{ display: 'flex', flex: 1 }} className="video-react">
        <Player
          src={videos[this.props.video.id]}
          ref={(player) => { this.player = player; }}
          onPlay={() => { this.play(Math.floor(this.props.video.time)); }}
          onPause={this.pause}
          muted={!this.props.sound}
        />
        {/* <ToggleFullScreen {...this.props} toggleFullScreen={this.toggleFullScreen} /> */}
      </StyledVideoContainer>
    );
  }
}

VideoPlayer.propTypes = {
  toggleFullScreen: PropTypes.func,
  saveVideoTime: PropTypes.func,
  video: PropTypes.object,
  room: PropTypes.object,
  sound: PropTypes.bool,
  hide: PropTypes.bool,
  isExplModalOpen: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  video: (state) => state.get('footballPage').selectedRoom.video,
  room: (state) => state.get('footballPage').selectedRoom,
  isExplModalOpen: (state) => state.get('footballPage').isExplModalOpen,
  sound: selectSound(),
});

const makeDispatchToProps = (dispatch) => ({
  toggleFullScreen: (state) => dispatch(toggleVideoFullScreen(state)),
  saveVideoTime: (state) => dispatch(saveVideoTs(state)),
});

export default connect(mapStateToProps, makeDispatchToProps)(VideoPlayer);
