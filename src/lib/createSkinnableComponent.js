import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

/**
 * Creates a Component that renders a skin component injected from React context.
 * @param{string} componentName the componentName for the created Component class.  If componentName is 'Button',
 * then the 'ButtonSkin' component from context will be used to render the Component.
 * @returns {SkinnableComponent} a Component that renders the skin component `componentName + 'Skin'` from React context.
 */
export default function createSkinnableComponent(componentName) {
  const skinName = componentName + 'Skin';
  return class SkinnableComponent extends Component {
    static contextTypes = {
      [skinName]: PropTypes.any.isRequired,
    };
    static displayName = componentName;
    render() {
      let Element = this.context[skinName];
      return <Element skinName={skinName} {...this.props}>{this.props.children}</Element>;
    }
  };
}
