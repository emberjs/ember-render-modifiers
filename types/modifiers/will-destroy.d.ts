import { RenderModifier } from '../-private';

declare const willDestroy: abstract new <
  El extends Element,
  Args extends Array<any>
>() => RenderModifier<El, Args>;

export default willDestroy;
