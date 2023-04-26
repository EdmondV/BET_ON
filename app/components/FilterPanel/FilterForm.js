import React from 'react';
import { reduxForm, initialize, reset } from 'redux-form/immutable';
import { any, object, bool, func, array } from 'prop-types';
import styled from 'styled-components';
import { isEqual } from 'lodash';
import { filterRooms } from 'containers/MainPage/actions';
import { hexToRgb, flex, fontSize, fontWeight } from 'styles-constants';
import { FormattedMessage } from 'utils/intl';
import messages from 'containers/MainPage/LeftPanel/messages';

import Button from 'components/Button';
import CancelFilterIcon from 'components/CancelFilterIcon';

import AssetsSelectInput from './AssetsSelectInput';
import AssetsList from './AssetsList';
import TimeframeList from './TimeframeList';
import BetsInput from './BetsInput';

// TODO: styles in separate file

const StyledForm = styled.form`
  width: 100%;
  ${flex(null, null, 'column')};
`;

const SelectInputWrapper = styled.div`
  position: relative;
  flex: 1;
  input {
    pointer-events: none;
  }
  .active-label {
    top: -10px;
  }
  margin-top: 40px;
`;

const OpenIconWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 18px;
  border: 6px solid transparent;
  width: 0;
  height: 0;
  cursor: pointer;
  border-top-color: rgba(${hexToRgb('#fff')}, 0.4);
`;

const InputWrp = styled.div`
  position: relative;
  z-index: 1;
  cursor: pointer;
  ${({ opened, hasValuesLabel }) => opened || hasValuesLabel && `
    cursor: default;
  `};
  .input-wrapper {
    cursor: ${({ hasValuesLabel }) => hasValuesLabel ? 'default' : 'pointer'};
    pointer-events: ${({ hasValuesLabel }) => hasValuesLabel ? 'none' : 'auto'};
  }
`;

const ButtonWrapper = styled.div`
  ${flex(null, 'flex-end')};
  flex: 1;
  button {
    font-size: 14px!important;
  }
`;

const StyledAssetValues = styled.div`
  ${flex(null, 'center')};
  position: absolute;
  height: 100%;
  bottom: 0;
  left: 0;
  opacity: 0.8;
`;
const ValueNum = styled.div`
  font-size: ${fontSize.body};
  font-weight: ${fontWeight.regular};
  text-transform: uppercase;
  cursor: pointer;
`;
const CancelIconWrp = styled.div`
  cursor: pointer;
`;

const AssetValues = ({ assets, clearAssets, toggleAssetsList }) => (
  <StyledAssetValues>
    <ValueNum onClick={toggleAssetsList}>{assets.length} {assets.length === 1 ? 'value' : 'values'}</ValueNum>
    <CancelIconWrp>
      <CancelFilterIcon onClick={clearAssets} />
    </CancelIconWrp>
  </StyledAssetValues>
);

AssetValues.propTypes = {
  assets: array,
  clearAssets: func,
  toggleAssetsList: func,
};


// TODO: recursive merge for state
export class FilterForm extends React.PureComponent { // eslint-disable-line

  componentWillMount() {
    const { roomsFilterSettings, dispatch } = this.props;
    this.setState({
      assetsListOpened: false,
      roomsFilterSettings,
      initialFilterState: roomsFilterSettings, // for connecting state and props
    });
    const { minBet, maxBet } = roomsFilterSettings;
    dispatch(initialize('filter', { minBet, maxBet }));
  }

  /**
   *
   * Change initial state on update filter settings in props
   * Connecting state with props values
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    const { roomsFilterSettings } = nextProps;
    if (this.state && !isEqual(roomsFilterSettings, this.state.initialFilterState)) {
      this.setState({
        roomsFilterSettings,
        initialFilterState: roomsFilterSettings,
      });
    }

    if (this.props.roomsFilterSettings.active && !roomsFilterSettings.active) {
      this.props.dispatch(initialize('filter', { minBet: '', maxBet: '' })); // on cancel inputs reset fields manually
    }
  }

  /**
   *
   * @param roomsFilterSettings component state filter settings
   * @param updateRoomsFilterSettings props update filter settings
   * @param cancelFilter props clear settings
   * @param dispatch props
   * @param minBet redux input min bet data
   * @param maxBet redux max bet data
   */
  onSubmitHandler({ roomsFilterSettings }, { updateRoomsFilterSettings, cancelFilter, dispatch }, { minBet, maxBet }) {
    const { assets, timeframe } = roomsFilterSettings;
    const saveSettings = {
      active: true,
      assets,
      timeframe,
      minBet,
      maxBet,
    };

    // if no value provided remove filter on submit
    !assets.length && !timeframe.length && !maxBet && !minBet ? cancelFilter() : updateRoomsFilterSettings(saveSettings); // eslint-disable-line
    dispatch(filterRooms());

    dispatch(reset('filter')); // reset form for native pristine reset
    dispatch(initialize('filter', { minBet, maxBet })); // initialize with new values (minBet, maxBet)
  }

  /**
   * Opens assets list
   */
  toggleAssetsList(disabled = false) {
    if (disabled) return;
    const el = document.getElementById('assets_list');
    if (!this.state.assetsListOpened && el) {
      el.focus();
    }
    this.setState({
      assetsListOpened: !this.state.assetsListOpened,
    });
  }

  /**
   * Handler for assets checkboxes
   * @param assetName {string}
   */
  toggleAsset(assetName) {
    const { assets, timeframe } = this.state.roomsFilterSettings;
    this.setState({
      roomsFilterSettings: {
        assets: assets.includes(assetName) ? assets.filter((a) => a !== assetName) : assets.concat(assetName),
        timeframe,
      },
    });
  }

  /**
   * Remove asset on click in selected assets list
   * @param assetName {string}
   */
  removeAsset(assetName) {
    const { assets, timeframe } = this.state.roomsFilterSettings;
    if (assets.includes(assetName)) {
      this.setState({
        roomsFilterSettings: {
          assets: assets.filter((a) => a !== assetName),
          timeframe,
        },
      });
    }
  }

  /**
   * Clear all assets
   */
  clearAssetsList() {
    const { timeframe } = this.state.roomsFilterSettings;
    this.setState({
      roomsFilterSettings: {
        assets: [],
        timeframe,
      },
    });
  }

  toggleTimeframe(timeframeValue) {
    const { timeframe, assets } = this.state.roomsFilterSettings;
    this.setState({
      roomsFilterSettings: {
        assets,
        timeframe: timeframe.includes(timeframeValue) ? timeframe.filter((a) => a !== timeframeValue) : timeframe.concat(timeframeValue),
      },
    });
  }

  /**
   * Check if values were changed (comparing initial state) - only for checkboxes
   * @returns {boolean}
   */
  pristine() {
    return !(this.state && !isEqual(this.state.initialFilterState, this.state.roomsFilterSettings));
  }

  /**
   * Checks if assets checked (for label appearing and pointer events logic)
   * @param roomsFilterSettings
   * @returns {boolean}
   */
  hasAssetsChecked = ({ roomsFilterSettings }) => !!(roomsFilterSettings.assets.length);

  render() {
    const { availableAssets, roomsFilterSettings, submitting, handleSubmit, pristine } = this.props;
    const submit = handleSubmit((formData) => {
      this.onSubmitHandler(this.state, this.props, formData);
    });
    return (
      <StyledForm onSubmit={submit}>
        <TimeframeList
          toggleTimeframe={(timeframe) => { this.toggleTimeframe(timeframe); }}
          checkedTimeframes={this.state.roomsFilterSettings.timeframe}
        />
        <SelectInputWrapper>
          <InputWrp
            opened={this.state.assetsListOpened}
            onClick={() => { this.toggleAssetsList(this.hasAssetsChecked(this.state)); }}
            hasValuesLabel={this.hasAssetsChecked(this.state)}
          >
            <OpenIconWrapper onClick={() => { this.toggleAssetsList(); }} />
            <AssetsSelectInput active={this.state.assetsListOpened || this.hasAssetsChecked(this.state)} />
            {this.hasAssetsChecked(this.state) && <AssetValues
              toggleAssetsList={() => { this.toggleAssetsList(); }}
              clearAssets={() => { this.clearAssetsList(); }}
              assets={this.state.roomsFilterSettings.assets}
            />}
          </InputWrp>
          <AssetsList
            show={this.state.assetsListOpened}
            assets={availableAssets}
            toggleAssetsList={() => { this.toggleAssetsList(); }}
            roomsFilterSettings={roomsFilterSettings}
            toggleAsset={(asset) => { this.toggleAsset(asset); }}
            removeAsset={(asset) => { this.removeAsset(asset); }}
            checkedAssets={this.state.roomsFilterSettings.assets}
          />
        </SelectInputWrapper>
        <BetsInput />
        <ButtonWrapper>
          <Button
            type="submit"
            disabled={(this.pristine() || submitting) && pristine}
            theme="deposit"
          ><FormattedMessage {...messages.filterButton} /></Button>
        </ButtonWrapper>
      </StyledForm>
    );
  }
}

FilterForm.propTypes = {
  handleSubmit: func,
  submitting: bool,
  availableAssets: any,
  roomsFilterSettings: object,
  dispatch: func,
  pristine: bool, // for inputs minBet and maxBet, checkboxes comparing with custom pristine
};

export default reduxForm({
  form: 'filter',
})(FilterForm);
