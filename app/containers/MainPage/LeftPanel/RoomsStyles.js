import styled from 'styled-components';
import { space, color, flex, hexToRgb } from 'styles-constants';
import { browserName } from 'utils/browserDetection';
// import slideRight from 'components/SlideRightAnimation';

export const LeftPanelWrapper = styled.div`
  .secondAsideWrp {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;
export const RoomsListWrapper = styled.div`
  padding: 2px 5px 20px;
`;

export const SettingsWrapper = styled.div`
  position: relative;
  margin-bottom: ${space(2)};
`;

export const Helper = styled.div`
  position: absolute;
  top: -20px;
  padding: 40px 10px 20px;
  bottom: ${browserName() === 'safari' ? '0' : '-20px'};
  width: 100%;
  left: 0;
  z-index: 23;
  ${flex(null, null, 'column')};
  background: ${color.primaryLighted};
  box-shadow: 6px 6px 6px rgba(${hexToRgb('#0a1636')}, 0.3);
  .scrollbar {
    display: none!important;
  }
  .scrollarea-content {
    padding-right: 0!important;
  }
`;

export const FilterWrp = styled.div`
  margin-bottom: ${space(2)};
`;

export const RoomsWrp = styled.div`
  width: 240px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  > div {
    flex: 1;
  }
  .scrollarea-content {
    padding-bottom: 60px;
  }
`;

// .slidePreview-leave.slidePreview-leave-active {
//     animation: ${slideRight} 1s ease-out;
//   }
