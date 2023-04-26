/**
 *
 * Img.react.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */

import React from 'react';
import { string, any } from 'prop-types';

function Img(props) {
  return (
    <img className={props.className} src={props.src} alt={props.alt} />
  );
}

// We require the use of src and alt, only enforced by react in dev mode
Img.propTypes = {
  src: any.isRequired,
  alt: string.isRequired,
  className: string,
};

export default Img;
