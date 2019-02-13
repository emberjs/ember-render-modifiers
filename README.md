@ember/render-modifiers
==============================================================================

Provides element modifiers that can be used to hook into specific portions of
the rendering lifecycle.


Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above


Installation
------------------------------------------------------------------------------

```
ember install @ember/render-modifiers
```


Usage Examples
------------------------------------------------------------------------------

### Example: Scrolling an element to a position

This sets the scroll position of an element, and updates it whenever the scroll
position changes.

Before:

```hbs
{{yield}}
```
```js
export default Component.extend({
  classNames: ['scroll-container'],

  didRender() {
    this.element.scrollTop = this.scrollPosition;
  }
});
```

After:

```hbs
<div
  {{did-insert this.setScrollPosition @scrollPosition}}
  {{did-update this.setScrollPosition @scrollPosition}}

  class="scroll-container"
>
  {{yield}}
</div>
```
```js
export default class Component.extend({
  setScrollPosition(element, scrollPosition) {
    element.scrollTop = scrollPosition;
  }
})
```

#### Example: Adding a class to an element after render for CSS animations

This adds a CSS class to an alert element in a conditional whenever it renders
to fade it in, which is a bit of an extra hoop. For CSS transitions to work, we
need to append the element _without_ the class, then add the class after it has
been appended.

Before:

```hbs
{{#if this.shouldShow}}
  <div class="alert">
    {{yield}}
  </div>
{{/if}}
```
```js
export default Component.extend({
  didRender() {
    let alert = this.element.querySelector('.alert');

    if (alert) {
      alert.classList.add('fade-in');
    }
  }
});
```

After:

```hbs
{{#if this.shouldShow}}
  <div {{did-insert this.fadeIn}} class="alert">
    {{yield}}
  </div>
{{/if}}
```
```js
export default Component.extend({
  fadeIn(element) {
    element.classList.add('fade-in');
  }
});
```

#### Example: Resizing text area

One key thing to know about `{{did-update}}` is it will not rerun whenever the
_contents_ or _attributes_ on the element change. For instance, `{{did-update}}`
will _not_ rerun when `@type` changes here:

```hbs
<div {{did-update this.setupType}} class="{{@type}}"></div>
```

If `{{did-update}}` should rerun whenever a value changes, the value should be
passed as a parameter to the modifier. For instance, a textarea which wants to
resize itself to fit text whenever the text is modified could be setup like
this:

```hbs
<textarea {{did-update this.resizeArea @text}}>
  {{@text}}
</textarea>
```
```js
export default Component.extend({
  resizeArea(element) {
    element.css.height = `${element.scrollHeight}px`;
  }
});
```

#### Example: `ember-composability-tools` style rendering

This is the type of rendering done by libraries like `ember-leaflet`, which use
components to control the _rendering_ of the library, but without any templates
themselves. The underlying library for this is [here](https://github.com/miguelcobain/ember-composability-tools).
This is a simplified example of how you could accomplish this with Glimmer
components and element modifiers.

Node component:

```js
// components/node.js
export default Component.extend({
  init() {
    super(...arguments);
    this.children = new Set();

    this.parent.registerChild(this);
  }

  willDestroy() {
    super(...arguments);

    this.parent.unregisterChild(this);
  }

  registerChild(child) {
    this.children.add(child);
  }

  unregisterChild(child) {
    this.children.delete(child);
  }

  didInsertNode(element) {
    // library setup code goes here

    this.children.forEach(c => c.didInsertNode(element));
  }

  willDestroyNode(element) {
    // library teardown code goes here

    this.children.forEach(c => c.willDestroyNode(element));
  }
}
```
```hbs
<!-- components/node.hbs -->
{{yield (component "node" parent=this)}}
```

Root component:

```js
// components/root.js
import NodeComponent from './node.js';

export default NodeComponent.extend();
```
```hbs
<!-- components/root.hbs -->
<div
  {{did-insert (action this.didInsertNode)}}
  {{will-destroy (action this.willDestroyNode)}}
>
  {{yield (component "node" parent=this)}}
</div>
```

Usage:

```hbs
<Root as |node|>
  <node as |node|>
    <node />
  </node>
</Root>
```

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
