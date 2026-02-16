import { setModifierManager, capabilities } from '@ember/modifier';

import type {
  ModifierArgs,
  ModifierState,
  RenderModifierType,
} from '../types.ts';

// @ts-expect-error - @glimmer/validator is not typed
import { untrack } from '@glimmer/validator';

/**
 * The `{{didUpdate}}` modifier is activated when any of its arguments
 * are updated. It does **not** run on initial render.
 *
 * The callback receives the element as its first argument, followed by
 * any positional arguments passed to the modifier.
 *
 * @example Resizing a textarea when `@text` changes
 * ```gjs
 * import Component from '@glimmer/component';
 * import { action } from '@ember/object';
 * import { didUpdate } from '@ember/render-modifiers';
 *
 * export default class MyComponent extends Component {
 *   @action
 *   resize(element) {
 *     element.style.height = `${element.scrollHeight}px`;
 *   }
 *
 *   <template>
 *     <textarea {{didUpdate this.resize @text}} readonly style="padding: 0px;">
 *       {{@text}}
 *     </textarea>
 *   </template>
 * }
 * ```
 *
 * @example Positional and named arguments
 * ```gjs
 * import Component from '@glimmer/component';
 * import { action } from '@ember/object';
 * import { didUpdate } from '@ember/render-modifiers';
 *
 * export default class MyComponent extends Component {
 *   @action
 *   logArguments(element, [first, second], { third }) {
 *     console.log('element', element);
 *     console.log('positional args', first, second);
 *     console.log('named args', third);
 *   }
 *
 *   <template>
 *     <div {{didUpdate this.logArguments @first @second third=@third}} />
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      untrack(() => {
        fn(element!, positional, args.named);
      });
    },

    destroyModifier() {},
  }),
  class DidUpdateModifier {},
) as unknown as RenderModifierType;

export default DidUpdateModifier;
