import { setModifierManager, capabilities } from '@ember/modifier';

/**
 * The `{{didInsert}}` modifier is activated when an element is inserted into the DOM.
 *
 * The callback receives the element as its first argument, followed by any
 * positional arguments passed to the modifier.
 *
 * By default, the executed function will be unbound. If you would like to
 * access the component context in your function, use the `@action` decorator.
 *
 * @example Basic usage
 * ```gjs
 * import { didInsert } from '@ember/render-modifiers';
 *
 * function fadeIn(element) {
 *   element.classList.add('fade-in');
 * }
 *
 * <template>
 *   <div {{didInsert fadeIn}} class="alert">
 *     Hello!
 *   </div>
 * </template>
 * ```
 *
 * @example With `@action` for component context
 * ```gjs
 * import Component from '@glimmer/component';
 * import { tracked } from '@glimmer/tracking';
 * import { action } from '@ember/object';
 * import { didInsert } from '@ember/render-modifiers';
 *
 * export default class MyComponent extends Component {
 *   @tracked count = 0;
 *
 *   @action
 *   incrementCount() {
 *     this.count++;
 *   }
 *
 *   <template>
 *     <div {{didInsert this.incrementCount}}>first</div>
 *     <div {{didInsert this.incrementCount}}>second</div>
 *     <p>{{this.count}} elements were rendered</p>
 *   </template>
 * }
 * ```
 */
const DidInsertModifier = setModifierManager(() => ({
  capabilities: capabilities('3.22', {
    disableAutoTracking: true
  }),
  createModifier() {},
  installModifier(_state, element, {
    positional: [fn, ...args],
    named
  }) {
    fn(element, args, named);
  },
  updateModifier() {},
  destroyModifier() {}
}), class DidInsertModifier {});

export { DidInsertModifier as default };
//# sourceMappingURL=did-insert.js.map
