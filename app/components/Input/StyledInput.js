import React from 'react';
import { FormattedMessage } from 'utils/intl';
import { object, any, string, bool, func } from 'prop-types';
import DefaultInputWrapper from './DefaultInputWrapper';
import Label from './Label';
import messages from './messages';
import { getError } from './errorHandling';
import { ErrorWrapper } from './ErrorWrapper';

const isNotEmpty = (value) => {
  let res;
  switch (typeof value) {
    case 'string':
      res = !!value.length;
      break;
    case 'number':
      res = true;
      break;
    default:
      res = false;
  }

  return res;
};

export default class StyledInput extends React.PureComponent {
  static propTypes = {
    input: object,
    value: any,
    type: string,
    label: string,
    placeholder: string,
    autocomplete: bool,
    onBlur: func,
    formErrors: any,
    center: bool,
    maxLength: string,
    id: string,
    tabIndex: string,
    customActive: bool,
  }

  static defaultProps = {
    autocomplete: true,
    type: 'text',
    center: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      focused: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.mainInput && this.mainInput.matches(':-webkit-autofill')) {
        this.setState({ active: true });
      }
    }, 500);
  }

  onFocus = () => {
    this.setState({
      focused: true,
      active: true,
    });
  }

  onBlur = (e) => {
    const hasValue = isNotEmpty(this.props.input.value);
    this.setState({
      active: hasValue,
      focused: false,
    });
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }

  render() {
    const { input, type, label, placeholder, autocomplete, formErrors, center, maxLength, id, tabIndex, customActive } = this.props;
    let error = false;
    let errorMessageId = '';
    if (Array.isArray(formErrors) && formErrors.length) {
      const err = formErrors.find((e) => e.field === input.name);
      if (err) {
        error = true;
        errorMessageId = getError(err.field, err.error);
      }
    }

    const active = this.state.active || !!input.value.length || customActive;

    return (<DefaultInputWrapper active={active} error={error} center={center} label={label} className="input-wrapper">
      <Label active={this.props.placeholder || active} className={this.props.placeholder || active && 'active-label'}>{label}</Label>
      <input
        ref={(i) => { this.mainInput = i; }}
        {...input}
        autoComplete={!autocomplete ? 'new-password' : ''}
        type={type}
        placeholder={placeholder}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        maxLength={maxLength}
        id={id}
        tabIndex={tabIndex}
      />
      {(errorMessageId.length > 0) && <ErrorWrapper><FormattedMessage {...messages[errorMessageId]} /></ErrorWrapper>}
    </DefaultInputWrapper>);
  }
}
