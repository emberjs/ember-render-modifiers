import { setModifierManager, capabilities } from '@ember/modifier';
import { macroCondition, dependencySatisfies } from '@embroider/macros';

/**
  The `{{did-insert}}` element modifier is activated when an element is
  inserted into the DOM.

  In this example, the `fadeIn` function receives the `div` DOM element as its
  first argument and is executed after the element is inserted into the DOM.

  ```handlebars
  <div {{did-insert this.fadeIn}} class="alert">
    {{yield}}
  </div>
  ```

  ```js
  export default Component.extend({
    fadeIn(element) {
      element.classList.add('fade-in');
    }
  });
  ```

  By default, the executed function will be unbound. If you would like to access
  the component context in your function, use the `action` decorator as follows:

  ```handlebars
  <div {{did-insert this.incrementCount}}>first</div>
  <div {{did-insert this.incrementCount}}>second</div>

  <p>{{this.count}} elements were rendered</p>
  ```

  ```js
  export default Component.extend({
    count: tracked({ value: 0 }),

    incrementCount: action(function() {
      this.count++;
    })
  });
  ```

  @method did-insert
  @public
*/
export default setModifierManager(
  () => ({
    capabilities: capabilities(
      macroCondition(dependencySatisfies('ember-source', '>= 3.22.0-beta.1')) ? '3.22' : '3.13',
      { disableAutoTracking: true }
    ),

    createModifier() {},

    installModifier(_state, element, { positional: [fn, ...args], named }) {
      fn(element, args, named);
    },

    updateModifier() {},
    destroyModifier() {},
  }),
  class DidInsertModifier {}
);
