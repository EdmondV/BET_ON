import React from 'react';
import styled from 'styled-components';
import slideRight from 'components/SlideRightAnimation';

import MenuItem from './MenuItem';

const StyledFtrMenu = styled.div`
  margin-top: 30px;
  font-size: 12px;
  animation: ${slideRight} 0.5s 0.6s ease backwards;
`;

export default class AccountFooterNavMenu extends React.PureComponent { // eslint-disable-line
  render() {
    return (
      <StyledFtrMenu>
        <MenuItem {...this.props} name="deposit" />
        <MenuItem {...this.props} name="operations" />
        <MenuItem {...this.props} name="withdrawal" />
      </StyledFtrMenu>
    );
  }
}
