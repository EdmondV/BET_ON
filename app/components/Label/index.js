import React from 'react';
import { string, object } from 'prop-types';

import styled from 'styled-components';

const StyledLabel = styled.div`
  background-color: rgba(35,44,82,0.8);
  color: #5273bd;
  border: 1px solid #5273bd;
  line-height: 13px;
  font-size: 11px;
  padding: 0 2px;
`;

function Label(props) {
  const customCss = props.customCss || {};
  return (
    <div>
      <StyledLabel style={customCss}>
        {props.text}
      </StyledLabel>
    </div>
  );
}


Label.propTypes = {
  text: string.isRequired,
  customCss: object,
};

export default Label;
