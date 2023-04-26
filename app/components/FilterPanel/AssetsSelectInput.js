import React from 'react';
import { bool } from 'prop-types';
import Input from 'components/Input';

export default class AssetsSelectInput extends React.PureComponent { // eslint-disable-line
  render() {
    const { active } = this.props;
    return (
      <Input
        name="asset"
        label="Currency pair"
        customActive={active}
      />
    );
  }
}

AssetsSelectInput.propTypes = {
  active: bool,
};
