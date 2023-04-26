import React from 'react';
import { bool, func } from 'prop-types';
import styled from 'styled-components';
import { flex } from 'styles-constants';
import SvgIcon from 'components/SvgIcon';

const IconWrapper = styled.div`
  position: absolute;
  ${flex(null, 'center')};
  right: 3px;
  top: 0;
  height: 100%;
  width: 18px;
  opacity: 0.8;
  cursor: pointer;
  svg {
    position: relative;
    top: -2px;
    width: ${({ compact }) => compact ? '16px' : '18px'};
    fill: #ffffff;
  }
`;

const IconToggle = (props) => (
  <IconWrapper onClick={props.onClick}>
    <SvgIcon icon={props.active ? 'rooms_full' : 'rooms_compact'} />
  </IconWrapper>
);

IconToggle.propTypes = {
  active: bool,
  onClick: func,
};

export class IconToggleView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <IconWrapper compact={!this.props.showChartPreview}>
        <IconToggle
          active={!this.props.showChartPreview}
          onClick={() => { this.props.onToggleViewRooms(!this.props.showChartPreview); }}
        />
      </IconWrapper>
    );
  }
}

IconToggleView.propTypes = {
  onToggleViewRooms: func,
  showChartPreview: bool,
};

export default IconToggleView;
