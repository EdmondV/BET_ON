import React from 'react';
import PropTypes from 'prop-types';

import {
  ToggleWrapper,
  TogglerLink,
} from './ToggleFormStyles';

export default class ToggleForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { form, switchForm } = this.props;

    return (
      <ToggleWrapper form={form}>
        <TogglerLink
          active={form === 'login'}
          onClick={() => { switchForm('login'); }}
        >
          Sign in
        </TogglerLink>
        <TogglerLink
          active={form === 'signUp'}
          onClick={() => { switchForm('signUp'); }}
        >
          Sign up
        </TogglerLink>
      </ToggleWrapper>
    );
  }
}

ToggleForm.propTypes = {
  switchForm: PropTypes.func,
  form: PropTypes.string,
};
