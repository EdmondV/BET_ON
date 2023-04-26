import styled from 'styled-components';
import { color, noScrollbar, fontFamily, letterSpacing, fontWeight, fontSize, flex } from 'styles-constants';
import slideRight from 'components/SlideRightAnimation';
import { transition } from 'animation-constants';

export const textAreaHeight = '24px';

export const FeedbackWrapper = styled.div`
  padding: 0 5px;
`;

export const CapchaWrapper = styled.div`
  width: auto;
`;

export const HeaderWrapper = styled.div`
  margin-bottom: 21px;
`;

export const FeedbackForm = styled.form`
  textarea {
    animation: ${slideRight} 0.5s 0.35s ease backwards;
    height: ${textAreaHeight};
    resize: none;
    padding: 0;
    font-family: ${fontFamily.heading};
    ${({ scrollbarDisabled }) => scrollbarDisabled ? noScrollbar : ''};
  }
  .label {
    margin-top: ${({ active }) => active ? '-12px' : '-22px'};
  }
  div:nth-child(4) {
    animation: ${slideRight} 0.5s 0.45s ease backwards;
  }
`;

export const ButtonWrapper = styled.div`
  flex: 0 40px;
  min-height: 40px;
  align-self: stretch;
  position: relative;
  transition: ${transition('opacity', '0.2s')};
  opacity: ${({ disabled }) => disabled ? '0.5' : '1'};
  cursor: ${({ disabled }) => disabled ? 'default' : 'pointer'};
  svg {
    width: 24px;
    fill: ${color.newSuccess};
    position: relative;
    top: 8px;
    left: 2px;
    pointer-events: none;
  }
`;

export const Circle = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  top: 0;
  left: 0;
  background-color: ${color.newSuccess};
  border-radius: 50%;
  transition: ${transition('opacity', '0.2s')};
  opacity: ${({ disabled }) => disabled ? '0' : '0.3'};
`;

export const StyledButton = styled.button`
  position: absolute;
  padding: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: ${({ disabled }) => disabled ? 'default' : 'pointer'};
`;

export const FormFooter = styled.div`
  ${flex(null, 'center')};
`;

export const FooterText = styled.div`
  text-align: left;
  flex: 1;
  opacity: ${({ disabled }) => disabled ? '0.4' : '0.7'};
  color: ${color.mainFontColor};
  padding-right: 20px;
  font-size: ${fontSize.small};
  font-weight: ${fontWeight.light};
  letter-spacing: ${letterSpacing.medium};
  font-family: ${fontFamily.heading};
  transition: ${transition('opacity', '0.2s')};
`;
