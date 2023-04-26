import React from 'react';
import { string, func } from 'prop-types';
import styled from 'styled-components';
import { buttonAnimation, fontWeight, fontSize, color } from 'styles-constants';

const themeMapping = {
  transparent: {
    backgroundImage: 'none',
    backgroundColor: 'transparent',
    borderColor: 'white',
    opacity: '0.5',
    border: 'rgb(226, 234, 228) solid 1px',
    fontWeight: fontWeight.light,
  },
  deposit: {
    fontSize: 18,
    marginTop: 35,
    height: 49,
  },
  confirmation: {
    fontSize: 12,
    fontWeight: fontWeight.lightBold,
  },
  avatarUpload: {
    display: 'inline-block',
    width: '100%',
    lineHeight: 0,
    textAlign: 'center',
  },
  withdrawal: {
    fontSize: 14,
    paddingTop: 5,
    textTransform: 'none',
    marginTop: 20,
  },
  noticeButton: {
    height: '34px',
    lineHeight: '24px',
    borderRadius: '6px',
    margin: '10px 0',
  },
  // newLogin: {
  //   background: 'rgb(73, 182, 93)',
  //   height: 43,
  //   lineHeight: 2,
  //   borderRadius: 24,
  // },
};

const StyledButtonInner = styled.button`
  border-radius: 24px;
  display: block;
  height: 43px;
  background: ${color.buttonColor};
  font-weight: ${fontWeight.regular};
  line-height: 30px;
  padding: 7px 14px;
  text-transform: uppercase;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  /* stylelint-disable property-no-vendor-prefix */
  -webkit-appearance: none;
  /* style-lint-enable */
  user-select: none;
  width: 100%;
  letter-spacing: 1px; 
  font-size: ${fontSize.small};
  font-family: Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  ${buttonAnimation}
  &:hover {
    cursor: pointer;
    background: #2bb043;
    opacity: 1 !important;
  }
  &:disabled {
    cursor: default;
    opacity: 0.5;
    pointer-events: none;
  }
`;

function StyledButton({ theme, ...props }) {
  const themeStyles = theme ? themeMapping[theme] : {};
  return (
    <div>
      <StyledButtonInner {...props} style={{ ...themeStyles }} />
    </div>
  );
}

export default StyledButton;

StyledButton.propTypes = {
  theme: string,
  onClick: func,
};
