import React, { Children } from 'react';
import { node, func, string, bool } from 'prop-types';

import StyledButton from './StyledButton';
import Wrapper from './Wrapper';

function Button(props) {
  return (
    <Wrapper>
      <StyledButton onClick={props.onClick} theme={props.theme} disabled={props.disabled}>
        {Children.toArray(props.children)}
      </StyledButton>
    </Wrapper>
  );
}

Button.propTypes = {
  children: node.isRequired,
  onClick: func,
  theme: string,
  disabled: bool,
};

export default Button;
