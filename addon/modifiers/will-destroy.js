import { setModifierManager, capabilities } from '@ember/modifier';
import { macroCondition, dependencySatisfies } from '@embroider/macros';

/**
  The `{{will-destroy}}` element modifier is activated immediately before the element
  is removed from the DOM.

  ```handlebars
  <div {{will-destroy this.teardownPlugin}}>
    {{yield}}
  </div>
  ```

  ```js
  export default Component.extend({
    teardownPlugin(element) {
      // teardown logic here
    }
  });
  ```

  By default, the executed function will be unbound. If you would like to access
  the component context in your function, use the `action` decorator as follows:

  ```handlebars
  <div {{will-destroy this.teardownPlugin}}>
    {{yield}}
  </div>
  ```

  ```js
  export default Component.extend({
    teardownPlugin: action(function(element) {
      // the `this` context will be the component instance
    })
  });
  ```

  @method will-destroy
  @public
*/
export default setModifierManager(
  () => ({
    capabilities: capabilities(
      macroCondition(dependencySatisfies('ember-source', '>= 3.22.0-beta.1')) ? '3.22' : '3.13',
      { disableAutoTracking: true }
    ),

    createModifier() {
      return { element: null };
    },

    installModifier(state, element) {
      state.element = element;
    },

    updateModifier() {},

    destroyModifier({ element }, args) {
      let [fn, ...positional] = args.positional;

      fn(element, positional, args.named);
    },
  }),
  class WillDestroyModifier {}
);
