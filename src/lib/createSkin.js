import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

/**
 * Creates a Component class that injects skin components via React context.
 * @param{string} displayName the display name for the Component class.
 * @param{Object} skinComponents the skin implementations.
 * For example, {Button: (props) => (<button {...props}>{props.children}</button>)} will provide a skin
 * for instances of createSkinnableComponent('Button').
 * @param props additional props for the element returned by the render method.  If a `component` prop
 * is given, the render method will return an element of that type.
 * @returns {Skin} a Component class that injects skin components via React context.
 */
export default function createSkin(displayName, skinComponents, props = {}) {
  let childContextTypes = {};
  let childContext = {};
  for (let componentName in skinComponents) {
    childContextTypes[componentName + 'Skin'] = () => PropTypes.any.isRequired;
    childContext[componentName + 'Skin'] = skinComponents[componentName];
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
