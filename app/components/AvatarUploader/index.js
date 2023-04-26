import React from 'react';
import styled from 'styled-components';
import { func, bool, string } from 'prop-types';
import ReactCrop from 'react-image-crop';
import { connect } from 'react-redux';
import { FormattedMessage } from 'utils/intl';
import { API_URL } from 'utils/request';

import 'react-image-crop/dist/ReactCrop.css';

import Button from 'components/Button';
import Loader from 'components/Loader';

import messages from './messages';
import ArrowIcon from './arrow-white.svg';

import { avatarUploadRequest, showAvatarUploader } from '../../containers/MainPage/actions';

const AvatarUploaderWrp = styled.div`
  display: ${(p) => p.show ? 'flex' : 'none'}!important;
  flex: 1;
  flex-direction: column;
`;


const AvatarUploaderHeader = styled.div``;

const AvatarUploaderBody = styled.div``;

const AvatarUploaderCropper = styled.div`
  position: relative;
  .ReactCrop__crop-selection {
    border-radius: 50%;
    border: 2px solid;
    border-image: none;
    display: ${(p) => p.hide ? 'none' : 'block'};
  }
  .ReactCrop {
    .ReactCrop__drag-handle {
      width: 12px;
      height: 12px;
      background-color: rgba(255, 255, 255, 0.8);
    }
    .ReactCrop__crop-wrapper {
      background-color: rgba(0, 0, 0, 0.65);
    }
    .ReactCrop__crop-selection {
      box-shadow: 0 0 0 9999em rgba(0, 0, 0, 0.65);
      &:before {
        content: '';
        width: 20%;
        height: 20%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        right: 0;
        margin: 0 auto;
        background: url(${ArrowIcon}) center center/100% no-repeat;
        transition: transform 0.3s ease-out;
      }
      &:hover {
        &:before {
          transform: translateY(-50%) scale(1.2);
        }
      }
    }
    .ord-ne {
      margin-top: -8px;
      margin-right: -8px;
      top: 15%;
      right: 15%;
    }
    .ord-nw {
      margin-top: -8px;
      margin-left: -8px;
      top: 15%;
      left: 15%;
    }
    .ord-se {
      margin-bottom: -8px;
      margin-right: -8px;
      bottom: 15%;
      right: 15%;
    }
    .ord-sw {
      margin-bottom: -8px;
      margin-left: -8px;
      bottom: 15%;
      left: 15%;
    }
  }
`;

const CropperPreloader = styled.div`
  opacity: ${(p) => p.show ? '1' : '0'};
  z-index: ${(p) => p.show ? '1' : '-1'};
  transition: opacity 0.15s ease-out;
  > div > div {
    &:nth-child(2) {
      transform: translateY(-50%) scale(0.9)!important;
    }
  }
`;

const AvatarUploadFooter = styled.div`
  padding-bottom: 20px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const StyledFileInput = styled.input`
  margin-top: 14px;
  margin-bottom: 21px;
  display: none;
`;

const StyledLabel = styled.label`
  display: block;
  margin-top: 14px;
  cursor: pointer;
  background-image: none;
  background-color: transparent;
  border: 1px solid rgb(226, 234, 228);
  opacity: 0.6;
  border-radius: 24px;
  height: 43px;
  line-height: 30px;
  padding: 7px 14px;
  text-transform: uppercase;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  user-select: none;
  width: 100%;
  transition: all 300ms;
  &:disabled {
    cursor: default;
    opacity: 0.6;
    pointer-events: none;
  }
`;

const StyledLabelWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const BtnWrp = styled.div`
  margin-top: 20px;
`;

const loaderCss = {
  margin: '0 auto',
  left: 0,
  right: 0,
};

class AvatarUploader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: func,
    show: bool,
    avatar: string,
    avatarUploading: bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      file: null,
      fileName: null,
    };
    this.preview = null;
  }

  componentWillUpdate(nextProps) {
    const el = document.getElementById('avatar_uploader');
    if (!nextProps.show) el.value = null;
  }

  uploadFile = (e) => { // eslint-disable-line
    this.props.dispatch(showAvatarUploader());
    const file = e.target.files[0];
    if (!file) return '';
    const { name } = file;
    const fr = new FileReader();

    fr.onloadend = (event) => {
      this.setState({
        file: event.target.result,
        fileName: name,
      });
    };
    fr.readAsDataURL(file);
  };

  cropFile = (crop) => {
    const image = new Image();
    image.src = this.state.file;
    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;
    const cropX = (crop.x / 100) * imageWidth;
    const cropY = (crop.y / 100) * imageHeight;

    const cropWidth = (crop.width / 100) * imageWidth;
    const cropHeight = (crop.height / 100) * imageHeight;

    const canvas = document.createElement('canvas');
    canvas.width = cropWidth;
    canvas.height = cropHeight;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

    this.preview = canvas.toDataURL('image/jpeg');
    if (this.preview === 'data:,') this.preview = `${API_URL}/profile/avatar/${this.props.avatar}`;
    const wrp = document.getElementById('preview_wrp');
    const el = document.getElementById('preview');
    const myEl = document.createElement('img');
    myEl.setAttribute('id', 'preview');
    myEl.className = 'overlay';
    if (!el) wrp.appendChild(myEl);
    document.getElementById('preview').src = this.preview;
  }

  render() {
    return (
      <AvatarUploaderWrp show={this.props.show}>
        <AvatarUploaderHeader />
        <AvatarUploaderBody>
          <StyledLabelWrapper>
          </StyledLabelWrapper>
          <StyledFileInput type="file" accept="image/jpeg,image/png,image/gif" id="avatar_uploader" onChange={this.uploadFile} />
          {this.state.file && <div>
            <AvatarUploaderCropper hide={this.props.avatarUploading}>
              <CropperPreloader show={this.props.avatarUploading}>
                <Loader
                  bgColor="rgba(0, 0, 0, 0.65)"
                  height="40px"
                  width="40px"
                  scale={0.7}
                  loaderCss={loaderCss}
                />
              </CropperPreloader>
              <ReactCrop
                src={this.state.file}
                crop={{
                  width: 80,
                  aspect: 1 / 1,
                }}
                onComplete={this.cropFile}
                onImageLoaded={(c, i, p) => this.cropFile(c, p)}
              />
            </AvatarUploaderCropper>
          </div>}
        </AvatarUploaderBody>
        {this.state.file && <AvatarUploadFooter>
          <BtnWrp>
            <Button
              theme="avatarUpload"
              onClick={() => this.props.dispatch(avatarUploadRequest({ upload: this.preview }))}
              disabled={this.props.avatarUploading}
            >
              <FormattedMessage {...messages.avatar_uploader_upload} />
            </Button>
          </BtnWrp>
          <StyledLabel htmlFor="avatar_uploader">
            <FormattedMessage {...messages.avatar_uploader_browse} />
          </StyledLabel>
        </AvatarUploadFooter>}
      </AvatarUploaderWrp>
    );
  }
}

const mapStateToProps = (state) => ({
  avatarUploading: state.getIn(['preloader', 'avatarUploading']),
});

export default connect(mapStateToProps)(AvatarUploader);
