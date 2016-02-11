import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

/**
 * Creates a Component that provides the skin for a given skinnable component.
 * @param{string} displayName the displayName for the created Component class.
 * @param props additional props for the element returned by the render method.  If a `component` prop
 * is given, the render method will return an element of that type.
 * @returns {SkinComponent} a Component that provides the skin for a given skinnable component.
 */
export default function createSkinComponent(displayName, props = {}) {
  return class SkinComponent extends Component {
    static displayName = displayName;
    render() {
      let {component, children, className} = this.props;
      className = classNames(className, props.className);
      let Comp = props.component || component || 'div';
      return <Comp {...props} {...this.props} className={className}>{children}</Comp>;
    }
  };
}
