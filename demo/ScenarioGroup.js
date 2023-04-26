import { node } from 'prop-types';

const ScenarioGroup = ({ children }) => (children);
ScenarioGroup.propTypes = {
  children: node.isRequired,
};

export default ScenarioGroup;
