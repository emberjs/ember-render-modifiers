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

### Recommended alternatives

In most cases, a custom modifier (or even just the component constructor) is
a better fit than reaching for these lifecycle modifiers. Below are common
patterns and their modern equivalents.

#### DOM setup on insert → custom modifier

When you need element access, write a custom modifier with
[ember-modifier](https://github.com/ember-modifier/ember-modifier):

```gjs
import { modifier } from 'ember-modifier';

const fadeIn = modifier((element) => {
  element.classList.add('fade-in');
});

<template>
  <div {{fadeIn}} class="alert">
    Hello!
  </div>
</template>
```

<details>
<summary>With <code>didInsert</code></summary>

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

</details>

#### Reacting to argument changes → custom modifier

A custom modifier automatically re-runs when its arguments change,
replacing both `{{didInsert}}` and `{{didUpdate}}`:

```gjs
import { modifier } from 'ember-modifier';

const scrollTo = modifier((element, [position]) => {
  element.scrollTop = position;
});

<template>
  <div {{scrollTo @scrollPosition}} class="scroll-container">
    {{yield}}
  </div>
</template>
```

<details>
<summary>With <code>didInsert</code> + <code>didUpdate</code></summary>

```gjs
import { didInsert, didUpdate } from '@ember/render-modifiers';

function setScrollPosition(element, [scrollPosition]) {
  element.scrollTop = scrollPosition;
}

<template>
  <div
    {{didInsert setScrollPosition @scrollPosition}}
    {{didUpdate setScrollPosition @scrollPosition}}
    class="scroll-container"
  >
    {{yield}}
  </div>
</template>
```

</details>

#### Cleanup on teardown → modifier destructor

Return a cleanup function from your custom modifier — it runs automatically
when the element is removed:

```gjs
import { modifier } from 'ember-modifier';

const tooltip = modifier((element) => {
  const instance = createTooltip(element);

  return () => {
    instance.destroy();
  };
});

<template>
  <div {{tooltip}}>
    Hover me
  </div>
</template>
```

<details>
<summary>With <code>willDestroy</code></summary>

```gjs
import { willDestroy } from '@ember/render-modifiers';

function teardown(element) {
  // cleanup logic here
}

<template>
  <div {{willDestroy teardown}}>
    {{yield}}
  </div>
</template>
```

</details>

---

### API reference

If you still need these modifiers (e.g., during migration), here is the
full API.

#### Strict mode (`.gjs` / `.gts`)

Import the modifiers directly and use them with template tag syntax:

```gjs
import { didInsert, didUpdate, willDestroy } from '@ember/render-modifiers';
```

By default, the executed function will be unbound. If you need to access
component state (`this`) in your callback, use the `@action` decorator to bind
the method:

```gjs
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { didInsert, didUpdate } from '@ember/render-modifiers';

export default class ScrollContainer extends Component {
  @tracked scrollPosition = 0;

  @action
  setScrollPosition(element, [scrollPosition]) {
    this.scrollPosition = scrollPosition;
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

#### Loose mode (`.hbs`)

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
