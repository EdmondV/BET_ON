import styled from 'styled-components';
import { form } from 'styles-constants';

const Label = styled.div`
  position: absolute;
  font-size: ${(p) => p.active ? `${form.input.focusedLabelHeight}px` : `${form.input.fontSize}px`};
  line-height: ${(p) => p.active ? `${form.input.focusedLabelHeight}px` : `${form.input.lineHeight}px`};
  color: ${form.input.borderInactiveColor};
  transition: all 200ms ease-out;
  top: ${(p) => p.active ? '0px' : `${form.input.lineHeight}px`};
  z-index: 1;
  vertical-align: top;
  margin-top: -${(p) => p.active ? 0 : form.input.lineHeight / 2 + 3}px;
`;

export default Label;
