
import { string, bool } from 'prop-types';
import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  align-items: ${(p) => {
    switch (p.vertical) {
      case 'top':
        return 'flex-start';
      case 'middle':
        return 'center';
      default:
        return 'center';
    }
  }};
`;

Flex.propTypes = {
  vertical: string,
  horizontal: string,
  inline: bool,
};

export default Flex;
