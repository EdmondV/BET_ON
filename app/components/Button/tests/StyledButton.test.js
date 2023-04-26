import React from 'react';
import { shallow } from 'enzyme';

import StyledButton from '../StyledButton';

describe('<StyledButton />', () => {
  it('should render an <div> tag', () => {
    const renderedComponent = shallow(<StyledButton />);
    expect(renderedComponent.type()).toEqual('div');
  });
});
