import React from 'react';
import styled from 'styled-components';
import { object, func, any, string, bool } from 'prop-types';
import { reduxForm, reset, formValueSelector } from 'redux-form/immutable';
import { connect } from 'react-redux';
import SvgIcon from 'components/SvgIcon';
import AccountTooltip from 'components/AccountTooltip';
import { hexToRgb, color } from 'styles-constants';
import message from 'utils/intl';

import Input from 'components/Input';
import IconShowPassword from 'components/IconShowPassword';

const FormGroup = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 24px;
`;

const SubmitBtn = styled.button`
  cursor: pointer;
  position: relative;
  transition: opacity 0.3s ease-out;
  &:hover {
    &:before {
      content: '';
      background: rgba(${hexToRgb(color.success)}, 0.2);
      width: 34px;
      height: 34px;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
      right: 0;
      margin: 0 auto;
    }
  }
  &:disabled {
    opacity: 0.4;
    pointer-events: ${({ icon }) => icon === 'replay' ? 'none' : 'auto'}; /* fix hover bug on disabled button */
  }
`;

const IconWrapper = styled.div`
  align-self: flex-end;
  padding-left: 4px;
`;

const StyledForm = styled.form`
  margin-top: 40px;
`;

const ShowPasswordWrapper = styled.div`
  > div {
    right: 40px;
    bottom: 8px;
  }
`;

export class ProfileForm extends React.PureComponent { // eslint-disable-line
  componentWillMount() {
    this.setState({
      multiple: false,
      showTooltip: false,
      confirmationSent: false,
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.confirmationSent) { // disable confirmation send multiple times
      this.setState({
        confirmationSent: true,
      });
    } else if (!nextProps.confirmationSent) {
      this.setState({
        confirmationSent: false,
      });
    }
    if (!nextProps.secondAsideOpened && this.props.secondAsideOpened) {
      this.props.dispatch({
        type: 'CONFIRMATION_RESET', // reset confirmation on close edit settings
      });
    }
  }
  componentWillUnmount() {
    if (this.props.confirmationSent) {
      this.props.dispatch({
        type: 'CONFIRMATION_RESET', // reset confirmation on close account aside
      });
    }
  }
  onPasswordToggle = () => {
    this.setState({
      isPasswordVisible: !this.state.isPasswordVisible,
    });
  };
  onHoverHandler = (enter) => {
    this.setState({
      showTooltip: enter,
    });
  };
  setRequestType(type) {
    this.setState({
      multiple: false,
      type,
    });
  }
  getError(formErrors, fieldName) {
    return !!(formErrors.find((e) => e.field === fieldName));
  }
  submitRequest(type, payload) {
    const keys = Object.keys(payload);
    const { dispatch } = this.props;
    if (this.state.multiple) {
      for (let i = 0; i < keys.length; i += 1) {
        const fieldVal = payload[keys[i]];
        if (fieldVal) this.performRequest(keys[i], payload);
      }
      dispatch(reset('edit_profile'));
      this.setState({ multiple: false });
    } else {
      const { username, email, password, oldPassword } = payload;
      switch (type) {
        case 'resend':
          dispatch({
            type: 'CONFIRMATION_REQUEST',
          });
          break;
        case 'username':
          dispatch({
            type: 'UPDATE_USERNAME_REQUEST',
            payload: {
              username,
            },
          });
          break;
        case 'email':
          dispatch({
            type: 'CHANGE_EMAIL_REQUEST',
            payload: {
              email,
            },
          });
          break;
        case 'password':
          dispatch({
            type: 'UPDATE_PASSWORD_REQUEST',
            payload: {
              password,
              oldPassword,
            },
          });
          break;
        default:
          break;
      }
    }
  }
  performRequest(type, data) {
    const { dispatch } = this.props;
    const typesMap = {
      username: 'UPDATE_USERNAME_REQUEST',
      email: 'CHANGE_EMAIL_REQUEST',
      password: 'UPDATE_PASSWORD_REQUEST',
    };
    if (typesMap[type]) {
      switch (typesMap[type]) {
        case 'password':
          dispatch({
            type: typesMap[type],
            payload: {
              password: data.password,
              oldPassword: data.oldPassword,
            },
          });
          break;
        case 'resend':
          break;
        default:
          dispatch({
            type: typesMap[type],
            payload: {
              ...data,
            },
          });
      }
    }
  }
  render() {
    const { handleSubmit, formErrors, usernameVal, emailVal, passwordVal } = this.props;
    const { email, username, verified } = this.props.user;
    const submit = handleSubmit((payload) => this.submitRequest(this.state.type, payload));
    this.getError(formErrors, 'username');
    return (
      <StyledForm onKeyPress={(e) => { if (e.key === 'Enter') this.setState({ multiple: true }); }} onSubmit={submit}>
        <SubmitBtn style={{ display: 'none' }} disabled={!emailVal && !usernameVal && !passwordVal} />
        <FormGroup style={{ position: 'relative' }}>
          <Input
            name="email"
            label={message('email')}
            placeholder={email}
            type="text"
            formErrors={formErrors}
            customError={this.getError(formErrors, 'email')}
          />
          <IconWrapper
            onMouseEnter={() => this.onHoverHandler(true)}
            onMouseLeave={() => this.onHoverHandler(false)}
          >
            { (!verified && !emailVal) &&
            <SubmitBtn
              onClick={() => this.setRequestType('resend')}
              type="submit"
              icon="replay"
              disabled={this.state.confirmationSent}
            >
              <SvgIcon
                style={{ paddingLeft: '1px' }}
                styles={{ width: '20px', color: color.success }}
                icon="replay"
              />
            </SubmitBtn>
            }
            { (verified || (!verified && emailVal)) &&
            <SubmitBtn onClick={() => this.setRequestType('email')} type="submit" disabled={!emailVal}>
              <SvgIcon style={{ paddingLeft: '1px' }} styles={{ width: '20px', color: color.success }} icon="save" />
            </SubmitBtn>
            }
          </IconWrapper>
          {(!verified && !emailVal) && <AccountTooltip
            onClickHandler={this.onClickHandler}
            name="resend"
            show={this.state.showTooltip}
            confirmationSent={this.state.confirmationSent}
            theme="resendConfirmation"
          />}
        </FormGroup>
        <FormGroup>
          <Input
            name="username"
            label={message('name')}
            placeholder={username}
            type="text"
            formErrors={formErrors}
            customError={this.getError(formErrors, 'username')}
          />
          <IconWrapper>
            <SubmitBtn onClick={() => this.setRequestType('username')} type="submit" disabled={!usernameVal}>
              <SvgIcon style={{ paddingLeft: '1px' }} styles={{ width: '20px', color: color.success }} icon="save" />
            </SubmitBtn>
          </IconWrapper>
        </FormGroup>
        <FormGroup style={{ marginTop: 46, paddingRight: 37 }}>
          <Input
            name="oldPassword"
            label={message('password')}
            type="password"
            required
            autocomplete={false}
            formErrors={formErrors}
            customError={this.getError(formErrors, 'oldPassword')}
          />
        </FormGroup>
        <FormGroup>
          <Input
            name="password"
            label={message('newPassword')}
            type={this.state.isPasswordVisible ? 'text' : 'password'}
            required
            autocomplete={false}
            formErrors={formErrors}
            customError={this.getError(formErrors, 'password')}
          />
          <IconWrapper>
            <SubmitBtn onClick={() => this.setRequestType('password')} type="submit" disabled={!passwordVal}>
              <SvgIcon style={{ paddingLeft: '1px' }} styles={{ width: '20px', color: color.success }} icon="save" />
            </SubmitBtn>
          </IconWrapper>
          <ShowPasswordWrapper>
            <IconShowPassword onClick={this.onPasswordToggle} showPassword={this.state.isPasswordVisible} />
          </ShowPasswordWrapper>
        </FormGroup>
      </StyledForm>
    );
  }
}

ProfileForm.propTypes = {
  handleSubmit: func,
  dispatch: func,
  user: object,
  formErrors: any,
  usernameVal: string,
  emailVal: string,
  passwordVal: string,
  verified: bool,
  confirmationSent: bool,
  secondAsideOpened: bool,
};

ProfileForm = reduxForm({ // eslint-disable-line
  form: 'edit_profile',
})(ProfileForm);

const selector = formValueSelector('edit_profile');

ProfileForm = connect((state) => { // eslint-disable-line
  const usernameVal = selector(state, 'username');
  const emailVal = selector(state, 'email');
  const passwordVal = selector(state, 'password');
  return {
    usernameVal,
    emailVal,
    passwordVal,
  };
})(ProfileForm);

export default ProfileForm;

