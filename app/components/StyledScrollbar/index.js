import React from 'react';
import { node, bool, object } from 'prop-types';

import ScrollArea from 'react-scrollbar';

class Content extends React.PureComponent {

  componentDidMount() {
    const { scrollBottom } = this.props;
    if (scrollBottom) setTimeout(() => { this.scrollBottom(); }, 0); // doesn't work without empty timeout
  }

  componentDidUpdate() {
    const { updateScroll, scrollBottom } = this.props;
    if (updateScroll && scrollBottom) setTimeout(() => { this.scrollBottom(); }, 0); // doesn't work without empty timeout
  }

  scrollBottom() {
    this.context.scrollArea.scrollBottom();
  }

  render() {
    return (<div>{React.Children.toArray(this.props.children)}</div>);
  }
}

Content.propTypes = {
  children: node,
  updateScroll: bool,
  scrollBottom: bool,
};

Content.contextTypes = {
  scrollArea: object,
};

/**
 * Styles are in global styles js
 */

export default class StyledScrollbar extends React.PureComponent { // eslint-disable-line

  render() {
    const { horizontal, vertical, scrollTrackLine, returnChildren, children } = this.props;
    return (
      <ScrollArea
        ref={(scroll) => { this.scroll = scroll; }}
        className={`tr-scrollbar${scrollTrackLine ? ' scroll-trackline' : ''}`}
        vertical={!horizontal}
        horizontal={!vertical}
        stopScrollPropagation
      >
        {returnChildren ? React.Children.toArray(children) : <Content {...this.props} /> }
      </ScrollArea>
    );
  }
}

StyledScrollbar.propTypes = {
  horizontal: bool,
  vertical: bool,
  scrollTrackLine: bool,
  children: node,
  returnChildren: bool,
};
