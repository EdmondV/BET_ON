import React from 'react';
import { color, hexToRgb, fontWeight, fontSize, flex, space } from 'styles-constants';
import { func, string, bool } from 'prop-types';
import { transition } from 'animation-constants';
import StyledScrollbar from 'components/StyledScrollbar';
import styled from 'styled-components';
import SvgIcon from 'components/SvgIcon';

import { appLocales } from '../../../i18n';

import { LOCALES } from '../constants';

const flagsCodes = () => Object.keys(LOCALES);

const LocaleOption = styled.a`
  margin-top: 20px;
  cursor: ${({ available, active }) => available && !active ? 'pointer' : 'default'};  
  flex: 0 0 50%;
  transition: ${transition('defaultEmptyEffect')};
  &:hover {
    color: ${({ available, active }) => available && !active ? '#fff' : 'inherit'}; 
  }
`;


const CountryWrapper = styled.div`
  ${flex('center', 'center', 'column')};
  position: relative;
  opacity: ${({ available }) => available ? '1' : '0.5'};
  .name {
    margin-top: 2px;
  }
  .flag {
    display: block;
    width: 24px;
    height: 24px;
    background-size: 100% auto;
  }
  
  ${({ inPanel, available, active }) => inPanel && `
    ${flex('flex-start', 'center', 'row')};
    padding-left: 25%;
    .flag {
      width: 33px;
      height: 26px;
      background-position: center center;
    }
    .name {
      padding-left: ${space(1.5)};
    }
    &:before {
      content: '';
      display: ${active ? 'block' : 'none'};
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: ${available ? color.newSuccess : color.danger};
      position: absolute;
      left: 21px;
      top: 46%;
      transform: translateY(-50%);
    }
    &:hover {
      &:before {
        display: block;
      }
    }
  `};
`;

const LangSelect = styled.div`
  ${flex('center', 'center', 'column')};
  position: relative;
  font-size: ${fontSize.body};
  font-weight: ${fontWeight.normal};
  vertical-align: middle;
  color: rgba(${hexToRgb(color.mainFontColor)}, 0.6);
  background: ${({ open, hovered }) => open || hovered ? color.primaryLighted : 'transparent'};
  padding: 10px 0;
  line-height: inherit;
  .value {
    ${flex('center', 'center', 'column')};
    cursor: pointer;
  }
  .value-text {
    padding-right: 0;
    font-size: ${fontSize.extraSmall};
    font-weight: ${fontWeight.light};
  }
  .languages {
    position: absolute;
    font-size: 12px;
    line-height: 1;
    overflow: hidden;
    height: 330px;
    width: 330px;
    background: ${color.primaryLighted};
    transition: transform 0.3s ease-out;
    transform: translateX(${({ open }) => open ? '100%' : '-8px'});
    padding: 0;
    left: auto;
    right: 0;
    bottom: 0;
    box-shadow: 0 0 8px 2px rgba(10, 22, 54, 0.3);
    z-index: -1; /* hide under Helper in left panel but is still clickable cos parent has zindex */
  }
  .wrapper {
    height: 75%;
    margin-top: 15%;
    margin-right: ${space(2)};
    position: relative;
    .tr-scrollbar {
      position: absolute;
      max-height: 100%;
      .scrollarea-content {
        display: flex;
        flex-wrap: wrap;
      }
    }
    > div > div > a {
      &:first-child, &:nth-child(2) {
        margin-top: 2px;
      }
    }
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  cursor: pointer;
  top: 14px;
  right: 12px;
  opacity: 0.6;
  svg {
    width: 16px;
    height: 16px;
    stroke: #ffffff;
  }
`;

// check for app locales and make active/inactive flags

const Lang = ({ name, code, inPanel, available, active }) => (
  <CountryWrapper
    inPanel={inPanel}
    available={available}
    active={active}
  >
    <span
      className="flag"
      style={{
        backgroundImage: `url(/img/flags/${code}.png)`,
      }}
    />
    <span className="name">{name}</span>
  </CountryWrapper>
);

Lang.propTypes = {
  name: string,
  code: string,
  inPanel: bool,
  available: bool,
  active: bool,
};

const clickSound = (dispatch) => dispatch({ type: 'PLAIN_SOUND', meta: { sound: 'click' } });

// check if we have this lang in the app
const langIsAvailable = (lang) => !!(appLocales.filter((v) => v === lang).length);

// check if current lang has been already selected
const langIsActive = (locale, lang) => locale === lang;

/* eslint-disable jsx-a11y/no-static-element-interactions */
export default class LeftPanelLangList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      hovered: false,
    };
  }

  onSelect = (locale) => {
    this.setState({
      isOpen: false,
    });
    this.props.onLocaleToggle(locale);
    clickSound(this.props.dispatch);
  }

  onToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
    clickSound(this.props.dispatch);
  }

  onHover = (hovered) => {
    this.setState({
      hovered,
    });
  }

  render() {
    const { locale } = this.props;
    let content = null;
    const allFlags = flagsCodes();

    if (this.state.isOpen) { // Do not render if they are invisible
      content = allFlags.map((v) => (
        <LocaleOption
          onClick={() => langIsAvailable(v) && !langIsActive(locale, v) ? this.onSelect(v) : () => {}} // don't change the language if unavailable or current is active
          key={v}
          available={langIsAvailable(v)}
          active={langIsActive(locale, v)}
          title={langIsAvailable(v) ? '' : 'Coming soon'}
        >
          <Lang
            name={LOCALES[v] || v}
            code={v}
            active={langIsActive(locale, v)}
            inPanel
            available={langIsAvailable(v)}
          />
        </LocaleOption>
      ));
    }
    return (
      <LangSelect open={this.state.isOpen} hovered={this.state.hovered}>
        <div className="languages">
          <CloseIcon onClick={this.onToggle}>
            <SvgIcon icon="cross" />
          </CloseIcon>
          <div className="wrapper">
            <StyledScrollbar scrollTrackLine returnChildren>
              {content}
            </StyledScrollbar>
          </div>
        </div>
        <a
          onClick={this.onToggle}
          className="value"
          onMouseEnter={() => this.onHover(true)}
          onMouseLeave={() => this.onHover(false)}
        >
          <span className="value-text">
            <Lang
              name={LOCALES[locale] || locale}
              code={locale}
              available
            />
          </span>
        </a>
      </LangSelect>
    );
  }
}

LeftPanelLangList.propTypes = {
  locale: string,
  dispatch: func,
  onLocaleToggle: func,
};
