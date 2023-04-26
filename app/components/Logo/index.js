import React from 'react';
import styled from 'styled-components';

import NormalImg from 'components/Img';
import logo from './logo.svg';

const LogoImg = styled(NormalImg)`
  width: 301px;
  margin: 0 auto;
  vertical-align: middle;
`;

const Logo = () => <LogoImg src={logo} alt="Betochart logo" />;

export default Logo;

export const LogoSmall = styled.div`
  display: block;
  background: url(${logo}) no-repeat;
  background-size: 100% auto;
  height: 70px;
  width: 80px;
  background-origin: content-box;
  padding: 12px;
`;
