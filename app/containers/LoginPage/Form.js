import styled from 'styled-components';

import { fadeIn } from 'animation-constants';

const LoginPageForm = styled.form`
  display: block;
  text-align: center;
  margin: 0;
  width: 100%;
  animation: ${fadeIn} 0.5s linear;
`;

export default LoginPageForm;
