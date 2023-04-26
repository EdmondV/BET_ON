import React from 'react';
import { func, bool, string, object, any } from 'prop-types';
import { reduxForm, reset } from 'redux-form/immutable';
import LeftPanelHeader from 'components/LeftPanelHeader';
import FormGroup from 'components/FormGroup';
import StyledTextArea from 'components/Input';
import Label from 'components/Input/Label';
import SvgIcon from 'components/SvgIcon';
import { m } from 'utils/intl';

import {
  HeaderWrapper,
  FeedbackWrapper,
  FeedbackForm,
  CapchaWrapper,
  FormFooter,
  FooterText,
  ButtonWrapper,
  StyledButton,
  textAreaHeight,
  Circle,
} from './FeedbackStyles';

const submitDisabled = (pristine, submitting, { value }) => pristine || submitting || value && value.length < 2;

class Feedback extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.setState({
      value: '',
      focused: false,
      scrollbarDisabled: true,
    });
  }

  componentDidMount() {
    this.bindHandlers(this.formGroup);
    this.resetFormState.bind(this); // reset state manually in saga
  }

  componentDidUpdate() {
    this.verticalResizer(this.formGroup);
  }

  onChangeHandler = (e) => {
    if (e && e.target) {
      this.setState({
        value: e.target.value || '',
      });
    }
  };

  onBlurHandler = () => {
    this.toggleFocused(false);
  };

  onFocusHandler = () => {
    this.toggleFocused(true);
  };

  /*
  Custom Focus and Blur handler binded with react innerRef because components/Input handlers are busy
   */
  bindHandlers = (el) => {
    if (el && el.querySelector('#feedback_input')) {
      const input = el.querySelector('#feedback_input');
      input.onfocus = this.onFocusHandler;
      input.onblur = this.onBlurHandler;
    }
  };

  toggleFocused = (focused) => {
    this.setState({
      focused,
    });
  };

  disableScrollbar = (disable) => {
    this.setState({
      scrollbarDisabled: disable,
    });
  };

  /*
  Set height based on inner content (text length)
   */
  verticalResizer = (el) => {
    if (el && el.querySelector('#feedback_input') && this.heightDetector) {
      const input = el.querySelector('#feedback_input'); // textarea
      const heightD = this.heightDetector; // textarea content text height emulator

      heightD.style.width = `${input.clientWidth}px`; // set the width for emulator

      if (!heightD.clientHeight) {
        input.style.height = textAreaHeight; // if no value - set default height for input
      } else {
        // add scrollbar if textarea is over 260px in height
        // and stop incremementing
        if (heightD.clientHeight > 260) { // eslint-disable-line
          this.disableScrollbar(false);
        } else {
          if (!this.state.scrollbarDisabled) this.disableScrollbar(true); // if scrollbar is active - disables it
          input.style.height = `${heightD.clientHeight}px`; // set textarea height based on the content height
        }
      }
    }
  };

  // To initial state (executes in sagas)
  resetFormState = () => {
    this.setState({
      value: '',
      focused: false,
      scrollbarDisabled: true,
    });
  };

  render() {
    const { handleSubmit, pristine, submitting, dispatch, sendFeedback, formErrors } = this.props;
    const submit = handleSubmit((data) => {
      sendFeedback({
        ...data,
        email: this.props.user.email,
        cb: [
          () => dispatch(reset('feedback')),
          () => this.resetFormState(),
        ],
      });
    });
    return (
      <div>
        <HeaderWrapper>
          <LeftPanelHeader route={this.props.route} />
        </HeaderWrapper>
        <FeedbackWrapper>
          <FeedbackForm
            onSubmit={submit}
            active={this.state.focused || this.state.value}
            scrollbarDisabled={this.state.scrollbarDisabled}
          >
            <FormGroup innerRef={(ref) => { this.formGroup = ref; }}>
              <Label
                active={this.state.focused || this.state.value}
                className="label"
              >
                {this.state.focused || this.state.value ? m('global.activeMessagePlaceholder') : m('global.messagePlaceholder')}
              </Label>
              <StyledTextArea
                name="message"
                textArea
                formErrors={formErrors}
                id="feedback_input"
                onChange={this.onChangeHandler}
                rows={1}
              />
            </FormGroup>
            <input type="hidden" name="email" value={this.props.user.email} />
            <CapchaWrapper />
            <FormFooter>
              <FooterText disabled={submitDisabled(pristine, submitting, this.state)} >{m('global.techSupportContacts')}</FooterText>
              <ButtonWrapper disabled={submitDisabled(pristine, submitting, this.state)}>
                <Circle disabled={submitDisabled(pristine, submitting, this.state)} />
                <StyledButton
                  type="submit"
                  disabled={submitDisabled(pristine, submitting, this.state)}
                />
                <SvgIcon icon="send" />
              </ButtonWrapper>
            </FormFooter>
          </FeedbackForm>
        </FeedbackWrapper>
        {/* Emulate textarea content text height */}
        <span
          style={{ visibility: 'hidden', pointerEvents: 'none', fontSize: '14px', lineHeight: '24px', whiteSpace: 'pre-wrap' }}
          ref={(ref) => { this.heightDetector = ref; }}
        >
          {/* Replace "\n from text area to html brs for emulator" */}
          {this.state.value.split('\n').map((item, i) => (
            <span key={i}>
              {item}
              <br />
            </span>
          ))}
        </span>
      </div>
    );
  }
}

Feedback.propTypes = {
  route: string,
  handleSubmit: func,
  pristine: bool,
  submitting: bool,
  dispatch: func,
  sendFeedback: func,
  user: object,
  formErrors: any,
};

export default reduxForm({
  form: 'feedback',
})(Feedback);
