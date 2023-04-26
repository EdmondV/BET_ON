import React from 'react';
import { string, bool, object, func } from 'prop-types';
import { fromJS } from 'immutable';
import { updateRoomsSortSettings } from 'modules/settings/actions';

import SvgIcon from 'components/SvgIcon';

import messages from 'containers/MainPage/LeftPanel/messages';
import { FormattedMessage } from 'utils/intl';

import {
  IconWrapper,
  RoomsListSortWrapper,
  Label,
} from './RoomsListSortStyles';


const GetIcon = ({ type, direction }) => {
  let iconName = '';
  const arrowDirection = direction === 'DESC' ? 'down' : 'up';

  if (type === 'deadlineAt') {
    iconName = `clock_arrow_${arrowDirection}`;
  } else if (type === 'bet') {
    iconName = `coins_arrow_${arrowDirection}`;
  }

  return <SvgIcon icon={iconName} />;
};

GetIcon.propTypes = {
  type: string,
  direction: string,
};

const SortBy = (props) => {
  const { active, onClick, bordered } = props;

  return <IconWrapper onClick={onClick} active={active} bordered={bordered}><GetIcon {...props} /></IconWrapper>;
};

SortBy.propTypes = {
  active: bool,
  onClick: func,
  bordered: bool,
};

export default class RoomsListSort extends React.PureComponent { // eslint-disable-line

  changeSort(iconType) {
    const { dispatch } = this.props;
    const { active, direction, type } = this.props.roomsSortSettings;
    const toggleDirection = (dir) => dir === 'ASC' ? 'DESC' : 'ASC';

    let result = {};

    if (!active) { // if filter is disabled at all, just activate icon
      result = {
        active: true,
        type: iconType,
        direction: 'DESC',
      };
    } else {
      if (iconType === type) { // eslint-disable-line
        if (direction === 'DESC') { // toggling direction from DESC TO ASC (on same icon)
          result = {
            active: true,
            type: iconType,
            direction: toggleDirection(direction),
          };
        } else { // from "ASC" to -> disable filter at all
          result = {
            active: false,
            type: iconType,
            direction,
          };
        }
      } else if (iconType !== type) { // switching between types
        result = {
          active: true,
          type: iconType,
          direction: 'DESC',
        };
      }
    }
    dispatch(updateRoomsSortSettings(fromJS(result)));
    dispatch({
      type: 'SORT_ROOMS',
    });
  }

  render() {
    const { active, direction, type } = this.props.roomsSortSettings;
    return (
      <RoomsListSortWrapper>
        <Label><FormattedMessage {...messages.sortBy} />:</Label>
        <SortBy
          active={type === 'deadlineAt' && active}
          direction={type === 'deadlineAt' && active ? direction : 'DESC'}
          type="deadlineAt"
          onClick={() => { this.changeSort('deadlineAt'); }}
        />
        <SortBy
          active={type === 'bet' && active}
          direction={type === 'bet' && active ? direction : 'DESC'}
          type="bet"
          onClick={() => { this.changeSort('bet'); }}
          bordered
        />
      </RoomsListSortWrapper>
    );
  }
}

RoomsListSort.propTypes = {
  roomsSortSettings: object,
  dispatch: func,
};
