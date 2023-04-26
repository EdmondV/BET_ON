import React from 'react';
import styled from 'styled-components';
import { func, bool, object } from 'prop-types';
import { fontSize, space, flex, fontWeight } from 'styles-constants';

import SvgIcon from 'components/SvgIcon';
import CancelFilterIcon from 'components/CancelFilterIcon';

const FilterIconWrp = styled.div`
  ${flex(null, 'center')};
  padding: 0 10px;
  svg {
    width: 12px;
    fill: #fff;
  }
`;

const Label = styled.span`
  font-size: ${fontSize.body};
  padding-top: 1px;
  line-height: 1;
  padding-left: ${space(1.5)};
  text-transform: uppercase;
  font-weight: ${fontWeight.lightBold};
`;

const IconLabelWrp = styled.span`
  ${flex(null, 'center')};
  cursor: pointer;
  opacity: ${({ active }) => active ? '1' : '0.7'};
`;

export default class FilterIcon extends React.PureComponent { // eslint-disable-line
  render() {
    const { toggleFilterPanel, filterPanelOpened, roomsFilterSettings, cancelFilter, dispatch } = this.props;
    return (
      <FilterIconWrp>
        <IconLabelWrp active={filterPanelOpened} onClick={toggleFilterPanel}>
          <SvgIcon icon="filter" />
          <Label>Filter</Label>
        </IconLabelWrp>
        {roomsFilterSettings.active && <CancelFilterIcon onClick={cancelFilter} dispatch={dispatch} removeFilter />}
      </FilterIconWrp>
    );
  }
}

FilterIcon.propTypes = {
  filterPanelOpened: bool,
  roomsFilterSettings: object,
  cancelFilter: func,
  toggleFilterPanel: func,
  dispatch: func,
};
