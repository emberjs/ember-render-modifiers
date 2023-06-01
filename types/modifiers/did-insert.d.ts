import { RenderModifier } from '../-private';

declare const didInsert: abstract new <
  El extends Element,
  Args extends Array<any>
>() => RenderModifier<El, Args>;

export default didInsert;
