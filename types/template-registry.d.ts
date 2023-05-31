import type didInsert from './modifiers/did-insert';
import type didUpdate from './modifiers/did-update';
import type willDestroy from './modifiers/will-destroy';

export default interface RenderModifiersRegistry {
  'did-insert': typeof didInsert;
  'did-update': typeof didUpdate;
  'will-destroy': typeof willDestroy;
}
