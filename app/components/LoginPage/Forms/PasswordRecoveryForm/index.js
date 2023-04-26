import React from 'react';
import { func, bool } from 'prop-types';
import message, { FormattedMessage } from 'utils/intl';
import { reduxForm } from 'redux-form/immutable';

import { recoverPassword } from 'containers/LoginPage/actions';

import Input from 'components/Input';
import FormGroup from 'components/FormGroup';
import Button from 'components/Button';

import messages from 'containers/LoginPage/messages';

import Form from '../Form';

class PasswordRecoveryForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
    const { handleSubmit, pristine, submitting } = this.props;
    const submit = handleSubmit(recoverPassword);
    return (
      <Form>
        <FormGroup>
          <Input
            name="email"
            label={message('email')}
            type="text"
            onBlur={() => this.input('email')}
          />
        </FormGroup>
        <Button
          type="submit"
          onClick={submit}
          disabled={pristine || submitting}
          theme="newLogin"
        >
          <FormattedMessage {...messages.submit} />
        </Button>
      </Form>
    );
  }
}

PasswordRecoveryForm.propTypes = {
  handleSubmit: func,
  pristine: bool,
  submitting: bool,
  dispatch: func,
};

export default reduxForm({
  form: 'passwordRecovery',
})(PasswordRecoveryForm);
