





## v2.1.0 (2023-06-01)

#### :rocket: Enhancement
* [#74](https://github.com/emberjs/ember-render-modifiers/pull/74) Publish Glint-ready type definitions ([@chriskrycho](https://github.com/chriskrycho), [@vlascik](https://github.com/vlascik))
* [#70](https://github.com/emberjs/ember-render-modifiers/pull/70) Add support for Ember v5 ([@NullVoxPopuli](https://github.com/NullVoxPopuli))

#### :house: Internal
* [#72](https://github.com/emberjs/ember-render-modifiers/pull/72) Add @ember/string ([@RobbieTheWagner](https://github.com/RobbieTheWagner))
* [#71](https://github.com/emberjs/ember-render-modifiers/pull/71) Use node 14 for CI ([@RobbieTheWagner](https://github.com/RobbieTheWagner))

#### Committers: 3
- Chris Krycho ([@chriskrycho](https://github.com/chriskrycho))
- Robbie Wagner ([@RobbieTheWagner](https://github.com/RobbieTheWagner))
- [@NullVoxPopuli](https://github.com/NullVoxPopuli)

## v2.0.5 (2023-01-11)

#### :bug: Bug Fix
* [#68](https://github.com/emberjs/ember-render-modifiers/pull/68) Widen peer range for ember-source to include all of v4 ([@NullVoxPopuli](https://github.com/NullVoxPopuli))

#### Committers: 1
- [@NullVoxPopuli](https://github.com/NullVoxPopuli)

## v2.0.4 (2022-02-01)

#### :bug: Bug Fix
* [#59](https://github.com/emberjs/ember-render-modifiers/pull/59) Update embroider to v1.0.0 ([@jrjohnson](https://github.com/jrjohnson))

#### :house: Internal
* [#60](https://github.com/emberjs/ember-render-modifiers/pull/60) ember-cli 4.1.0 ([@rwwagner90](https://github.com/rwwagner90))

#### Committers: 2
- Jon Johnson ([@jrjohnson](https://github.com/jrjohnson))
- Robert Wagner ([@rwwagner90](https://github.com/rwwagner90))

## v2.0.3 (2022-01-13)

#### :bug: Bug Fix
* [#58](https://github.com/emberjs/ember-render-modifiers/pull/58) dependencySatisfies only reliable with a peerDep ([@ef4](https://github.com/ef4))

#### Committers: 1
- Edward Faulkner ([@ef4](https://github.com/ef4))

## v2.0.2 (2021-12-14)

#### :house: Internal
* [#57](https://github.com/emberjs/ember-render-modifiers/pull/57) Fully migrate to @embroider/macros ([@rwjblue](https://github.com/rwjblue))

#### Committers: 1
- Robert Jackson ([@rwjblue](https://github.com/rwjblue))


## v2.0.1 (2021-12-14)

#### :bug: Bug Fix
* [#54](https://github.com/emberjs/ember-render-modifiers/pull/54) Ensure `did-update` only re-runs when arguments change (avoid recomputing when tracked properties update within callback) ([@mogstad](https://github.com/mogstad))

#### :memo: Documentation
* [#55](https://github.com/emberjs/ember-render-modifiers/pull/55) Migrate examples to use `@action` ([@bekzod](https://github.com/bekzod))
* [#56](https://github.com/emberjs/ember-render-modifiers/pull/56) Fixes code examples in README ([@skaterdav85](https://github.com/skaterdav85))

#### Committers: 3
- Bjarne Mogstad ([@mogstad](https://github.com/mogstad))
- David Tang ([@skaterdav85](https://github.com/skaterdav85))
- [@bekzod](https://github.com/bekzod)


## v2.0.0 (2021-10-06)

#### :boom: Breaking Change
* [#46](https://github.com/emberjs/ember-render-modifiers/pull/46) Update Ember to v3.28.0, drop node 10 support ([@SergeAstapov](https://github.com/SergeAstapov))
* [#40](https://github.com/emberjs/ember-render-modifiers/pull/40) Update ember to v3.27.0, drop support for node < 10 ([@kiwiupover](https://github.com/kiwiupover))

#### :rocket: Enhancement
* [#42](https://github.com/emberjs/ember-render-modifiers/pull/42) Update manager capabilities to 3.22 to fix deprecation in Ember 3.26+ ([@SergeAstapov](https://github.com/SergeAstapov))
* [#29](https://github.com/emberjs/ember-render-modifiers/pull/29) Use destructuring in `did-insert` modifier to allow better IDE integration (template argument hints) ([@patricklx](https://github.com/patricklx))

#### :house: Internal
* [#48](https://github.com/emberjs/ember-render-modifiers/pull/48) Update release it ([@rwwagner90](https://github.com/rwwagner90))
* [#43](https://github.com/emberjs/ember-render-modifiers/pull/43) Fix deprecations in tests ([@SergeAstapov](https://github.com/SergeAstapov))
* [#44](https://github.com/emberjs/ember-render-modifiers/pull/44) Use ember-auto-import 2 ([@rwwagner90](https://github.com/rwwagner90))

#### Committers: 6
- Dave Laird ([@kiwiupover](https://github.com/kiwiupover))
- Jordan Hawker ([@elwayman02](https://github.com/elwayman02))
- Robert Wagner ([@rwwagner90](https://github.com/rwwagner90))
- Sergey Astapov ([@SergeAstapov](https://github.com/SergeAstapov))
- [@NullVoxPopuli](https://github.com/NullVoxPopuli)
- [@patricklx](https://github.com/patricklx)


## v1.0.2 (2019-10-03)

#### :bug: Bug Fix

- [#16](https://github.com/emberjs/ember-render-modifiers/pull/16) Disable modifier auto-tracking. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 1

- Robert Jackson ([@rwjblue](https://github.com/rwjblue))

## v1.0.1 (2019-08-23)

#### :bug: Bug Fix

- [#13](https://github.com/emberjs/ember-render-modifiers/pull/13) Avoid modifier manager capabilities deprecation ([@wongpeiyi](https://github.com/wongpeiyi))

#### :memo: Documentation

- [#9](https://github.com/emberjs/ember-render-modifiers/pull/9) Update docs to use the @action decorator ([@GavinJoyce](https://github.com/GavinJoyce))
- [#8](https://github.com/emberjs/ember-render-modifiers/pull/8) `{{did-insert}}`, `{{did-update}}` and `{{will-destroy}}` API docs ([@GavinJoyce](https://github.com/GavinJoyce))
- [#7](https://github.com/emberjs/ember-render-modifiers/pull/7) Fixup bugs in README examples ([@GavinJoyce](https://github.com/GavinJoyce))
- [#3](https://github.com/emberjs/ember-render-modifiers/pull/3) Begin fleshing out README with info from emberjs/rfcs#415. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 4

- Gavin Joyce ([@GavinJoyce](https://github.com/GavinJoyce))
- Ilya Radchenko ([@knownasilya](https://github.com/knownasilya))
- Robert Jackson ([@rwjblue](https://github.com/rwjblue))
- Wong Pei Yi ([@wongpeiyi](https://github.com/wongpeiyi))

## v1.0.0 (2019-01-29)

#### :rocket: Enhancement

- [#1](https://github.com/emberjs/ember-render-modifiers/pull/1) Initial implementation of emberjs/rfcs#415 ([@rwjblue](https://github.com/rwjblue))

#### Committers: 1

- Robert Jackson ([@rwjblue](https://github.com/rwjblue))
