import React from 'react';
import { bool, string, object, any, number } from 'prop-types';
import { Field } from 'redux-form';
import StyledTextArea from './StyledTextArea';
import StyledInput from './StyledInput';

// const required = (value) => (value ? undefined : 'Required');

const RenderField = ({ input, textArea, label, placeholder, autocomplete, type, rows, meta: { touched, error }, formErrors, center, noBorder, maxLength, id, tabIndex, customActive }) => (
  textArea ?
    <StyledTextArea
      placeholder={placeholder}
      label={label}
      input={input}
      rows={rows}
      error={!!(touched && error)}
      formErrors={formErrors}
      onBlur={input.onBlur}
      noBorder={noBorder}
      id={id}
    /> :
      <StyledInput
        placeholder={placeholder}
        label={label}
        type={type}
        input={input}
        autocomplete={autocomplete}
        error={!!(touched && error)}
        formErrors={formErrors}
        onBlur={input.onBlur}
        center={center}
        maxLength={maxLength}
        id={id}
        tabIndex={tabIndex}
        customActive={customActive}
      />
);

RenderField.propTypes = {
  input: object,
  placeholder: string,
  autocomplete: bool,
  label: string,
  type: string,
  textArea: bool,
  meta: object,
  rows: number,
  formErrors: any,
  center: bool,
  noBorder: bool,
  maxLength: string,
  id: string,
  tabIndex: string,
  customActive: bool,
};

// const getError = (props) => props.formErrors && props.formErrors.find((e) => e.field === props.name);
const Input = (props) => (<Field
  component={props.component || RenderField}
  {...props}
  formErrors={props.formErrors}
/>);

Input.propTypes = {
  component: any,
  formErrors: any,
};

export default Input;
