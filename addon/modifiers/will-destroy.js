import Ember from 'ember';

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
