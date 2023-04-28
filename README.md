# @ember/render-modifiers

Provides element modifiers that can be used to hook into specific portions of
the rendering lifecycle.

### When to use these modifiers (and when _not_ to use them)

The modifiers provided in this package are ideal for quickly migrating away from
classic Ember components to Glimmer components, because they largely allow you to
use the same lifecycle hook methods you've already written while attaching them to
these modifiers. For example, a `didInsertElement` hook could be called by
`{{did-insert this.didInsertElement}}` to ease your migration process.

However, we strongly encourage you to take this opportunity to rethink your
functionality rather than use these modifiers as a crutch. In many cases, classic
lifecycle hooks like `didInsertElement` can be rewritten as custom modifiers that
internalize functionality manipulating or generating state from a DOM element.
Other times, you may find that a modifier is not the right fit for that logic at all,
in which case it's worth revisiting the design to find a better pattern.

Either way, we recommend using these modifiers with caution. They are very useful for
quickly bridging the gap between classic components and Glimmer components, but they
are still generally an anti-pattern. We recommend considering a custom modifier in
most use-cases where you might want to reach for this package.

## Compatibility

- Ember.js v3.20 or above
- Ember CLI v3.20 or above
- Node.js v12 or above

## Installation

```
ember install @ember/render-modifiers
```

## Usage Examples

### Example: Scrolling an element to a position

This sets the scroll position of an element, and updates it whenever the scroll
position changes.

Before:

```hbs
{{yield}}
```

```js
export default class extends Component {
  @action
  didRender(element) {
    element.scrollTop = this.scrollPosition;
  }
}
```

After:

```hbs
<div
  {{did-insert this.setScrollPosition @scrollPosition}}
  {{did-update this.setScrollPosition @scrollPosition}}
  class='scroll-container'
>
  {{yield}}
</div>
```

```js
export default class extends Component {
  setScrollPosition(element, [scrollPosition]) {
    element.scrollTop = scrollPosition;
  }
}
```

#### Example: Adding a class to an element after render for CSS animations

This adds a CSS class to an alert element in a conditional whenever it renders
to fade it in, which is a bit of an extra hoop. For CSS transitions to work, we
need to append the element _without_ the class, then add the class after it has
been appended.

Before:

```hbs
{{#if this.shouldShow}}
  <div class='alert'>
    {{yield}}
  </div>
{{/if}}
```

```js
export default class extends Component {
  @action
  didRender(element) {
    let alert = element.querySelector('.alert');

    if (alert) {
      alert.classList.add('fade-in');
    }
  }
}
```

After:

```hbs
{{#if this.shouldShow}}
  <div {{did-insert this.fadeIn}} class='alert'>
    {{yield}}
  </div>
{{/if}}
```

```js
export default class extends Component {
  @action
  fadeIn(element) {
    element.classList.add('fade-in');
  }
}
```

#### Example: Resizing text area

One key thing to know about `{{did-update}}` is it will not rerun whenever the
_contents_ or _attributes_ on the element change. For instance, `{{did-update}}`
will _not_ rerun when `@type` changes here:

```hbs
<div {{did-update this.setupType}} class='{{@type}}'></div>
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
export default class extends Component {
  @action
  resizeArea(element) {
    element.style.height = `${element.scrollHeight}px`;
  }
}
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
export default class extends Component {
  constructor() {
    super(...arguments);
    this.children = new Set();

    this.args.parent.registerChild(this);
  }

  willDestroy() {
    super.willDestroy(...arguments);

    this.args.parent.unregisterChild(this);
  }

  registerChild(child) {
    this.children.add(child);
  }

  unregisterChild(child) {
    this.children.delete(child);
  }

  @action
  didInsertNode(element) {
    // library setup code goes here

    this.children.forEach(c => c.didInsertNode(element));
  }

  @action
  willDestroyNode(element) {
    // library teardown code goes here

    this.children.forEach(c => c.willDestroyNode(element));
  }
});
```

```hbs
<!-- components/node.hbs -->
{{yield (component 'node' parent=this)}}
```

Root component:

```js
// components/root.js
import NodeComponent from './node.js';

export default class extends NodeComponent {}
```

```hbs
<!-- components/root.hbs -->
<div {{did-insert this.didInsertNode}} {{will-destroy this.willDestroyNode}}>
  {{yield (component 'node' parent=this)}}
</div>
```

Usage:

```hbs
<Root as |node|>
  <node as |node|>
    <node></node>
  </node>
</Root>
```

## Glint usage
If you are using [Glint](https://typed-ember.gitbook.io/glint/) and `environment-ember-loose`, you can add all the modifiers to your app at once by adding

```ts
import type RenderModifiersRegistry from '@ember/render-modifiers/template-registry';
```
to your app's e.g. `types/glint.d.ts` file, and making sure your registry extends from RenderModifiersRegistry:

```ts
declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends RenderModifiersRegistry {
      // ...
    }
}
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
