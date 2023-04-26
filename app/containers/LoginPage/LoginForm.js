import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import Input from 'components/Input';
import Button from 'components/Button';

// import { redirectToRoom } from 'utils/redirects';

import {
  FormSection,
} from './LoginPageStyles';
import { promisedAction } from '../../utils/promiseAction';
import { demoLogin, login } from './actions';

const disabled = ({ login, password }) => !(login) || !(password); // eslint-disable-line

class LoginForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      demoUserName: null,
      isMobile: this.deviceInfo(),
      form: {
        login: '',
        password: '',
      },
      demoLogin: false,
    };
  }

  setValue(e, key) {
    this.setState({
      form: {
        ...this.state.form,
        [key]: e.target.value,
      },
      demoLogin: false,
    });
  }

  deviceInfo() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return true;
    return false;
  }

  render() {
    const { handleSubmit } = this.props;

    const submit = handleSubmit((formData) => {
      if (!this.state.demoLogin) {
        promisedAction(login, formData);
      } else {
        promisedAction(demoLogin);
      }
    });

    return (
      <form onSubmit={submit}>
        <FormSection>
          <Input
            name="login"
            label={'Username or email'}
            type="text"
            onChange={(e) => { this.setValue(e, 'login'); }}
          />
          <Input
            name="password"
            label={'Password'}
            type="text"
            onChange={(e) => { this.setValue(e, 'password'); }}
          />
          <div className="submit-button">
            <Button type="submit" disabled={disabled(this.state.form)}>Sign in</Button>
            <div style={{ margin: '14px 0' }}>OR</div>
            <Button type="submit" onClick={() => { this.setState({ demoLogin: true }); }}>Play demo</Button>
          </div>
          <div className="copy">© Betonchart</div>
          {this.state.isMobile && <div style={{ marginTop: '15px', color: 'rgba(256,256,256,.5)' }}>Mobile version in development, please use desktop computer.</div>}
        </FormSection>
      </form>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
};

export default reduxForm({
  form: 'login',
})(LoginForm);
