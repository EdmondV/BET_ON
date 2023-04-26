import React from 'react';
import { func, string, bool } from 'prop-types';
import styled from 'styled-components';
import { bgColor, color, hexToRgb, fontWeight, fontSize } from 'styles-constants';
import { transition } from 'animation-constants';

import LeftPanelLangList from './LeftPanelLangList';

import { LOCALES } from './constants';
import { appLocales } from '../../i18n';

// TODO: close local toggle on click outside (example is in New Room Form)
// FIXME: Merge toggle components and separate only language panels
const LangSelect = styled.div`
  position: relative;
  padding: 2px;
  display: flex;
  line-height: 64px;
  font-size: ${fontSize.body};
  font-weight: ${fontWeight.normal};
  vertical-align: middle;
  color: rgba(${hexToRgb(color.mainFontColor)}, 0.6);
  
  .languages {
    position: absolute;
    bottom: 100%;
    left: -25px;
    display: ${(p) => p.open ? 'block' : 'none'};
    padding: 10px 20px;
    font-size: 12px;
    line-height: 1;
    margin-bottom: -15px;
    background: ${bgColor};
  }
  
  .value {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .value-text {
    padding-right: 15px;
  }
`;

const Triangle = styled.div`
  display: block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 4px 4px 0;
  border-color: #fff transparent transparent;
  opacity: 0.4;
`;

const LocaleOption = styled.a`
  margin: 10px 0;
  cursor: pointer;  
  display: block;
  transition: ${transition('defaultEmptyEffect')};
  &:hover {
    color: #fff;
  }
`;

const CountryWrapper = styled.div`
  display: flex;
  align-items: center;
  
  .name {
    margin-left: 10px;
  }
  
  .flag {
    width: 24px;
    height: 16px;
    display: block;
    background-size: 100% auto;
    background-position: center center;
  }
`;

const Lang = ({ name, code, leftPanelToggler }) => (
  <CountryWrapper leftPanelToggler={leftPanelToggler}>
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
  leftPanelToggler: bool,
};

const clickSound = (dispatch) => dispatch({ type: 'PLAIN_SOUND', meta: { sound: 'click' } });

/* eslint-disable jsx-a11y/no-static-element-interactions */
export class LocaleToggle extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
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

  render() {
    const { locale, leftPanelToggler } = this.props;

    let content = null;

    // If we have items, render them
    if (appLocales) {
      content = appLocales.map((v) => (
        <LocaleOption onClick={() => this.onSelect(v)} key={v}><Lang name={LOCALES[v] || v} code={v} /></LocaleOption>
      ));
    }

    return (
      <div>
        {!leftPanelToggler && <LangSelect leftPanelToggler={leftPanelToggler} open={this.state.isOpen} langNumber={appLocales && appLocales.length}>
          <div className="languages">
            <div className="wrapper">
              {content}
            </div>
          </div>
          <a onClick={this.onToggle} className="value">
            <span className="value-text">
              <Lang leftPanelToggler={leftPanelToggler} name={LOCALES[locale] || locale} code={locale} />
            </span>
            <Triangle leftPanelToggler={leftPanelToggler} />
          </a>
        </LangSelect>}
        {leftPanelToggler && <LeftPanelLangList {...this.props} />}
      </div>
    );
  }
}

LocaleToggle.propTypes = {
  onLocaleToggle: func,
  locale: string,
  leftPanelToggler: bool,
  dispatch: func,
};

export default LocaleToggle;
