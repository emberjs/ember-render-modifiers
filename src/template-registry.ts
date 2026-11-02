// Easily allow apps, which are not yet using strict mode templates, to consume your Glint types, by importing this file.
// Add all your components, helpers and modifiers to the template registry here, so apps don't have to do this.
// See https://typed-ember.gitbook.io/glint/environments/ember/authoring-addons

import type didInsert from './modifiers/did-insert.ts';
import type didUpdate from './modifiers/did-update.ts';
import type willDestroy from './modifiers/will-destroy.ts';

export default interface RenderModifiersRegistry {
  'did-insert': typeof didInsert;
  'did-update': typeof didUpdate;
  'will-destroy': typeof willDestroy;
}
