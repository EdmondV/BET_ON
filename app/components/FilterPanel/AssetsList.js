import React from 'react';
import styled from 'styled-components';
import { bool, any, string, func, array } from 'prop-types';
import { hexToRgb, fontWeight, flex, color } from 'styles-constants';

import Checkbox from 'components/Checkbox';

import ActiveAssetsList from './ActiveAssetsList';

// TODO: Get ALL assets for the Assets list because when only DEMO is available assets list will be lost in filter panel
// TODO: intl and intl with plural value

const AssetsListWrapper = styled.div`
  box-shadow: ${({ show, animationEnd }) => !show && animationEnd ? 'none' : `0 0 12px 2px rgba(${hexToRgb('#0a1636')}, 0.45)`};
  max-height: ${({ show }) => show ? '330px' : '0'};
  transform: translateY(${({ show }) => show ? '-30px' : '0'});
  background: ${color.primaryLighted};
  transition: all 300ms ease-out;
  overflow-y: scroll;
  z-index: 3;
  position: absolute;
  top: 40px;
  width: 100%;
  &::-webkit-scrollbar-track {
    border-radius: 5px;
  }
  &::-webkit-scrollbar {
    width: 5px;
    border: 2px solid ${color.primaryLighted};
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: ${color.success};
  }
  &:hover::-webkit-scrollbar-thumb {
    background: ${color.success};
  }
  &:focus {
    outline: none;
  }
`;

const ListWrapper = styled.div`
  padding: 20px 10px 10px;
`;

const StyledListItem = styled.div`
  margin-bottom: ${({ last }) => last ? '0' : '14px'};
  ${flex('space-between', 'center')};
  font-weight: ${fontWeight.regular};
`;

const CheckBoxWrp = styled.span``;

const StyledAsset = styled.span`
  cursor: pointer;
`;

const ListItem = ({ last, asset, checked, onClick }) => (
  <StyledListItem last={last}>
    <StyledAsset onClick={onClick}>{asset}</StyledAsset>
    <CheckBoxWrp onClick={onClick}>
      {/* Empty onChange is for redux form. Checkboxes are checking on comparing with state but not on change. OnClick handles change */}
      <Checkbox name={asset} checked={checked} onChange={() => {}} theme="assetsList" />
    </CheckBoxWrp>
  </StyledListItem>
);

ListItem.propTypes = {
  last: bool,
  checked: bool,
  asset: string,
  onClick: func,
};

export default class AssetsList extends React.PureComponent { // eslint-disable-line

  componentWillMount() {
    this.setState({
      animationEnd: true,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.props.show) {
      this.setState({
        animationEnd: false,
      });
    }
  }

  onTransitionEndHandler() {
    this.setState({
      animationEnd: true,
    });
  }

  render() {
    const { assets, show, toggleAssetsList, removeAsset, toggleAsset, checkedAssets } = this.props;
    return (
      <div>
        <AssetsListWrapper
          onTransitionEnd={() => { this.onTransitionEndHandler(); }}
          show={show}
          animationEnd={this.state && this.state.animationEnd}
          onBlur={toggleAssetsList}
          id="assets_list"
          tabIndex="0"
        >
          <ListWrapper>
            { assets && assets.map((a, i) => <ListItem
              last={i === assets.length - 1}
              asset={a}
              key={a}
              checked={checkedAssets.includes(a)}
              onClick={() => { toggleAsset(a); }}
            />) }
          </ListWrapper>
        </AssetsListWrapper>
        <ActiveAssetsList
          assets={this.props.checkedAssets}
          removeAsset={removeAsset}
          show={show}
          animationEnd={this.state.animationEnd}
        />
      </div>
    );
  }
}

AssetsList.propTypes = {
  assets: any,
  show: bool,
  checkedAssets: array,
  toggleAsset: func,
  removeAsset: func,
  toggleAssetsList: func,
};
