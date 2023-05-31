export interface RenderModifierSignature<El extends Element, Args extends Array<any>> {
  Args: {
    Positional: [
      callback: (element: El, ...args: Args) => unknown,
      ...callbackArgs: Args
    ];
  };
}
