import { defineMessages } from 'utils/intl';

export default defineMessages({
  field_required_error: {
    id: 'Input.fieldRequiredError',
    defaultMessage: 'This field is required',
  },
  email_verified_error: {
    id: 'Input.emailVerifiedError',
    defaultMessage: 'Email is verified',
  },
  email_invalid_error: {
    id: 'Input.emailInvalidError',
    defaultMessage: 'Wrong e-mail',
  },
  email_used_error: {
    id: 'Input.emailUsedError',
    defaultMessage: 'This e-mail already registered',
  },
  username_used_error: {
    id: 'Input.usernameUsedError',
    defaultMessage: 'This username already registered',
  },
  username_length_error: {
    id: 'Input.usernameLengthError',
    defaultMessage: 'Must be from 2 to 50 symbols long',
  },
  message_length_error: {
    id: 'Input.messageLengthError',
    defaultMessage: 'Must be minimum 2 symbols long',
  },
  amount_length_error: {
    id: 'Input.amountLengthError',
    defaultMessage: 'Must be from $50 to $10 000',
  },
  password_length_error: {
    id: 'Input.passwordLengthError',
    defaultMessage: 'Must be from 6 to 36 symbols long',
  },
  password_incorrect_error: {
    id: 'Input.passwordIncorrectError',
    defaultMessage: 'Incorrect current password',
  },
});
