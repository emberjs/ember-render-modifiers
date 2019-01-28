import Ember from 'ember';

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
