import Ember from 'ember';

/**
  The `{{did-update}}` element modifier is activated when any of its arguments
  are updated. It does not run on initial render.

  In this example, the `resize` function receives the `textarea` DOM element as its
  first argument and is executed anytime the `@text` argument changes.

  ```handlebars
  <textarea {{did-update this.resize @text}} readonly style="padding: 0px;">
    {{@text}}
  </textarea>
  ```

  ```js
  export default Component.extend({
    resize(element) {
      element.style.height = `${element.scrollHeight}px`;
    }
  });
  ```

  In addition to the `element`, both named and positional arguments are passed to the
  executed function:

  ```handlebars
  <div {{did-update this.logArguments @first @second third=@third}} />
  ```

  ```js
  export default Component.extend({
    logArguments(element, [first, second], { third }) {
      console.log('element', element);
      console.log('positional args', first, second);
      console.log('names args', third);
    }
  });
  ```

  By default, the executed function will be unbound. If you would like to access
  the component context in your function, use the `action` helper as follows:

  ```handlebars
  <div {{did-update (action this.someFunction) @someArg} />
  ```

  @method did-update
  @public
*/
export default Ember._setModifierManager(
  () => ({
    createModifier() {
      return { element: null };
    },
    installModifier(state, element) {
      // save element into state bucket
      state.element = element;
    },

    updateModifier({ element }, args) {
      let [fn, ...positional] = args.positional;

      fn(element, positional, args.named);
    },

    destroyModifier() {},
  }),
  class DidUpdateModifier {}
);
