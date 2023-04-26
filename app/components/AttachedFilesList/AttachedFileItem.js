import React from 'react';
import styled from 'styled-components';
import { string, number, func } from 'prop-types';

import CrossIcon from 'components/Icon/Cross.svg';

import LoadingIcon from './Loading.svg';
import LoadedIcon from './Loaded.svg';
import FailedIcon from './Failed.svg';

const FileItemWrapper = styled.div`
  border-bottom: 2px solid #122243;
  padding: 8px 40px 10px;
  position: relative;
  display: flex;
`;

const FileName = styled.div``;

// possible values loading, loaded, failed
const LoadingStatus = {
  0: LoadingIcon,
  1: LoadedIcon,
  2: FailedIcon,
};

const StyledLoadingStatus = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  flex: 0 0 40px;
  position: absolute;
  top: 0;
  left: 0;
  background: ${(props) => `url(${LoadingStatus[props.status]}) center center/16px auto no-repeat`};
`;

// remove from list on click
const RemoveItem = styled.div`
  width: 12px;
  height: 12px;
  display: flex;
  flex: 0 0 40px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 14px;
  background: url(${CrossIcon}) center center/12px auto no-repeat;
  cursor: pointer;
`;

export default class AttachedFileItem extends React.PureComponent { // eslint-disable-line
  render() {
    const { status, fileName, clearAttachment, index } = this.props;
    return (
      <FileItemWrapper>
        <StyledLoadingStatus status={status} />
        <FileName>{fileName}</FileName>
        <RemoveItem onClick={() => clearAttachment(index)} />
      </FileItemWrapper>
    );
  }
}

AttachedFileItem.propTypes = {
  status: number,
  index: number,
  fileName: string,
  clearAttachment: func,
};
