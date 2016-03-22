# react-skin

Create skinnable React components with minimal boilerplate!

## Example

```jsx
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import {createSkinnableComponent, createSkinComponent, createSkin} from 'react-skin';

const Button = createSkinnableComponent('Button');

const BootstrapSkin = createSkin('BootstrapSkin', {
  Button: createSkinComponent('BootstrapButton', {component: 'button', type: 'button', className: 'btn btn-default'}),
});

ReactDOM.render(document.getElementById('app'),
  <BootstrapSkin>
    <Button>Cool!</Button>
  </BootstrapSkin>
);
```

## API

### createSkinnableComponent

```jsx
function createSkinnableComponent(componentName: string): Class<ReactComponent>
```

Creates a Component class that renders a component from context (specifically, `this.context[componentName + 'Skin']`.

For example, `createSkinnableComponent('Button')` will render an element of type `this.context.ButtonSkin`.

`componentName` is used as the created class' `displayName`.

### createSkinComponent

```jsx
function createSkinComponent(displayName: string, props: Object): Class<ReactComponent>
```

Convention method that creates a Component class that provides the skin for a skinnable component.  For instance with
Bootstrap you would just specify the `component` type and `className`.

`displayName` is used as the created class' `displayName`.

`props` specifies additional props for the element returned by the `render` method.

If `props` contains a `component` prop, the `render` method will create an element of that type.

If `props` contains a `className` prop, it will be merged with any `className` provided to the element
using `classnames`.

### createSkin

```jsx
function createSkin(displayName: string, skinComponents: {[name: string]: Class<ReactComponent>}, props: Object): Class<ReactComponent>
```

Creates a Component class that puts the given `skinComponents` onto the child context (with `'Skin'` appended to their
keys).

For example,
```jsx
createSkin('BootstrapSkin', {
  Button: createSkinComponent('BootstrapButton', {component: 'button', className: 'btn btn-default'})
});
```
will inject a `ButtonSkin` into its child context to skin components of type `createSkinnableComponent('Button')`.

`displayName` is used as the created class' `displayName`.

`props` specifies additional props for the element returned by the `render` method.

If `props` contains a `component` prop, the `render` method will create an element of that type.

If `props` contains a `className` prop, it will be merged with any `className` provided to the element
using `classnames`.

### createSkinDecorator
```jsx
function createSkinDecorator(decorators: {[key: string]: (Skin: any, props: Object, decorator: Component) => ReactElement}): any
```

Creates a Component that decorates skin components (via context injection).

For example,
```jsx
let SkinDecorator = createSkinDecorator({
  Title: (Title, props) => <Title {...props}>
    <a href="..">Up</a>
    {props.children}
  </Title> 
});
```
will inject a `TitleSkin` into its child context that adds an "Up" link to any <Title> rendered by the child.  The `Title`
argument to the lambda is the `TitleSkin` from the decorator's own context.

## Advanced Example

This example shows how skins can be nested to make Header, Title, Body, and Footer elements that respond differently
inside of a Panel or a Modal.  Be creative!

```jsx
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import {createSkinnableComponent, createSkinComponent, createSkin} from 'react-skin';

const Button = createSkinnableComponent('Button');

const Panel = createSkinnableComponent('Panel');
const Modal = createSkinnableComponent('Modal');

const Header = createSkinnableComponent('Header');
const Title = createSkinnableComponent('Title');
const Body = createSkinnableComponent('Body');
const Footer = createSkinnableComponent('Footer');

const BootstrapSkin = createSkin('BootstrapSkin', {
  Button: createSkinComponent('BootstrapButton', {component: 'button', type: 'button', className: 'btn btn-default'}),
  Panel: createSkin('BootstrapPanelSkin', {
    Header: createSkinComponent('BootstrapPanelHeader', {component: 'div', className: 'panel-heading'}),
    Title: createSkinComponent('BootstrapPanelTitle', {component: 'h3', className: 'panel-title'}),
    Body: createSkinComponent('BootstrapPanelBody', {component: 'div', className: 'panel-body'}),
    Footer: createSkinComponent('BootstrapPanelFooter', {component: 'div', className: 'panel-footer'}),
  },
  {
    component: createSkinComponent('BootstrapPanel', {component: 'div', className: 'panel panel-default'}),
  }),
  Modal: createSkin('BootstrapModalSkin', {
    Header: createSkinComponent('BootstrapModalHeader', {component: 'div', className: 'modal-header'}),
    Title: createSkinComponent('BootstrapModalTitle', {component: 'h3', className: 'modal-title'}),
    Body: createSkinComponent('BootstrapModalBody', {component: 'div', className: 'modal-body'}),
    Footer: createSkinComponent('BootstrapModalFooter', {component: 'div', className: 'modal-footer'}),
  },
  {
    component: createSkinComponent('BootstrapModal', {
      component: props => (<div {...props} style={{display: 'block'}}>
        <div className="modal-dialog">
          <div className="modal-content">
            {props.children}
          </div>
        </div>
      </div>),
      className: 'modal fade in',
    }),
  }),
});

ReactDOM.render(document.getElementById('app'),
    <BootstrapSkin>
      <Modal>
        <Header>
          <Title>Skinned Modal</Title>
        </Header>
        <Body>
          All of these components have been cleverly skinned by passing down components in React context.
          <br/>
          <br/>
          <Panel>
            <Header>
              <Title>Skinned Panel</Title>
            </Header>
            <Body>
              All of these components have been cleverly skinned by passing down components in React context.
            </Body>
            <Footer>
              <Button>Cool!</Button>
            </Footer>
          </Panel>
        </Body>
        <Footer>
          <Button>Cool!</Button>
        </Footer>
      </Modal>
    </BootstrapSkin>
);
```
