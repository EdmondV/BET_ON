import styled from 'styled-components';
import { color, fontSize } from 'styles-constants';

export const ErrorWrapper = styled.div`
  font-size: ${fontSize.small};
  color: ${color.danger};
  position: absolute;
  left: 1px;
  top: 100%;
  font-weight: 400;
`;
