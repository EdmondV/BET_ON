import React from 'react';
import FilterForm from './FilterForm';

export default class FilterPanel extends React.PureComponent { // eslint-disable-line
  render() {
    return (
      <FilterForm {...this.props} />
    );
  }
}
