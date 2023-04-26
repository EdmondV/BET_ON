import React from 'react';
import { node, array } from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Notifications from 'react-notification-system-redux';
import { createStructuredSelector } from 'reselect';
import { notificationStyles } from 'components/Notifications/NotificationStyles';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
  position: relative;
`;

function App({ notifications, children }) {
  return (
    <AppWrapper>
      {/* {appPreloading && <Loader bgColor={bgColor} root />} */}
      <Notifications
        style={notificationStyles}
        notifications={notifications}
      />
      {children}
    </AppWrapper>
  );
}

App.propTypes = {
  children: node,
  notifications: array,
};

const mapStateToProps = createStructuredSelector({
  notifications: (state) => state.get('notifications'),
  appPreloading: (state) => state.getIn(['preloader', 'appPreloading']),
});

export default connect(mapStateToProps)(App);
