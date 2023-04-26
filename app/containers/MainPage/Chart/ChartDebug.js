import React from 'react';
import { func } from 'prop-types';

import Flex from '../../../components/Grid/Flex';

const OPTIONS = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];


export default class ChartDebug extends React.PureComponent {
  static propTypes = {
    updateChartOptions: func,
  }

  constructor(props) {
    super(props);
    this.state = {
      smooth: false,
      reduce: 0,
    };
  }

  onSmoothChange= () => {
    const smooth = !this.state.smooth;

    this.setState({ smooth });

    this.props.updateChartOptions({ smooth });
  }

  onReduceChange = (e) => {
    const reduce = { reduce: parseFloat(e.target.value) };
    this.setState(reduce);

    this.props.updateChartOptions(reduce);
  }

  render() {
    return (
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          width: '170px',
          background: 'rgba(255,255,255,.3)',
          color: '#fff',
          padding: '5px',
          fontSize: '10px',
        }}
      >
        <Flex style={{ marginBottom: '10px' }}>
          <div style={{ marginRight: '5px' }}>
            <input type="checkbox" onClick={this.onSmoothChange} checked={this.state.smooth} />
          </div>
          <span>&nbsp;Smooth</span>
        </Flex>
        <Flex>
          <span>Reduce </span>
          <div style={{ textAlign: 'center' }}>
            <select onChange={this.onReduceChange} value={this.state.reduce}>
              {OPTIONS.map((v) => (<option key={v} value={v}>{v * 100}%</option>))}
            </select>
          </div>
          <span> by distance</span>
        </Flex>
      </div>
    );
  }
}
