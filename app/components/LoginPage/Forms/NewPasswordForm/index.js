import React from 'react';
import { func, bool, any } from 'prop-types';
import message, { FormattedMessage } from 'utils/intl';
import { reduxForm } from 'redux-form/immutable';

import Input from 'components/Input';
import FormGroup from 'components/FormGroup';
import Button from 'components/Button';
import IconShowPassword from 'components/IconShowPassword';
import messages from 'containers/LoginPage/messages';

import { newPassword } from 'containers/LoginPage/actions';

import Form from '../Form';

class NewPasswordForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
  };

  render() {
    const { handleSubmit, pristine, formErrors, submitting } = this.props;
    const submit = handleSubmit(newPassword);
    return (
      <Form>
        <FormGroup>
          <Input
            name="password"
            label={message('password')}
            type={this.state.isPasswordVisible ? 'text' : 'password'}
            required
            autocomplete={false}
            formErrors={formErrors}
          />
          <IconShowPassword onClick={this.onPasswordToggle} showPassword={this.state.isPasswordVisible} />
        </FormGroup>
        <Button
          type="submit"
          onClick={submit}
          disabled={pristine || submitting}
          theme="newLogin"
        >
          <FormattedMessage {...messages.continue} />
        </Button>
      </Form>
    );
  }
}

NewPasswordForm.propTypes = {
  handleSubmit: func,
  formErrors: any,
  pristine: bool,
  submitting: bool,
};

export default reduxForm({
  form: 'newPassword',
})(NewPasswordForm);

