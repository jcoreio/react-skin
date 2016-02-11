import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

export function createSkin(displayName, elements, props = {}) {
  let childContextTypes = {};
  let childContext = {};
  for (let elemName in elements) {
    childContextTypes[elemName + 'Skin'] = () => PropTypes.any.isRequired;
    childContext[elemName + 'Skin'] = elements[elemName];
  }
  return class Skin extends Component {
    static childContextTypes = childContextTypes;
    static displayName = displayName;
    getChildContext() {
      return childContext;
    }
    render() {
      let {component, children, className} = this.props;
      className = classNames(className, props.className);
      let Comp = props.component || component || 'div';
      return <Comp {...props} {...this.props} className={className}>{children}</Comp>;
    }
  };
}
