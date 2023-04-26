import React from 'react';
import styled from 'styled-components';
import { func, any } from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'utils/intl';

import {
  sendAttachment,
  setAttachment,
  clearAttachments,
} from 'containers/MainPage/actions';

import IconPlus from './IconPlus.svg';

const FileUploadFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 7px;
`;

const FileUploadFieldLabel = styled.label`
  color: #5396DA;
  font-size: 14px;
  padding-left: 28px;
  position: relative;
  cursor: pointer;
`;

const ChooseIcon = styled.div`
  width: 16px;
  height: 16px;
  background: url(${IconPlus}) no-repeat center center;
  position: absolute;
  transform: translateY(-50%);
  top: 52%;
  left: 0;
`;

const UploadField = styled.input`
  display: none;
`;

class FileUploadField extends React.PureComponent {
  componentDidMount() {
    this.props.clearAttachments();
  }
  render() {
    const sendFiles = (e) => {
      const formData = (file) => {
        const data = new FormData();
        data.append('upload', file, file.name);
        return data;
      };
      [...e.target.files].map(
        (file) => { // eslint-disable-line
          let fileData = {
            fileName: file.name,
            id: '',
            status: 0,
          };
          this.props.setAttachment(fileData);
          fileData = { ...fileData, ...{ formData: formData(file) } };
          this.props.sendAttachment(fileData);
        }
      );
    };
    return (
      <FileUploadFieldWrapper>
        <FileUploadFieldLabel htmlFor="file_upload">
          <ChooseIcon />
          <FormattedMessage {...this.props.messages.verifyAttachedChooseFile} />
        </FileUploadFieldLabel>
        <UploadField onChange={sendFiles} id="file_upload" name="files" type="file" multiple="true" accept="image/jpeg,image/png,image/gif" />
      </FileUploadFieldWrapper>
    );
  }
}

FileUploadField.propTypes = {
  sendAttachment: func,
  setAttachment: func,
  clearAttachments: func,
  messages: any,
};

const mapDispatchToProps = (dispatch) => ({
  sendAttachment: (fileData) => dispatch(sendAttachment(fileData)),
  setAttachment: (attachment) => dispatch(setAttachment(attachment)),
  clearAttachments: () => dispatch(clearAttachments),
});

export default connect(() => {}, mapDispatchToProps)(FileUploadField);
