import React, {Component, PropTypes} from 'react';

/**
 * Creates a Component that decorates skin components (via context injection).
 * @param decorators an object whose keys are skinnable component names and whose values are functions taking
 * the following arguments and returning a React Element (representing the decorated skin):
 * * SkinComponent - the skin component to decorate
 * * props - the props passed to the skinnable component
 * * decorator - the decorator component (returned by this method)
 * @returns {SkinDecorator} wrap some component in this to decorate skin components within it.
 */
export default function createSkinDecorator(decorators) {
  let contextTypes = {};
  
  for (let componentName in decorators) {
    let skinName = componentName + 'Skin';
    contextTypes[skinName] = PropTypes.any.isRequired;
  }
  
  return class SkinDecorator extends Component {
    static contextTypes = contextTypes;
    static childContextTypes = contextTypes;
    constructor(props) {
      super(props);
      this.decorators = {};
      for (let componentName in decorators) {
        let skinName = componentName + 'Skin';
        this.decorators[skinName] = props => decorators[componentName](this.context[skinName], props, this);
      }
    }
    getChildContext() {
      return this.decorators;
    }
    render() {
      const {children, ...props} = this.props
      return React.cloneElement(children, props);
    }
  };
}
