import React from 'react';
import styled from 'styled-components';
import Loader from 'components/Loader';
import { number } from 'prop-types';
import { Team1Color, Team2Color } from 'styles-constants';

const PreloaderWrapper = styled.div`
  background: rgba(0, 12, 42, 0.4);
  cursor: not-allowed;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  transition: background 0.15s ease-out;
  > div > div {
    &:first-child {
      z-index: 5!important;
    }
    &:nth-child(2) {
      top: 50%!important;
      transform: translateY(-50%)!important;
      left: 0!important;
      right: 0!important;
      z-index: 20!important;
      margin: 0 auto!important;
      opacity: 0.9;
    }
  }
`;

const getColor = (team) => team === 1 ? Team1Color : Team2Color;

export default class FormPreloader extends React.PureComponent { // eslint-disable-line
  render() {
    return (
      <PreloaderWrapper>
        <Loader bgColor={'rgba(0, 12, 42, 0.4)'} opacity={0} color={getColor(this.props.teamBet)} />
      </PreloaderWrapper>
    );
  }
}

FormPreloader.propTypes = {
  teamBet: number,
};
