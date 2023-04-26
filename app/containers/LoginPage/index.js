import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { LogoSmall } from 'components/Logo';

import { saveDemoUserName } from './actions';

import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ToggleForm from '../../components/LoginPage/Layout/ToggleForm';

import {
  PageWrapper,
  FormSection,
  FormWrapper,
  LoginFormHeader,
} from './LoginPageStyles';

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      form: 'login',
    };

    this.switchForm = this.switchForm.bind(this);
  }

  switchForm(form) {
    this.setState({ form });
  }

  render() {
    return (
      <PageWrapper>
        <FormSection>
          <FormWrapper>
            <LoginFormHeader>
              <h2>Betonchart</h2>
              <LogoSmall />
            </LoginFormHeader>
            <ToggleForm
              form={this.state.form}
              switchForm={this.switchForm}
            />
            {this.state.form === 'login' ?
              <LoginForm {...this.props} /> :
              <SignUpForm {...this.props} />
            }
          </FormWrapper>
        </FormSection>
      </PageWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  demoUserName: (state) => state.getIn(['authPage']).demoUserName,
});

const mapDispatchToProps = (dispatch) => ({
  saveUserName: (name) => dispatch(saveDemoUserName(name)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
