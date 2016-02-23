import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

/**
 * Creates a Component that renders a skin component injected from React context.
 * @param{string} componentName the componentName for the created Component class.  If componentName is 'Button',
 * then the 'ButtonSkin' component from context will be used to render the Component.  Also, if 'ButtonClassName' exists
 * in the context, it will be appended to the className given to the Component.
 * @param{Component} options.defaultComponent the default component to render if no skin component is provided
 * @param{string} options.defaultClassName the default className to use if `${componentName}ClassName` is not in
 * context
 * @param{string} options.className additional className to always use
 * @returns {SkinnableComponent} a Component that renders the skin component `componentName + 'Skin'` from React context.
 */
export default function createSkinnableComponent(componentName, options = {}) {
  const skinKey = componentName + 'Skin';
  const classNameKey = componentName + 'ClassName';
  const {defaultComponent, defaultClassName, className: alwaysClassName} = options;
  return class SkinnableComponent extends Component {
    static contextTypes = {
      [skinKey]: defaultComponent ? PropTypes.any : PropTypes.any.isRequired,
      [classNameKey]: PropTypes.string,
    };
    static displayName = componentName;
    render() {
      let Comp = this.context[skinKey] || defaultComponent;
      let className = classNames(alwaysClassName, this.props.className, this.context[classNameKey] || defaultClassName);
      return <Comp {...this.props} className={className}>{this.props.children}</Comp>;
    }
  };
}
