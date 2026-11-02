import { setModifierManager, capabilities } from '@ember/modifier';

/**
 * The `{{willDestroy}}` modifier is activated immediately before the element
 * is removed from the DOM.
 *
 * The callback receives the element as its first argument, followed by
 * any positional arguments passed to the modifier.
 *
 * By default, the executed function will be unbound. If you would like to
 * access the component context in your function, use the `@action` decorator.
 *
 * @example Basic usage
 * ```gjs
 * import { willDestroy } from '@ember/render-modifiers';
 *
 * function teardownPlugin(element) {
 *   // teardown logic here
 * }
 *
 * <template>
 *   <div {{willDestroy teardownPlugin}}>
 *     {{yield}}
 *   </div>
 * </template>
 * ```
 *
 * @example With `@action` for component context
 * ```gjs
 * import Component from '@glimmer/component';
 * import { action } from '@ember/object';
 * import { service } from '@ember/service';
 * import { willDestroy } from '@ember/render-modifiers';
 *
 * export default class MyComponent extends Component {
 *   @service analytics;
 *
 *   @action
 *   trackRemoval(element) {
 *     this.analytics.track('element-removed', { id: element.id });
 *   }
 *
 *   <template>
 *     <div {{willDestroy this.trackRemoval}} id="tracked-element">
 *       {{yield}}
 *     </div>
 *   </template>
 * }
 * ```
 */
const WillDestroyModifier = setModifierManager(() => ({
  capabilities: capabilities('3.22', {
    disableAutoTracking: true
  }),
  createModifier() {
    return {
      element: null
    };
  },
  installModifier(state, element) {
    state.element = element;
  },
  updateModifier() {},
  destroyModifier({
    element
  }, args) {
    const [fn, ...positional] = args.positional;
    fn(element, positional, args.named);
  }
}), class WillDestroyModifier {});

export { WillDestroyModifier as default };
//# sourceMappingURL=will-destroy.js.map
