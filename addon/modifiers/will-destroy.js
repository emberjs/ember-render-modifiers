import { setModifierManager, capabilities } from '@ember/modifier';
import { gte } from 'ember-compatibility-helpers';

import assertFunction from '../-private/assert-function';

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
    capabilities: capabilities(gte('3.22.0') ? '3.22' : '3.13', { disableAutoTracking: true }),

    createModifier() {
      return { element: null };
    },

    installModifier(state, element, { positional: [fn] }) {
      assertFunction('did-destroy', fn);

      state.element = element;
    },

    updateModifier() {},

    destroyModifier({ element }, args) {
      let [fn, ...positional] = args.positional;

      assertFunction('did-destroy', fn);

      fn(element, positional, args.named);
    },
  }),
  class WillDestroyModifier {}
);
