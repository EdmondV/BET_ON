import styled from 'styled-components';

import { flex, fontFamily, fontWeight, color } from 'styles-constants';
import { transition } from 'animation-constants';
import { LayoutHeight, SectionWidth, FormWidth } from './constants/styles-constants';

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  margin-top: 100px;
  min-height: ${(p) => LayoutHeight(p.long)}px;
  min-width: 912px;
  transition: ${transition('min-height', 'defaultEmptyEffect')};
`;

export const CenterSection = styled.div`
  ${flex('flex-start')};
  width: ${SectionWidth}px;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${FormWidth}px;
  padding: 20px 0;
  text-align: center;
  border-radius: 5px;
  position: relative;
  & h3 {
    margin: 0 0 10px;
    text-align: center;
    font-size: 18px;
    font-weight: ${fontWeight.regular};
    font-family: ${fontFamily.heading};
  }
  .submit-button {
    margin: 40px auto 0;
    width: 260px;
    text-align: center;
    padding-bottom: 25px;
    border-bottom: 1px solid ${color.grayFontColor};
  }
  .copy {
    color: ${color.grayFontColor};
    margin-top: 10px;
    width: 100%;
  }
  .input-wrapper {
    margin-bottom: 10px;
  }
  button {
    border-radius: 3px;
  }
`;

export const BgVideo = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  z-index: -100;
  > video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: -1000;
    overflow: hidden;
  }
`;

export const FormSection = styled.div`
  ${flex('flex-end', null, 'column')};
  width: 300px;
  min-height: 30px;

  @media (max-height: 640px) {
    margin-top: 40px;
  }
`;

export const LoginFormHeader = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-between;

  div {
    padding: 5px 0 12px 12px;
  }
`;
