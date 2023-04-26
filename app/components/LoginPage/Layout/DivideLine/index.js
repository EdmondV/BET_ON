import styled from 'styled-components';

import { opacityWhite } from '../styles-constants';

const DivideLine = styled.div`
  display: inline-block;
  width: 30px;
  position: relative;
  line-height: 20px;
  color: ${opacityWhite};
  text-transform: capitalize;
  margin-top: 10px;
  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 10px;
    width: 100px;
    height: 1px;
    background: ${opacityWhite};
  }
  &:before {
    right: 100%;
  }
  &:after {
    left: 100%;
  }
`;

export default DivideLine;
