import React from 'react';
import styled from 'styled-components';
import { func, any } from 'prop-types';
import { FormattedMessage } from 'utils/intl';

import FileItem from './AttachedFileItem';

const AttachedFilesWrapper = styled.div``;
const ListWrapper = styled.div``;
const ListHeader = styled.div`
  font-weight: 300;
  font-size: 12px;
  border-bottom: 2px solid #122243;
  padding: 10px 0;
`;

export default class AttachedFilesList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { attachments, clearAttachment, messages } = this.props;
    return (
      <AttachedFilesWrapper>
        <ListHeader><FormattedMessage {...messages.verifyAttachedFilesHeader} />:</ListHeader>
        <ListWrapper>
          {attachments.map(
            (file) => (
              <FileItem
                fileName={file.fileName}
                status={file.status}
                key={file.index}
                index={file.index}
                clearAttachment={clearAttachment}
              />
            )
          )}
        </ListWrapper>
      </AttachedFilesWrapper>
    );
  }
}

AttachedFilesList.propTypes = {
  attachments: any,
  clearAttachment: func,
  messages: any,
};
