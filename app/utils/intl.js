import React from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { translationMessages } from 'i18n';
import { store } from 'app';
import Notifications from 'react-notification-system-redux';

const auth = 'LoginPage.auth';
const depo = 'DepositPage';
const leftPanel = 'MainPage.LeftPanel';

const getLocale = () => translationMessages[store.getState().getIn(['settings', 'locale'])];
const m = (name) => getLocale()[name];
const errorMessage = (name) => `${m('errors.error')}${m(`errors.${name}`)}`;
const message = (name) => getLocale()[`${auth}.${name}`];
const depositPageMessage = (name) => getLocale()[`${depo}.${name}`];
const leftPanelMessage = (name) => getLocale()[`${leftPanel}.${name}`];

function defineMessages(messageDescriptors) {
  return messageDescriptors;
}

function notify(notification, type = 'success', sound = 'notification', action = { label: 'Hide' }, autoDismiss = 5) {
  return Notifications[type]({
    message: notification,
    action,
    autoDismiss,
    meta: { sound },
  });
}

function notifyError(notification, action) {
  return notify(notification, 'error', 'notificationFail', action);
}

const formatMessage = (mes) => translationMessages[mes.locale || 'en'][mes.id];

class Message extends React.Component { // eslint-disable-line
  static propTypes = {
    locale: string,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.locale !== nextProps.locale;
  }

  render() {
    return <span>{formatMessage(this.props)}</span>;
  }
}

const FormattedMessage = connect((state) => ({
  locale: state.getIn(['settings', 'locale']),
}))(Message);

export {
  depositPageMessage,
  leftPanelMessage,
  m,
  defineMessages,
  FormattedMessage,
  formatMessage,
  errorMessage,
  notify,
  notifyError,
};

export default message;
