import React from 'react';
import styled from 'styled-components';
import { func, bool } from 'prop-types';
import { color, hexToRgb } from 'styles-constants';
import SvgIcon from 'components/SvgIcon';
import AccountTooltip from 'components/AccountTooltip';

const IconWrapper = styled.div`
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  display: inline-flex;
  justify-content: center;
  align-self: flex-end;
`;

const StyledVerifiedIcon = IconWrapper.extend`
  position: relative;
  cursor: pointer;
  svg {
    color: ${(p) => p.verified ? color.success : '#666666'};
  }
  &:hover {
    &:before {
      content: '';
      position: absolute;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: ${(p) => p.verified ? `rgba(${hexToRgb(color.success)}, 0.12)` : `rgba(${hexToRgb('#ffffff')}, 0.12)`};
      right: 0;
      transform: translateY(-50%);
      top: 45%;
    }
  }
`;

export default class VerifiedIcon extends React.PureComponent { // eslint-disable-line
  componentWillMount() {
    this.setState({
      showTooltip: false,
    });
  }
  toggleTooltip = (show) => {
    this.setState({
      showTooltip: show,
    });
  };
  render() {
    const { verified, onClick } = this.props;
    return (
      <StyledVerifiedIcon
        onMouseEnter={() => this.toggleTooltip(true)}
        onMouseLeave={() => this.toggleTooltip(false)}
        onClick={onClick}
        verified={verified}
      >
        <AccountTooltip theme="confirmed" verified={verified} show={this.state.showTooltip} />
        <SvgIcon icon="checked" style={{ display: 'inline-flex', alignSelf: 'center' }} styles={{ width: 14, height: 14 }} />
      </StyledVerifiedIcon>
    );
  }
}

VerifiedIcon.propTypes = {
  onClick: func,
  verified: bool,
};
