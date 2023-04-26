import { injectGlobal } from 'styled-components';
import { color } from 'styles-constants';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    user-select: none;
    -ms-overflow-style: none;
  }

  body {
    background-color: #000c2a;
    color: #fff;
    font-size: 14px;
    font-weight: 300;
    font-family: 'Uni Sans';
    src: url(./fonts/uni_sans_thin);
  }

  body.fontLoaded {
    font-family: Uni Sans, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
  }

  input, textarea, button:active, button {
    outline: 0;
    border: 0;
  }

  /* Scale canvas with resize attribute to full size */
  canvas[resize] {
    width: 100%;
    height: 100%;
  }

  p,
  label {
    font-family: Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 21px;
  }

  button {
    font-family: Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  a {
    text-decoration: none;
  }

  textarea {
    resize: none;
    &:focus {
      padding-bottom: 0;
    }
    &::-webkit-scrollbar-track {
      border-radius: 4px;
    }
    &::-webkit-scrollbar {
      width: 5px;
      background: rgba(256,256,256,0.5);
      border: 2px solid #031432;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background: ${color.success};
    }
    &:hover::-webkit-scrollbar-thumb {
      background: ${color.success};
    }
  }

  .scroll-trackline {
    .scrollbar-container {
      &:before {
        content: '';
        z-index: -1;
        position: absolute;
        height: 100%;
        width: 1px;
        background: rgba(255, 255, 255, 0.4);
        left: 0;
        right: 0;
        margin: 0 auto;
        top: 0;
      }
    }
  }

  body {
    .modal-foot {
      padding: 0;
      width: 450px;
      height: 300px;
      color: black;
      border-radius: 5px;
    }
    .modal-expl {
      padding: 0;
      width: 750px;
      height: 500px;
      color: black;
      border-radius: 6px;
      display: flex;
      justify-content: center;
    }
    .modal-close-button {
      color: ${color.grayFontColor};
      z-index: 3;
      position: absolute;
      top: 0;
      right: 3px;
      width: 20px;
      cursor: pointer;
    }
    .tr-scrollbar {
      .scrollarea-content {
        padding-right: 10px;
      }
      .scrollbar-container.vertical {
        opacity: 0.6;
        width: 5px;
        background: none;
        &:hover, &.active {
          background: none;
          opacity: 1!important;
          .scrollbar {
            opacity: 1;
          }
        }
        .scrollbar {
          width: 100%;
          border-radius: 0.5em;
          margin-left: 0;
          background: ${color.newSuccess};
        }
      }

      &.scroll-trackline {
        .scrollbar-container.vertical {
          opacity: 1;
        }
      }

      .scrollbar-container.horizontal {
        opacity: 0.6;
        height: 12px;
        bottom: 0;
        background: none;
        &:hover, &.active {
          background: none;
          opacity: 1!important;
          .scrollbar {
            opacity: 1;
          }
        }
        .scrollbar {
          height: 4px;
          border-radius: 0.5em;
          margin-top: 4px;
          background: ${color.newSuccess};
        }
      }
    }
  }
`;
