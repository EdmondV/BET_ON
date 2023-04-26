import React from 'react';
import { func, string, bool } from 'prop-types';
import { FormattedMessage } from 'utils/intl';
import messages from 'containers/MainPage/LeftPanel/messages';
import SearchInput from 'components/SearchInput';
import SvgIcon from 'components/SvgIcon';
import SoccerIcon from '../../containers/MainPage/FootballPage/MenuIcon/Soccer/SoccerIcon';
import {
  AsideHeader,
  AsideTitle,
  HeaderIcon,
  SearchInputWrapper,
} from './LeftPanelHeaderStyles';

export default function LeftPanelHeader(props) {
  const route = props.route;
  switch (route) {
    case 'soccer':
      return (
        <AsideHeader>
          <AsideTitle>
            <HeaderIcon>
              <SoccerIcon />
            </HeaderIcon>
            <FormattedMessage {...messages.matches} />
          </AsideTitle>
        </AsideHeader>
      );
    case 'history':
      return (
        <AsideHeader>
          <AsideTitle>
            <HeaderIcon>
              <SvgIcon icon="history" />
            </HeaderIcon>
            <FormattedMessage {...messages.history_rooms} />
          </AsideTitle>
          <SearchInputWrapper>
            <SearchInput onSearchInputChange={props.onSearchInputChange} loading={props.searchProcessing} />
          </SearchInputWrapper>
        </AsideHeader>
      );
    case 'feedback':
      return (
        <AsideHeader>
          <AsideTitle>
            <HeaderIcon>
              <SvgIcon icon="feedback" />
            </HeaderIcon>
            <FormattedMessage {...messages.feedback} />
          </AsideTitle>
        </AsideHeader>
      );
    case 'leaders':
      return (
        <AsideHeader>
          <AsideTitle>
            <HeaderIcon>
              <SvgIcon icon="leaders" />
            </HeaderIcon>
            <FormattedMessage {...messages.leaders} />
          </AsideTitle>
        </AsideHeader>
      );
    case 'account':
    default:
      return null;
  }
}

LeftPanelHeader.propTypes = {
  route: string,
  onSearchInputChange: func,
  searchProcessing: bool,
  dispatch: func,
};
