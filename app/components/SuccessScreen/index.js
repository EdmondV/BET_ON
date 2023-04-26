import React from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'utils/intl';

import { bool } from 'prop-types';

import IconCorrect from './IconCorrect.svg';
import IconError from './IconError.svg';
import BgSuccess from './BgSuccess.svg';

const SuccessPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: center;
  background: ${(props) => props.success ? `url(${BgSuccess}) no-repeat top center` : 'none'};
  margin-top: -40px;
  align-items: center;
`;

const IconWrapper = styled.div`
  width: 70px;
  height: 70px;
  margin-bottom: 21px;
  > img {
    max-width: 100%;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
  width: 100%;
`;

const TextWrapper = styled.div``;

const TextInfoHeader = styled.div`
  font-size: 20px;
  margin-bottom: 6px;
`;

const TextInfoHeaderSecond = styled.div`
  font-size: 14px;
  opacity: 0.8;
`;

const PaymentsInfoPanel = styled.div`
  background-color: ${(props) => props.success ? 'rgba(40,173,68,0.6)' : 'rgba(252,28,28,0.4)'};
  margin-top: 24px;
  padding: 24px;
  text-align: center;
  width: 100%;
`;

const FailedTextWrapper = styled.div`
  text-align: left;
  opacity: 0.8;
  margin-top: 21px;
`;
const FailedText = styled.p`
  margin: 0;
`;
const FailedTextList = styled.ul`
  margin: 7px 0;
`;
const FailedTextListItem = styled.li``;

const Icon = (props) => {
  const { success } = props;
  return (
    <img src={success ? IconCorrect : IconError} alt="Success" />
  );
};

Icon.propTypes = {
  success: bool,
};

export const SuccessScreen = (props) => {
  const { success } = props;
  return (
    <SuccessPageWrapper success={success}>
      <ContentWrapper>
        <IconWrapper>
          <Icon success={success} />
        </IconWrapper>
        <TextWrapper>
          <TextInfoHeader>
            <FormattedMessage id={success ? 'paymentSuccess' : 'paymentFailure'} />
          </TextInfoHeader>
          { success &&
            <TextInfoHeaderSecond>
              Check your email for payment details
            </TextInfoHeaderSecond>
          }
        </TextWrapper>
        <PaymentsInfoPanel success={success}>
          <FormattedMessage id={success ? 'transactionSuccess' : 'transactionFailure'} />
        </PaymentsInfoPanel>
        {!success &&
          <FailedTextWrapper>
            <FailedText><FormattedMessage id="possibleCauses" /></FailedText>
            <FailedTextList>
              <FailedTextListItem>
                <FormattedMessage id="paymentFailureCause1" />
              </FailedTextListItem>
              <FailedTextListItem>
                <FormattedMessage id="paymentFailureCause2" />
              </FailedTextListItem>
              <FailedTextListItem>
                <FormattedMessage id="paymentFailureCause3" />
              </FailedTextListItem>
            </FailedTextList>
            <FailedText><FormattedMessage id="paymentFailureCause4" /></FailedText>
          </FailedTextWrapper>
        }
      </ContentWrapper>
    </SuccessPageWrapper>
  );
};

SuccessScreen.propTypes = {
  success: bool,
};
