import type { ModifierLike } from '@glint/template';

export type ModifierCallback = (
  element: Element,
  positional: unknown[],
  named: Record<string, unknown>,
) => void;

export interface ModifierState {
  element: Element | null;
}

export interface ModifierArgs {
  positional: [ModifierCallback, ...unknown[]];
  named: Record<string, unknown>;
}

export type RenderModifierType = abstract new <
  El extends Element,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Args extends Array<any>,
>() => InstanceType<
  ModifierLike<{
    Element: El;
    Args: {
      Positional: [
        callback: (element: El, args: Args) => unknown,
        ...callbackArgs: Args,
      ];
    };
  }>
>;
