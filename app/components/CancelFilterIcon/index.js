import React from 'react';
import styled from 'styled-components';
import { func, bool } from 'prop-types';
import { flex, hexToRgb } from 'styles-constants';

import SvgIcon from 'components/SvgIcon';
import { filterRooms } from 'containers/MainPage/actions';

const CancelFilterIcon = styled.div`
  position: relative;
  top: 1px;
  margin-left: 10px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: rgba(${hexToRgb('#fff')}, 0.7);
  ${flex('center', 'center')};
  cursor: pointer;
  svg {
    position: relative;
    top: -2px;
    width: 8px;
    height: 8px;
    stroke: #000;
    stroke-width: 2px;
  }
`;

export default class FilterIcon extends React.PureComponent { // eslint-disable-line

  onClickHanlder = () => { // eslint-disable-line
    if (this.props.removeFilter) {
      this.props.onClick();
      this.props.dispatch(filterRooms()); // remove filter from props
    } else {
      this.props.onClick(); // remove from selected assets in state
    }
  };

  render() {
    return (
      <CancelFilterIcon
        onClick={() => { this.onClickHanlder(); }}
        className="cancel-icon"
      >
        <SvgIcon icon="cross" />
      </CancelFilterIcon>
    );
  }
}

FilterIcon.propTypes = {
  onClick: func,
  dispatch: func,
  removeFilter: bool,
};
