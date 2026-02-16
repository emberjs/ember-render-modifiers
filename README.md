# @ember/render-modifiers

Provides element modifiers that hook into specific portions of the rendering lifecycle:

- **`didInsert`** — runs a callback when an element is inserted into the DOM
- **`didUpdate`** — runs a callback when any of its arguments change (skips initial render)
- **`willDestroy`** — runs a callback just before an element is removed from the DOM

### When to use these modifiers (and when _not_ to use them)

> [!CAUTION]
> The modifiers provided in this package are ideal for quickly migrating away from
> classic Ember components to Glimmer components, because they largely allow you to
> use the same lifecycle hook methods you've already written. We _strongly_ encourage
> you to avoid these modifiers in new code. Classic lifecycle hooks can be rewritten
> as custom modifiers.

The modifiers provided in this package are ideal for quickly migrating away from
classic Ember components to Glimmer components, because they largely allow you to
use the same lifecycle hook methods you've already written while attaching them to
these modifiers. For example, a `didInsertElement` hook could be called by
`{{didInsert this.didInsertElement}}` to ease your migration process.

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

_**For more on why these modifiers exist and what the modern alternatives look like,
watch [this talk from EmberFest 2022](https://www.youtube.com/watch?v=zwewg2xmpU8).**_

## Compatibility

- Ember.js v4.12 or above
- Embroider or ember-auto-import v2
- Node.js v18 or above

## Installation

```sh
pnpm add @ember/render-modifiers
```

Or with npm/yarn:

```sh
npm install @ember/render-modifiers
# or
yarn add @ember/render-modifiers
```

## Usage

### Strict mode (`.gjs` / `.gts`)

Import the modifiers directly and use them with template tag syntax:

#### `didInsert`

```gjs
import { didInsert } from '@ember/render-modifiers';

function fadeIn(element) {
  element.classList.add('fade-in');
}

<template>
  <div {{didInsert fadeIn}} class="alert">
    Hello!
  </div>
</template>
```

#### `didUpdate`

```gjs
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { didInsert, didUpdate } from '@ember/render-modifiers';

export default class ScrollContainer extends Component {
  @action
  setScrollPosition(element, [scrollPosition]) {
    element.scrollTop = scrollPosition;
  }

  <template>
    <div
      {{didInsert this.setScrollPosition @scrollPosition}}
      {{didUpdate this.setScrollPosition @scrollPosition}}
      class="scroll-container"
    >
      {{yield}}
    </div>
  </template>
}
```

#### `willDestroy`

```gjs
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { willDestroy } from '@ember/render-modifiers';

export default class Tooltip extends Component {
  @action
  teardown(element) {
    // cleanup logic here
  }

  <template>
    <div {{willDestroy this.teardown}}>
      {{yield}}
    </div>
  </template>
}
```

#### CSS fade-in animation

```gjs
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { didInsert } from '@ember/render-modifiers';

export default class Alert extends Component {
  @action
  fadeIn(element) {
    element.classList.add('fade-in');
  }

  <template>
    {{#if @show}}
      <div {{didInsert this.fadeIn}} class="alert">
        {{yield}}
      </div>
    {{/if}}
  </template>
}
```

#### Auto-resizing textarea

```gjs
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { didUpdate } from '@ember/render-modifiers';

export default class AutoResizeTextarea extends Component {
  @action
  resize(element) {
    element.style.height = `${element.scrollHeight}px`;
  }

  <template>
    <textarea {{didUpdate this.resize @text}} readonly>
      {{@text}}
    </textarea>
  </template>
}
```

### Loose mode (`.hbs`)

In classic loose-mode templates, the modifiers are available as `{{did-insert}}`,
`{{did-update}}`, and `{{will-destroy}}` without any imports:

```hbs
<div {{did-insert this.setup}} {{will-destroy this.teardown}}>
  {{yield}}
</div>
```

### TypeScript & Glint

Modifiers are fully typed out of the box. For loose-mode Glint support, register
the modifiers in your app's type declarations:

```ts
// types/glint.d.ts
import type RenderModifiersRegistry from '@ember/render-modifiers/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends RenderModifiersRegistry {
    // ...
  }
}
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
