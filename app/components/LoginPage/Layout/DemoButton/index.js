import React from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'utils/intl';
import {
  buttonAnimation,
  fontWeight,
  color,
  fontFamily,
  letterSpacing,
  fontSize,
} from 'styles-constants';
import messages from 'containers/LoginPage/messages';

const DemoButtonRoot = styled.div`
  .button {
    width: 240px;
    height: 40px;
    border-radius: 22px;
    border: 1px solid ${color.buttonColor};
    line-height: 33px;
    text-transform: uppercase;
    color: ${color.mainFontColor};
    text-align: center;
    cursor: pointer;
    font-size: ${fontSize.body};
    font-weight: ${fontWeight.light};
    font-family: ${fontFamily.heading};
    letter-spacing: ${letterSpacing.large};
    position: relative;
    ${buttonAnimation}
    &:hover {
      background: ${color.buttonColor};
    }
  }
`;


export default class DemoButton extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <DemoButtonRoot>
        <button
          className="button"
          onClick={() => this.props.dispatch({
            type: 'DEMO_LOGIN_REQUEST',
            meta: {
              category: 'interface',
              type: 'CLICK_DEMO_BUTTON',
            },
          })}
        >
          <FormattedMessage {...messages.signupPage_playDemo} />
        </button>
      </DemoButtonRoot>
    );
  }
}

DemoButton.propTypes = {
  dispatch: func,
};
