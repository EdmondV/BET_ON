import React from 'react';
import { func, any, bool } from 'prop-types';
import message, { FormattedMessage } from 'utils/intl';
import { reduxForm, change } from 'redux-form/immutable';

import Input from 'components/Input';
import FormGroup from 'components/FormGroup';
import Button from 'components/Button';
import IconShowPassword from 'components/IconShowPassword';

import messages from 'containers/LoginPage/messages';

import Form from '../Form';

class SignupForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isPasswordVisible: false,
    };
  }
  onPasswordToggle = () => {
    this.setState({
      isPasswordVisible: !this.state.isPasswordVisible,
    });
    this.props.dispatch({
      type: 'SET_PASSWORD_VISIBILITY',
      meta: {
        analytics: {
          type: `SET_PASSWORD_${this.state.isPasswordVisible ? 'IN' : ''}VISIBLE`,
          category: 'interface',
        },
      },
    });
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
    const { handleSubmit, formErrors, pristine, submitting, signupRequest, dispatch } = this.props;
    const submit = handleSubmit((data) => {
      signupRequest(data);
      dispatch(change('signup', 'submitting', false));
    });
    return (
      <Form onSubmit={submit} autoComplete="off">
        <FormGroup>
          <Input
            name="email"
            label={message('email')}
            required
            type="text"
            formErrors={formErrors}
            autocomplete={false}
            onBlur={() => this.input('email')}
          />
        </FormGroup>
        <FormGroup>
          <Input
            name="username"
            label={message('name')}
            type="text"
            required
            formErrors={formErrors}
            autocomplete={false}
            onBlur={() => this.input('username')}
          />
        </FormGroup>
        <FormGroup>
          <Input
            name="password"
            label={message('password')}
            type={this.state.isPasswordVisible ? 'text' : 'password'}
            required
            autocomplete={false}
            formErrors={formErrors}
            onBlur={() => this.input('password')}
          />
          <IconShowPassword onClick={this.onPasswordToggle} showPassword={this.state.isPasswordVisible} />
        </FormGroup>
        <Button
          type="submit"
          disabled={pristine || submitting}
        ><FormattedMessage {...messages.signup} /></Button>
      </Form>
    );
  }
}

SignupForm.propTypes = {
  handleSubmit: func,
  formErrors: any,
  pristine: bool,
  submitting: bool,
  signupRequest: func,
  dispatch: func,
};

export default reduxForm({
  form: 'signup',
})(SignupForm);
