import { setModifierManager, capabilities } from '@ember/modifier';

import type {
  ModifierArgs,
  ModifierState,
  RenderModifierType,
} from '../types.ts';

/**
 * The `{{willDestroy}}` modifier is activated immediately before the element
 * is removed from the DOM.
 *
 * The callback receives the element as its first argument, followed by
 * any positional arguments passed to the modifier.
 *
 * @example Basic usage
 * ```gjs
 * import Component from '@glimmer/component';
 * import { action } from '@ember/object';
 * import { willDestroy } from '@ember/render-modifiers';
 *
 * export default class MyComponent extends Component {
 *   @action
 *   teardownPlugin(element) {
 *     // teardown logic here
 *   }
 *
 *   <template>
 *     <div {{willDestroy this.teardownPlugin}}>
 *       {{yield}}
 *     </div>
 *   </template>
 * }
 * ```
 */
const WillDestroyModifier = setModifierManager(
  () => ({
    capabilities: capabilities('3.22', { disableAutoTracking: true }),
    createModifier(): ModifierState {
      return { element: null };
    },

    installModifier(state: ModifierState, element: Element) {
      state.element = element;
    },

    updateModifier() {},

    destroyModifier({ element }: ModifierState, args: ModifierArgs) {
      const [fn, ...positional] = args.positional;

      fn(element!, positional, args.named);
    },
  }),
  class WillDestroyModifier {},
) as unknown as RenderModifierType;

export default WillDestroyModifier;
