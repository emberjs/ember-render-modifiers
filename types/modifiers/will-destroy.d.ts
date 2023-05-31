import { ModifierLike } from '@glint/template';
import { RenderModifierSignature } from '../-private';

declare const willDestroy: abstract new <
  El extends Element,
  Args extends Array<any>
>() => InstanceType<ModifierLike<RenderModifierSignature<El, Args>>>;

export default willDestroy;
