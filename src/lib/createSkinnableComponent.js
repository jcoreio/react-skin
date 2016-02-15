import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

/**
 * Creates a Component that renders a skin component injected from React context.
 * @param{string} componentName the componentName for the created Component class.  If componentName is 'Button',
 * then the 'ButtonSkin' component from context will be used to render the Component.
 * @param{Component} options.defaultComponent the default component to render if no skin component is provided
 * @returns {SkinnableComponent} a Component that renders the skin component `componentName + 'Skin'` from React context.
 */
export default function createSkinnableComponent(componentName, options = {}) {
  const skinName = componentName + 'Skin';
  const {defaultComponent} = options;
  return class SkinnableComponent extends Component {
    static contextTypes = {
      [skinName]: defaultComponent ? PropTypes.any : PropTypes.any.isRequired,
    };
    static displayName = componentName;
    render() {
      let Component = this.context[skinName] || defaultComponent;
      return <Component {...this.props}>{this.props.children}</Component>;
    }
  };
}
