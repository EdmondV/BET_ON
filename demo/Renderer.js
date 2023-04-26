import React from 'react';
import styled from 'styled-components';
import { node, number, bool, array, any } from 'prop-types';
import { fromJS } from 'immutable';

import StyledButton from '../app/components/Button/StyledButton';

const width = 200;

const ScenarioContainer = styled.div`
  margin-left: ${width}px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const ControlsContainer = styled.div`
  padding: 10px;
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  width: ${width}px;
  background: #232c52;
`;

const RendererWrapper = styled.div`
  min-height: 100vh;
  position: relative;
  box-shadow: inset 0 0 20px rgba(0,0,0,.4);
  overflow: hidden;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODA4M0NDN0ZBRjgwNzUwQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0RTlGOTlDRDVCNTIxMUU3OTA2RUU0OTMzNjQwMzQ3NSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0RTlGOTlDQzVCNTIxMUU3OTA2RUU0OTMzNjQwMzQ3NSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjA0QzhGNkQxNjIwNjgxMTgwODNDQzdGQUY4MDc1MEMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgwODNDQzdGQUY4MDc1MEMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4h6XI6AAAALUlEQVR42mL8//8/AzZw9uxZrOJMDCSCUQ3EAMYzZ85glTA2Nh4NJfppAAgwAPCaCIAIZfq8AAAAAElFTkSuQmCC')
`;

const state = fromJS({
  assets: {

  },
  user: {},
  timer: {},
});


export default class Renderer extends React.Component {
  static propTypes = {
    children: node.isRequired,
    scenario: array.isRequired,
    controls: node,
    delay: number,
    animate: bool,
    loop: bool,
    wrapper: any,
  }

  static defaultProps = {
    animate: true,
    loop: true,
    delay: 1000,
  }

  static childContextTypes = {
    store: any,
  }

  constructor(props) {
    super(props);

    this.timeout = null;
    this.state = {
      frame: 0,
    };
  }

  getChildContext() {
    return {
      store: {
        subscribe: () => {},
        dispatch: () => {},
        getState: () => state,
      },
    };
  }

  componentDidMount() {
    if (this.props.animate) {
      this.next();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.animate) {
      this.next();
    }
  }

  start = () => {
    clearTimeout(this.timeout);
    this.setState({
      frame: 0,
    }, this.next);
  }

  next() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (this.state.frame === this.props.scenario.frames.length - 1) {
        if (this.props.loop && this.props.scenario.frames.length > 1) {
          this.setState({
            frame: 0,
          }, this.next);
        }
        return;
      }

      this.setState({
        frame: this.state.frame + 1,
      }, this.next);
    }, this.props.delay);
  }

  render() {
    console.log('  ---- [x] RENDERER FRAME [x] ---- ', this.state.frame, this.props.scenario.frames[this.state.frame]); // eslint-disable-line
    let content = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, { ...child.props, ...this.props.scenario.frames[this.state.frame] })
    );

    if (this.props.wrapper) {
      content = (<div
        style={this.props.wrapper}
      >
        {content}
      </div>);
    }

    return (
      <RendererWrapper>
        <ControlsContainer>
          <StyledButton disabled={this.state.frame === 0} onClick={this.start} >Play from start</StyledButton>
          {this.props.controls}
        </ControlsContainer>
        <ScenarioContainer>
          {content}
        </ScenarioContainer>
      </RendererWrapper>
    );
  }
}
