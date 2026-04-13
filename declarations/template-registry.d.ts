import type didInsert from './modifiers/did-insert.ts';
import type didUpdate from './modifiers/did-update.ts';
import type willDestroy from './modifiers/will-destroy.ts';
export default interface RenderModifiersRegistry {
    'did-insert': typeof didInsert;
    'did-update': typeof didUpdate;
    'will-destroy': typeof willDestroy;
}
//# sourceMappingURL=template-registry.d.ts.map