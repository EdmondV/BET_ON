import ReactDOM from 'react-dom';

export const isClickedOutside = (target, element) => {
  const domNode = ReactDOM.findDOMNode(element); // eslint-disable-line
  return !(!domNode || !domNode.contains(target));
};


export const removeAppPreloader = () => {
  const preloader = document.getElementById('preloader');

  if (preloader) {
    preloader.remove();
  }
};
