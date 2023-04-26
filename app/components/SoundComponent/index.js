import React from 'react';
import { string } from 'prop-types';
import { playSound } from 'sounds';

export default class SoundComponent extends React.PureComponent {
  componentWillMount() {
    this.state = {
      sound: playSound(this.props.soundName),
    };
  }
  componentWillUnmount() {
    if (this.state.sound && this.state.sound.stop) this.state.sound.stop();
  }
  render() {
    return null;
  }
}

SoundComponent.propTypes = {
  soundName: string.isRequired,
};
