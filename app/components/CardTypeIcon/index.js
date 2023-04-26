import React from 'react';
import { string, bool } from 'prop-types';
import styled from 'styled-components';
import visa from './Visa.svg';
import mastercard from './MasterCard.svg';

const Icons = {
  visa,
  mastercard,
};

const Icon = styled.img`
  width: ${(props) => props.width || '50px'};
  height: ${(props) => props.height || '40px'};
  max-width: 100%;
  opacity: ${(props) => (props.type === props.image) || props.alwaysActive ? '1' : '0.6'};
  padding: ${(props) => props.padding || '0'};
`;

export const CardTypeIcon = (props) => (
  <Icon src={Icons[props.image]} type={props.type} width={props.width} height={props.height} image={props.image} alwaysActive={props.alwaysActive} />
);

CardTypeIcon.propTypes = {
  type: string,
  width: string,
  height: string,
  image: string,
  alwaysActive: bool,
};
