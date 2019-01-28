import Ember from 'ember';

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
