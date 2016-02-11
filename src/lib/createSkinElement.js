import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

export function createSkinElement(displayName, props = {}) {
  return class SkinElement extends Component {
    static displayName = displayName;
    render() {
      let {component, children, className} = this.props;
      className = classNames(className, props.className);
      let Comp = props.component || component || 'div';
      return <Comp {...props} {...this.props} className={className}>{children}</Comp>;
    }
  };
}
