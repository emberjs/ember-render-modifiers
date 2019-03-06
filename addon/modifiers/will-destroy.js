import Ember from 'ember';

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
  the component context in your function, use the `action` helper as follows:

    ```handlebars
  <div {{will-destroy (action this.teardownPlugin)}}>
    {{yield}}
  </div>
  ```

  @method will-destroy
  @public
*/
export default Ember._setModifierManager(
  () => ({
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
