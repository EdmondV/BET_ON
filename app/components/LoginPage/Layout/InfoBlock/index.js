import React from 'react';
import { FormattedMessage } from 'utils/intl';
import styled from 'styled-components';
import { object } from 'prop-types';

import {
  fontSize,
  fontWeight,
  letterSpacing,
  fontFamily,
  flex,
} from 'styles-constants';

import A from 'components/A';
import logoSmall from 'components/LoginPage/Icons/logo-inline.png';
import StyledScrollbar from 'components/StyledScrollbar';
import messages from 'containers/LoginPage/messages';

import DemoButton from '../DemoButton';
import { opacifiedBorder } from '../styles-constants';

const infoBlockOpacity = '0.7';

// TODO: remove classes
const InfoWrapper = styled.div`
  text-align: left;
  max-width: 550px;
  width: 60%;
  display: inline-flex;
  flex-direction: column;
  margin-right: 35px;
 
  h1 {
    font-size: ${fontSize.headingLarge};
    font-weight: ${fontWeight.regular};
  }

  p {
    font-size: ${fontSize.bodyLarge};
    font-weight: ${fontWeight.light};
    line-height: 24px;
    padding-right: 60px;
    opacity: ${infoBlockOpacity};
  }
  
  .notice {
    font-size: ${fontSize.extraSmall};
    text-transform: none;
    line-height: 14px;
    letter-spacing: ${letterSpacing.medium};
    opacity: ${infoBlockOpacity};
    text-align: left;
    margin-top: 20px;
    max-width: 280px;
  }
  
  .demo {
    ${flex('space-between', 'center')};
    margin: 30px 0 0;
  }
  
  .feedback {
    white-space: nowrap;
    margin-right: 60px;
  }
`;

const LogoSmall = styled.div`
  display: inline-block;
  background: url(${logoSmall}) center no-repeat;
  width: 380px;
  height: 75px;
  background-size: cover;
`;

const LogoWrapper = styled.div`
  margin-top: 50px;
  @media (max-height: 640px) {
    margin-top: 40px;
  }
`;

const DefaultInfo = styled.div``;

// TODO: check calc diff browsers
const FAQInfo = styled.div`
  border-radius: 5px;
  border: ${opacifiedBorder};
  padding: 20px;
  margin-top: 0;
  > div {
    overflow-y: hidden;
    height: calc(100vh - 300px)!important;
    padding: 15px 0;
    > ul {
      padding: 0;
      font-size: ${fontSize.heading};
      font-weight: ${fontWeight.normal};
      margin-top: 0;
      font-family: ${fontFamily.heading};
      p {
        font-size: ${fontSize.body};
        font-weight: ${fontWeight.light};
        padding-right: 22px;
        font-family: ${fontFamily.body};
      }
    }
  }
`;


export default class InfoBlock extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { pathname } = this.props.location;

    let content = (
      <DefaultInfo>
        <h1><FormattedMessage {...messages.signupPage_header} /></h1>
        <p><FormattedMessage {...messages.signupPage_text1} /></p>
        <p><FormattedMessage {...messages.signupPage_text2} /></p>
        <div className="demo">
          <DemoButton {...this.props} />
          <A className="feedback" to="/feedback"><FormattedMessage {...messages.writeUs} /></A>
        </div>
        <div className="notice"><FormattedMessage {...messages.signupPage_playDemo_notice1} />
          &nbsp;<A to="/registration"><FormattedMessage {...messages.signup} /></A>&nbsp;
          <FormattedMessage {...messages.signupPage_playDemo_notice2} />
        </div>
      </DefaultInfo>
    );

    if (pathname === '/feedback') {
      const contentBlocks = [];
      const QA_NUMBER = 31;
      for (let i = 1; i <= QA_NUMBER; i += 1) {
        contentBlocks.push(
          <li key={i}><FormattedMessage id={`faq${i}`} />
            <p><FormattedMessage id={`faq${i}answer`} /></p>
          </li>
        );
      }
      content = (<FAQInfo>
        <StyledScrollbar scrollTrackLine>
          <ul>
            {contentBlocks}
          </ul>
        </StyledScrollbar>
      </FAQInfo>);
    }

    return (
      <InfoWrapper>
        <A to="/">
          <LogoWrapper>
            <LogoSmall />
          </LogoWrapper>
        </A>
        {content}
      </InfoWrapper>
    );
  }
}

InfoBlock.propTypes = {
  location: object,
};
