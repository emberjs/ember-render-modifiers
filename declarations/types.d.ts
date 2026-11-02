import type { ModifierLike } from '@glint/template';
export type ModifierCallback = (element: Element, positional: unknown[], named: Record<string, unknown>) => void;
export interface ModifierState {
    element: Element | null;
}
export interface ModifierArgs {
    positional: [ModifierCallback, ...unknown[]];
    named: Record<string, unknown>;
}
export type RenderModifierType = abstract new <El extends Element, Args extends Array<any>>() => InstanceType<ModifierLike<{
    Element: El;
    Args: {
        Positional: [
            callback: (element: El, args: Args) => unknown,
            ...callbackArgs: Args
        ];
    };
}>>;
//# sourceMappingURL=types.d.ts.map