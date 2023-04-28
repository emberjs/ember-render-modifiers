import Modifier from 'ember-modifier';

interface RenderModifierSignature<Element extends HTMLElement | SVGElement, Args extends any[]> {
    Args: { Positional: [(element: Element, args: Args) => any, ...Args] };
    Element: Element;
}

export declare class RenderModifier<Element extends HTMLElement | SVGElement, Args extends any[]> extends Modifier<
    RenderModifierSignature<Element, Args>
> {}
