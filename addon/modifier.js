import Ember from 'ember';
import { setModifierManager, capabilities } from '@ember/modifier';

if (!capabilities) {
  // Exported to global with typo up till #18266
  capabilities = Ember._modifierManagerCapabilties;
}

export { setModifierManager, capabilities };
