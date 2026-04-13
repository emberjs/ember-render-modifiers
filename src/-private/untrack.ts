import * as glimmerValidator from '@glimmer/validator';

// Ember apps can provide @glimmer/validator through different module shapes
// depending on ember-source version and bundling mode. We centralize the
// resolution logic here so modifiers can always call a single untrack API.

type UntrackCallback = () => void;
type Untrack = (callback: UntrackCallback) => void;
type ValidatorRequire = (moduleName: string) => ValidatorModule;

interface ValidatorModule {
  untrack?: unknown;
  beginUntrackFrame?: unknown;
  endUntrackFrame?: unknown;
}

function getCallable<T extends (...args: never[]) => unknown>(
  target: unknown,
  property: string,
): T | undefined {
  const value = (target as Record<string, unknown>)[property];

  return typeof value === 'function' ? (value as T) : undefined;
}

function tryRequire(maybeRequire: ValidatorRequire | undefined) {
  if (typeof maybeRequire !== 'function') {
    return undefined;
  }

  try {
    return maybeRequire('@glimmer/validator');
  } catch {
    return undefined;
  }
}

function resolveValidatorModule(): ValidatorModule {
  const importedModule = glimmerValidator as ValidatorModule;
  const importedUntrack = getCallable<Untrack>(importedModule, 'untrack');
  const importedBeginUntrackFrame = getCallable<() => void>(
    importedModule,
    'beginUntrackFrame',
  );

  if (importedUntrack || importedBeginUntrackFrame) {
    // Modern ESM shape: use the imported namespace directly.
    return importedModule;
  }

  const globalWithEmber = globalThis as {
    Ember?: {
      __loader?: {
        require?: (moduleName: string) => ValidatorModule;
      };
    };
    require?: ValidatorRequire;
    requirejs?: ValidatorRequire;
  };

  const requireCandidates: Array<ValidatorRequire | undefined> = [
    globalWithEmber.Ember?.__loader?.require,
    globalWithEmber.require,
    globalWithEmber.requirejs,
  ];

  for (const maybeRequire of requireCandidates) {
    const module = tryRequire(maybeRequire);

    if (module) {
      // Older or compat builds: resolve from runtime module loader.
      return module;
    }
  }

  return {};
}

export const untrack: Untrack = (() => {
  const validator = resolveValidatorModule();
  const moduleUntrack = getCallable<Untrack>(validator, 'untrack');

  if (moduleUntrack) {
    return moduleUntrack;
  }

  const beginUntrackFrame = getCallable<() => void>(
    validator,
    'beginUntrackFrame',
  );
  const endUntrackFrame = getCallable<() => void>(validator, 'endUntrackFrame');

  if (beginUntrackFrame && endUntrackFrame) {
    // Some validator versions expose frame primitives instead of untrack.
    return (callback: UntrackCallback) => {
      beginUntrackFrame();

      try {
        callback();
      } finally {
        endUntrackFrame();
      }
    };
  }

  // Last resort for very old or unexpected runtime shapes.
  return (callback: UntrackCallback) => callback();
})();
