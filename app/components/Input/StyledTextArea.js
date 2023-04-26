import React from 'react';
import { object, any, string, number, bool } from 'prop-types';
import { FormattedMessage } from 'utils/intl';

import { color } from 'styles-constants';
import Label from './Label';
import DefaultInputWrapper from './DefaultInputWrapper';
import messages from './messages';
import { getError } from './errorHandling';
import { ErrorWrapper } from './ErrorWrapper';

const Wrapper = DefaultInputWrapper.extend`
  resize: none;
  &:focus {
    padding-bottom: 0;
  }
  &::-webkit-scrollbar-track {
    border-radius: 4px;
  }
  &::-webkit-scrollbar {
    width: 5px;
    background: rgba(256,256,256,0.5);
    border: 2px solid #031432;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: ${color.success};
  }
  &:hover::-webkit-scrollbar-thumb {
    background: ${color.success};
  }
`;

export default class StyledTextArea extends React.PureComponent {
  static propTypes = {
    input: object,
    value: any,
    label: string,
    rows: number,
    cols: number,
    placeholder: string,
    formErrors: any,
    noBorder: bool,
    id: string,
  }

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      focused: false,
    };
  }

  onFocus = () => {
    this.setState({
      focused: true,
      active: true,
    });
  }

  onBlur = () => {
    this.setState({
      active: !!this.props.input.value.length,
      focused: false,
    });
  }

  render() {
    const { input, label, placeholder, rows, cols, formErrors, noBorder, id } = this.props;
    let error = false;
    let errorMessageId = '';
    if (formErrors && formErrors.length) {
      const err = formErrors.find((e) => e.field === input.name);
      if (err) {
        error = true;
        errorMessageId = getError(err.field, err.error);
      }
    }
    return (<Wrapper active={this.state.active} error={error} noBorder={noBorder}>
      <Label active={this.props.placeholder || this.state.active}>{label}</Label>
      <textarea id={id} {...input} rows={rows} cols={cols} placeholder={placeholder} onFocus={this.onFocus} onBlur={this.onBlur} />
      {(errorMessageId.length > 0) && <ErrorWrapper><FormattedMessage {...messages[errorMessageId]} /></ErrorWrapper>}
    </Wrapper>);
  }
}

