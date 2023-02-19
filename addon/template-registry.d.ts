import type { DidInsertModifier } from './modifiers/did-insert';
import type { DidUpdateModifier } from './modifiers/did-update';
import type { WillDestroyModifier } from './modifiers/will-destroy';

export default interface RenderModifiersRegistry {
  'did-insert': typeof DidInsertModifier;
  'did-update': typeof DidUpdateModifier;
  'will-destroy': typeof WillDestroyModifier;
}
