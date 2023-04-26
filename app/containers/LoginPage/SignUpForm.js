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
import { signup } from './actions';

const disabled = ({ username, email, password }) => !(username) || !(email) || !(password);

class SignUpForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      demoUserName: null,
      isMobile: this.deviceInfo(),
      form: {
        username: '',
        email: '',
        password: '',
      },
    };
  }

  // submit = () => {
  //   const { demoUserName } = this.state;
  //   const { saveUserName } = this.props;
  //   let name;
  //   if (demoUserName) {
  //     name = demoUserName;
  //   } else {
  //     const randomId = Math.random().toString(36).substr(2, 9);
  //     name = randomId;
  //   }
  //   localStorage.setItem('demoUserName', name);
  //   saveUserName(name);
  //   redirectToRoom(1);
  // }

  setValue(e, key) {
    this.setState({
      form: {
        ...this.state.form,
        [key]: e.target.value,
      },
    });
  }

  deviceInfo() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return true;
    return false;
  }

  render() {
    const { handleSubmit } = this.props;

    const submit = handleSubmit((formData) => {
      promisedAction(signup, formData);
    });

    return (
      <form onSubmit={submit}>
        <FormSection>
          <Input
            name="username"
            label={'Username'}
            type="text"
            onChange={(e) => { this.setValue(e, 'username'); }}
          />
          <Input
            name="email"
            label={'Email'}
            type="text"
            onChange={(e) => { this.setValue(e, 'email'); }}
          />
          <Input
            name="password"
            label={'Password'}
            type="text"
            onChange={(e) => { this.setValue(e, 'password'); }}
          />
          <div className="submit-button">
            <Button type="submit" onClick={this.submit} disabled={disabled(this.state.form)}>Sign up</Button>
          </div>
          <div className="copy">© Betonchart</div>
          {this.state.isMobile && <div style={{ marginTop: '15px', color: 'rgba(256,256,256,.5)' }}>Mobile version in development, please use desktop computer.</div>}
        </FormSection>
      </form>
    );
  }
}

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func,
};

export default reduxForm({
  form: 'login',
})(SignUpForm);
