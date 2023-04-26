import React from 'react';
import { string, object, bool, any } from 'prop-types';
import styled from 'styled-components';

import AvatarImg from '../../containers/MainPage/FootballPage/AvatarImg';

const AvatarLink = styled.div`
  text-decoration: none;
  color: white;
`;

const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  text-align: center;
  width: 44px;
  height: 44px;
  margin: 2px 0 0 4px;
  text-transform: uppercase;
  background-color: #fff;
  font-size: 16px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    &.overlay {
      position: absolute;
      top: 0;
      left: 0; /* invalid position in safari without 0 as a default value */
    }
  }
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

export default class Avatar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const customCss = this.props.customCss || {};
    return (
      <Wrapper style={customCss} id={this.props.asideAvatar ? 'preview_wrp' : 'header_avatar_wrp'}>
        {this.props.avatar ?
          <AvatarImage id={this.props.asideAvatar ? 'preview' : 'header_avatar'} src={AvatarImg(this.props.name)} alt={this.props.initials} />
          :
          <AvatarLink>{this.props.initials}</AvatarLink>
        }
      </Wrapper>
    );
  }
}

Avatar.propTypes = {
  initials: string,
  customCss: object,
  asideAvatar: bool,
  avatar: any,
  name: string,
};
