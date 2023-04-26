import { Link } from 'react-router';
import styled from 'styled-components';

const A = styled(Link)`
  color: #0099d9;
  text-decoration: none;
  cursor: pointer;
  transition: color 200ms ease-out;
  &:hover {
    text-decoration: underline;
    color: #5bc0de;
  }
`;

export default A;
