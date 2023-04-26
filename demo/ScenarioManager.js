import React from 'react';
import styled from 'styled-components';
import { node, number, string, bool, func, object } from 'prop-types';

const menuWidth = 150;

const MenuWrapper = styled.div`
  width: ${menuWidth}px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 10px 0;
`;

const MenuItemWrapper = styled.div`
  display: block;
  width: 100%;
`;

const Link = styled.a`
  cursor: ${({ active }) => (active ? 'pointer' : 'default')};;
  padding: 5px 5px 5px ${({ offset }) => `${offset * 15}`}px;
  display: block;
  font-size: 13px;
  width: 100%;
  transition: all 300ms;
  background: ${({ active }) => (active ? '#232c52' : 'none')};
  &:hover {
     background: #232c52
  }
`;

const Menu = ({ offset = 1, children, root = false, group, onClick, active }) => {
  const items = React.Children.map(children, (item) => <MenuItem
    group={root ? 'root' : group}
    name={item.props.name}
    offset={offset}
    onClick={onClick}
    active={active}
  >{item.props.children}</MenuItem>);

  if (root) return <MenuWrapper>{items}</MenuWrapper>;

  return <div>{items}</div>;
};
Menu.propTypes = {
  offset: number,
  children: node,
  root: bool,
  group: string,
  onClick: func,
  active: object,
};


const MenuItem = ({ offset, children, name, onClick, group, active }) => {
  if (!name) return null;

  const childGroup = group !== 'root' ? group : name;

  return (<MenuItemWrapper offset={offset}>
    <Link
      offset={offset}
      onClick={() => {
        onClick(group, name);
      }}
      active={active.groupName === group && active.scenarioName === name}
    >{name}</Link>
    <Menu
      group={childGroup}
      offset={offset + 1}
      onClick={onClick}
      active={active}
    >{children}</Menu>
  </MenuItemWrapper>);
};

MenuItem.propTypes = {
  offset: number,
  children: node,
  name: string,
  group: string,
  onClick: func,
  active: object,
};


const ScenarioGroupContainer = styled.div`
  margin-left: ${menuWidth}px;
  min-height: 100vh;
`;


const firstChild = (children) => {
  if (React.Children.count(children) === 1) {
    return children;
  }

  return children[0];
};

const findChild = (children, name) => {
  if (React.Children.count(children) === 1) {
    return children.props.name === name ? children : null;
  }

  for (let i = 0, l = children.length; i < l; i += 1) {
    if (children[i].props.name === name) return children[i];
  }
  return null;
};

const encodeUrl = (p) => p.replace(/\s/, '-');
const decodeUrl = (p) => p.replace(/-/, ' ');


export default class ScenarioManager extends React.Component {
  static propTypes = {
    children: node.isRequired,
  }

  constructor(props) {
    super(props);

    const [group, scenario] = window.location.hash.substr(1).split('/').map((url) => decodeUrl(url));


    const activeGroup = group ? findChild(this.props.children, group) : firstChild(this.props.children);
    if (!activeGroup) throw new Error('Add at least one group!');
    const activeScenario = scenario ? findChild(activeGroup.props.children, scenario) : firstChild(activeGroup.props.children);
    if (!activeScenario) throw new Error('Add at least one scenario!');

    this.state = {
      menu: {
        groupName: activeGroup.props.name,
        scenarioName: activeScenario.props.name,
      },
      scenario: activeScenario,
    };
  }

  onClick = (group, scenario) => {
    if (group === 'root') return;

    const activeGroup = findChild(this.props.children, group);
    if (!activeGroup) return;

    const activeScenario = firstChild(activeGroup.props.children, scenario);
    if (!activeScenario) return;

    window.location.hash = `#${encodeUrl(activeGroup.props.name)}/${encodeUrl(activeScenario.props.name)}`;

    this.setState({
      menu: {
        groupName: group,
        scenarioName: scenario,
      },
      scenario: activeScenario,
    });
  }

  render() {
    return (
      <div>
        <Menu active={this.state.menu} onClick={this.onClick} root>{this.props.children}</Menu>
        <ScenarioGroupContainer>{this.state.scenario}</ScenarioGroupContainer>
      </div>
    );
  }
}
