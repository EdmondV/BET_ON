import React from 'react';
import { func, bool, any } from 'prop-types';
import styled from 'styled-components';
import message, { FormattedMessage } from 'utils/intl';
import { reduxForm, change } from 'redux-form/immutable';
import FormGroup from 'components/FormGroup';
import Button from 'components/Button';

import Input from 'components/Input';

import messages from 'containers/LoginPage/messages';

import Form from '../Form';

const DelimiterLine = styled.div`
  margin: 0 -35px;
  height: 1px;
  background: rgba(256,256,256,0.5);
`;

class FeedbackForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
    const { handleSubmit, pristine, submitting, formErrors, feedbackRequest, dispatch } = this.props;
    const submit = handleSubmit((data) => {
      feedbackRequest(data);
      dispatch(change('feedback', 'submitting', false));
    });
    return (
      <Form>
        <FormGroup>
          <Input
            name="email"
            label={message('email')}
            type="text"
            required
            formErrors={formErrors}
            onBlur={() => this.input('email')}
          />
        </FormGroup>
        <DelimiterLine />
        <FormGroup>
          <Input
            name="message"
            label={message('feedback_message')}
            textArea
            noBorder
            rows={7}
            required
            formErrors={formErrors}
            onBlur={() => this.input('feedback_message')}
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

FeedbackForm.propTypes = {
  handleSubmit: func,
  pristine: bool,
  submitting: bool,
  formErrors: any,
  feedbackRequest: func,
  dispatch: func,
};

export default reduxForm({
  form: 'feedback',
})(FeedbackForm);

