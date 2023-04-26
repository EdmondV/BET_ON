import styled from 'styled-components';
import { flex, color, circle, space } from 'styles-constants';

export const BetsListWrapper = styled.div`
  ${flex(null, 'center')};
  padding: ${({ compact }) => compact ? `${space()} 0 0 0` : `${space()} 0`};
  div {
    &:first-child {
      margin-left: 0;
    }
  }
`;

export const Bet = styled.div`
  width: 5px;
  height: 5px;
  background: ${({ bull }) => bull ? color.bullColor : color.bearColor};
  margin-left: 4px;
  ${circle()};
`;
