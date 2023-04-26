import React from 'react';
import { connect } from 'react-redux';
import { func, string } from 'prop-types';
import { FormattedMessage } from 'utils/intl';
import messages from 'containers/LoginPage/messages';
import LocaleToggle from 'components/LocaleToggle';

import {
  Footer,
  FooterMenu,
  Copyright,
} from './PageFooterStyles';

const version = `${process.env.VERSION} ${process.env.BUILD}`;

class PageFooter extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: func,
    onLocaleToggle: func,
    locale: string,
  };
  render() {
    return (
      <Footer>
        <FooterMenu>
          <a
            target="_blank"
            onClick={() => {
              this.props.dispatch({
                type: 'GO_TO_TERMS',
                meta: {
                  analytics: {
                    type: 'GO_TO_TERMS',
                    category: 'interface',
                  },
                },
              });
            }}
            href="https://tradingrooms.com/terms.html"
          >
            <FormattedMessage {...messages.signupPage_footer_terms} />
          </a>
          <a
            target="_blank"
            onClick={() => {
              this.props.dispatch({
                type: 'GO_TO_PRIVACY',
                meta: {
                  analytics: {
                    type: 'GO_TO_PRIVACY',
                    category: 'interface',
                  },
                },
              });
            }}
            href="https://tradingrooms.com/privacy.html"
          >
            <FormattedMessage {...messages.signupPage_footer_privacy} />
          </a>
          <a
            target="_blank"
            onClick={() => {
              this.props.dispatch({
                type: 'GO_TO_PAYMENT',
                meta: {
                  analytics: {
                    type: 'GO_TO_PAYMENT',
                    category: 'interface',
                  },
                },
              });
            }}
            href="https://tradingrooms.com/payment.html"
          >
            <FormattedMessage {...messages.signupPage_footer_payment} />
          </a>
          <a
            target="_blank"
            onClick={() => {
              this.props.dispatch({
                type: 'GO_TO_FAQ',
                meta: {
                  analytics: {
                    type: 'GO_TO_FAQ',
                    category: 'interface',
                  },
                },
              });
            }}
            href="https://tradingrooms.com/faq.html"
          >
            <FormattedMessage {...messages.signupPage_footer_faq} />
          </a>
          <LocaleToggle locale={this.props.locale} onLocaleToggle={this.props.onLocaleToggle} dispatch={this.props.dispatch} />
        </FooterMenu>
        <Copyright>© Trading rooms 2017, <span className="version">ver. {version}</span></Copyright>
      </Footer>
    );
  }
}

export default connect(null, (dispatch) => ({ dispatch }))(PageFooter);
