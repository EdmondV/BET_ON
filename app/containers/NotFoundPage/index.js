/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { FormattedMessage } from 'utils/intl';

import H1 from 'components/H1';
import messages from './messages';
import { removeAppPreloader } from '../../utils/domHelper';

export default class NotFound extends React.PureComponent {
  componentDidMount() {
    removeAppPreloader();
  }
  render() {
    return (
      <article>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
      </article>
    );
  }
}
