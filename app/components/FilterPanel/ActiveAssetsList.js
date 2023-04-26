import React from 'react';
import { bool, any, string, func } from 'prop-types';
import styled from 'styled-components';
import { hexToRgb, flex, color, fontSize, space, fontWeight } from 'styles-constants';
import SvgIcon from 'components/SvgIcon';
import StyledScrollbar from 'components/StyledScrollbar';

const StyledActiveAssetsList = styled.div`
  transition: opacity 200ms ease-out;
  position: relative;
  height: 190px;
  margin-top: 10px;
  z-index: ${({ show, animationEnd }) => !show && animationEnd ? 'inherit' : '-1'};
  opacity: ${({ show, animationEnd }) => !show && animationEnd ? '1' : '0'};
  ${({ show }) => show && 'transition-duration: 0s'};
  > div {
    height: 190px!important;
  }
  
  .tr-scrollbar {
    max-height: 100%;
    .scrollarea-content {
      ${flex('space-between')};
      flex-wrap: wrap;
    }
  }
`;

const StyledAssetListItem = styled.div`
  border-radius: 1.5em;
  font-size: ${fontSize.body};
  color: rgba(${hexToRgb('#fff')}, 0.6);
  text-transform: uppercase;
  padding: 0 6px 0 ${space(2)};
  line-height: 1;
  position: relative;
  background: ${color.primarySecond};
  flex: 0 48%;
  height: 36px;
  ${flex('space-between', 'center')};
  margin-bottom: 10px;
`;

const CloseIcon = styled.div`
  flex: 0 22px;
  opacity: 0.6;
  cursor: pointer;
  svg {
    position: relative;
    top: -1px;
    width: 16px;
    stroke: #fff;
  }
`;

const StyledAssetTitle = styled.div`
  margin-top: -1px;
  font-weight: ${fontWeight.regular};
`;

const AssetListItem = ({ asset, removeAsset }) => (
  <StyledAssetListItem>
    <StyledAssetTitle>{asset}</StyledAssetTitle>
    <CloseIcon onClick={() => { removeAsset(asset); }}>
      <SvgIcon icon="cross" />
    </CloseIcon>
  </StyledAssetListItem>
);

AssetListItem.propTypes = {
  asset: string,
  removeAsset: func,
};

export const ActiveAssetsList = ({ assets, removeAsset, show, animationEnd }) => (
  <StyledActiveAssetsList show={show} animationEnd={animationEnd}>
    <StyledScrollbar returnChildren>
      {
        assets.map((a) => <AssetListItem removeAsset={removeAsset} asset={a} key={a} />)
      }
    </StyledScrollbar>
  </StyledActiveAssetsList>
);

ActiveAssetsList.propTypes = {
  assets: any,
  removeAsset: func,
  show: bool,
  animationEnd: bool,
};

export default ActiveAssetsList;
