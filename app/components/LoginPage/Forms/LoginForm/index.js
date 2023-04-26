import React from 'react';
import { func, bool, any } from 'prop-types';
import message, { FormattedMessage } from 'utils/intl';
import { reduxForm, change } from 'redux-form/immutable';
import Cookies from 'js-cookie';
import Input from 'components/Input';
import FormGroup from 'components/FormGroup';
import Button from 'components/Button';

import messages from 'containers/LoginPage/messages';

import Form from '../Form';

class LoginForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    if (Cookies.get('referrer')) return;

    const referrer = document.referrer;

    Cookies.set('referrer', referrer);
  }

  input(field) {
    this.props.dispatch({
      type: `INPUT_${field}`,
      meta: {
        analytics: {
          type: `INPUT_${field}`,
          category: 'interface',
        },
      },
    });
  }

  render() {
    const { handleSubmit, pristine, submitting, loginRequest, dispatch, formErrors } = this.props;
    const submit = handleSubmit((data) => {
      loginRequest(data);
      dispatch(change('login', 'submitting', false));
    });
    return (
      <Form onSubmit={submit}>
        <FormGroup>
          <Input
            name="email"
            label={message('email')}
            type="text"
            formErrors={formErrors}
            onBlur={() => this.input('email')}
          />
        </FormGroup>
        <FormGroup>
          <Input
            name="password"
            label={message('password')}
            type="password"
            formErrors={formErrors}
            onBlur={() => this.input('password')}
          />
        </FormGroup>
        <Button
          type="submit"
          disabled={pristine || submitting}
        >
          <FormattedMessage {...messages.login} />
        </Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: func,
  pristine: bool,
  submitting: bool,
  loginRequest: func,
  formErrors: any,
  dispatch: func,
};

export default reduxForm({
  form: 'login',
})(LoginForm);
