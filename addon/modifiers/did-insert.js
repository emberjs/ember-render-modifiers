import Ember from 'ember';

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
export default Ember._setModifierManager(
  () => ({
    createModifier() {},

    installModifier(_state, element, args) {
      let [fn, ...positional] = args.positional;

      fn(element, positional, args.named);
    },

    updateModifier() {},
    destroyModifier() {},
  }),
  class DidInsertModifier {}
);
