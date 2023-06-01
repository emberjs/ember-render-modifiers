import { RenderModifier } from '../-private';

declare const didUpdate: abstract new <
  El extends Element,
  Args extends Array<any>
>() => RenderModifier<El, Args>;

export default didUpdate;
