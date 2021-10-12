export default function assertFunction(modifierName, maybeFunction) {
  if (typeof maybeFunction === 'function') return;

  throw new TypeError(`${modifierName} expected a function, instead received "${maybeFunction}"`);
}
