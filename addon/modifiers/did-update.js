import { gte } from 'ember-compatibility-helpers';
import { setModifierManager, capabilities } from '@ember/modifier';

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
  the component context in your function, use the `action` decorator as follows:

  ```handlebars
  <div {{did-update this.someFunction @someArg} />
  ```

  ```js
  export default Component.extend({
    someFunction: action(function(element, [someArg]) {
      // the `this` context will be the component instance
    })
  });
  ```

  @method did-update
  @public
*/
export default setModifierManager(
  () => ({
    capabilities: capabilities(gte('3.22.0') ? '3.22' : '3.13', {
      disableAutoTracking: gte('3.22.0') ? false : true,
    }),

    createModifier() {
      return { element: null };
    },

    installModifier(state, element, args) {
      // save element into state bucket
      state.element = element;

      if (gte('3.22.0')) {
        // consume all args
        for (let i = 0; i < args.positional.length; i++) {
          // "noop" / consume the arg
          args.positional[i];
        }

        for (let key of Object.keys(args.named)) {
          // "noop" / consume the arg
          args.named[key];
        }
      }
    },

    updateModifier({ element }, args) {
      let [fn, ...positional] = args.positional;

      fn(element, positional, args.named);
    },

    destroyModifier() {},
  }),
  class DidUpdateModifier {}
);
