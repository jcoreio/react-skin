import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

export default function createSkinnableElement(displayName) {
  const skinName = displayName + 'Skin';
  return class SkinnableElement extends Component {
    static contextTypes = {
      [skinName]: PropTypes.any.isRequired,
    };
    static displayName = displayName;
    render() {
      let Element = this.context[skinName];
      return <Element skinName={skinName} {...this.props}>{this.props.children}</Element>;
    }
  };
}
