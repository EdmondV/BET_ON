import React from 'react';
import styled from 'styled-components';
import { string, any, func } from 'prop-types';

import SvgIcon from 'components/SvgIcon';

const StyledListItem = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: 0.7;
  transition: opacity 0.1s ease-out;
  &:hover {
    opacity: 1;
  }
  cursor: ${({ pointer }) => pointer ? 'pointer' : 'default'};
`;
// &:before, &:after {
//   content: '';
//   display: ${({ bordered }) => bordered ? 'block' : 'none'};
//   position: absolute;
//   height: 100%;
//   top: 0;
//   width: 1px;
//   background: #374272;
// }
// &:before {
//   left: -5px;
// }
// &:after {
//   right: -5px;
// }

const StyledLabel = styled.div`
  opacity: 0.6;
  margin-top: 5px;
`;

const StyledSvgIcon = styled.div``;

const StyledValue = styled.div`
  margin-top: 5px;
  font-family: 'Lato', sans-serif;
  letter-spacing: 0.065em;
  font-weight: bold;
`;

function numberWithSpaces(x) {
  const num = /\d+/g;
  const isNegative = x.indexOf('-') > -1;
  if (x) {
    const number = parseFloat(x.match(num).join('.'));
    const parts = number.toString ? number.toString().split('.') : [0];
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return isNegative ? `$ -${parts.join('.')}` : `$ ${parts.join('.')}`;
  }
  return x;
}

const ListItem = (props) => (
  <StyledListItem pointer={props.icon === 'rank' || props.icon === 'wallet'} onClick={() => props.onClickHandler(props.icon, props.value, props.onToggleSidebar)}>
    <StyledSvgIcon><SvgIcon styles={{ width: 22, height: 22, marginTop: '-4px', color: '#fff', opacity: 0.75 }} icon={props.icon} /></StyledSvgIcon>
    <StyledLabel>{ props.title }</StyledLabel>
    <StyledValue>{ props.icon === 'wallet' || props.icon === 'profit' ? numberWithSpaces(props.value) : props.value }</StyledValue>
  </StyledListItem>
);

ListItem.propTypes = {
  icon: string,
  value: any,
  title: string,
  onClickHandler: func,
  onToggleSidebar: func,
};

export default ListItem;
