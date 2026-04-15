import { setModifierManager, capabilities } from '@ember/modifier';
import {
  macroCondition,
  dependencySatisfies,
  importSync,
} from '@embroider/macros';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const untrack: (fn: () => void) => void = (function () {
  if (macroCondition(dependencySatisfies('ember-source', '> 3.27.0-beta.1'))) {
    // ember-source@3.27 shipped "real modules" by default, so we can just use
    // importSync to get @glimmer/validator directly
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    const module = importSync('@glimmer/validator') as any;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return module.untrack as unknown as (fn: () => void) => void;
  } else if (
    macroCondition(dependencySatisfies('ember-source', '>= 3.22.0-alpha.1'))
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    const module = importSync('ember') as any;
    // we can access `window.Ember` here because it wasn't deprecated until at least 3.27
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return module.__loader.require('@glimmer/validator').untrack;
  } else {
    // we do not call `untrack` when ember-source < 3.22
    // (we don't suport ember-source < 3.22)
  }
})();

import type {
  ModifierArgs,
  ModifierState,
  RenderModifierType,
} from '../types.ts';

/**
 * The `{{didUpdate}}` modifier is activated when any of its arguments
 * are updated. It does **not** run on initial render.
 *
 * The callback receives the element as its first argument, followed by
 * any positional arguments passed to the modifier.
 *
 * By default, the executed function will be unbound. If you would like to
 * access the component context in your function, use the `@action` decorator.
 *
 * @example Resizing a textarea when `@text` changes
 * ```gjs
 * import { didUpdate } from '@ember/render-modifiers';
 *
 * function resize(element) {
 *   element.style.height = `${element.scrollHeight}px`;
 * }
 *
 * <template>
 *   <textarea {{didUpdate resize @text}} readonly style="padding: 0px;">
 *     {{@text}}
 *   </textarea>
 * </template>
 * ```
 *
 * @example Positional and named arguments
 * ```gjs
 * import { didUpdate } from '@ember/render-modifiers';
 *
 * function logArguments(element, [first, second], { third }) {
 *   console.log('element', element);
 *   console.log('positional args', first, second);
 *   console.log('named args', third);
 * }
 *
 * <template>
 *   <div {{didUpdate logArguments @first @second third=@third}} />
 * </template>
 * ```
 *
 * @example With `@action` for component context
 * ```gjs
 * import Component from '@glimmer/component';
 * import { tracked } from '@glimmer/tracking';
 * import { action } from '@ember/object';
 * import { didUpdate } from '@ember/render-modifiers';
 *
 * export default class MyComponent extends Component {
 *   @tracked scrollPosition = 0;
 *
 *   @action
 *   setScrollPosition(element) {
 *     element.scrollTop = this.scrollPosition;
 *   }
 *
 *   <template>
 *     <div {{didUpdate this.setScrollPosition @scrollPosition}} class="scroll-container">
 *       {{yield}}
 *     </div>
 *   </template>
 * }
 * ```
 */
const DidUpdateModifier = setModifierManager(
  () => ({
    capabilities: capabilities('3.22', { disableAutoTracking: false }),
    createModifier(): ModifierState {
      return { element: null };
    },
    installModifier(
      state: ModifierState,
      element: Element,
      args: ModifierArgs,
    ) {
      // save element into state bucket
      state.element = element;

      // Consume individual properties to entangle tracking.
      // https://github.com/emberjs/ember.js/issues/19277
      // https://github.com/ember-modifier/ember-modifier/pull/63#issuecomment-815908201
      args.positional.forEach(() => {});
      if (args.named) Object.values(args.named);
    },

    updateModifier({ element }: ModifierState, args: ModifierArgs) {
      const [fn, ...positional] = args.positional;

      // Consume individual properties to entangle tracking.
      // https://github.com/emberjs/ember.js/issues/19277
      // https://github.com/ember-modifier/ember-modifier/pull/63#issuecomment-815908201
      args.positional.forEach(() => {});
      if (args.named) Object.values(args.named);

      untrack(() => {
        fn(element!, positional, args.named);
      });
    },

    destroyModifier() {},
  }),
  class DidUpdateModifier {},
) as unknown as RenderModifierType;

export default DidUpdateModifier;
