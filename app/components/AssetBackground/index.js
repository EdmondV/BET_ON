import styled from 'styled-components';

const AssetBackground = styled.div`
  position: absolute;
  font-size: ${({ fontSize }) => fontSize};
  top: 0;
  height: 100%;
  bottom: ${({ bottom }) => bottom || 0};
  left: ${({ left }) => left || 0};
  right: 0;
  opacity: 0.1;
  font-family: 'Bazaronite';
  line-height: 1;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default AssetBackground;
