import { ModifierLike } from '@glint/template';

export type RenderModifier<El extends Element, Args extends Array<any>> = InstanceType<
  ModifierLike<{
    Element: El;
    Args: {
      Positional: [callback: (element: El, args: Args) => unknown, ...callbackArgs: Args];
    };
  }>
>;
