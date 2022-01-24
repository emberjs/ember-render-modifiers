import { module, test } from 'qunit';
import { tracked } from '@glimmer/tracking';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { macroCondition, dependencySatisfies } from '@embroider/macros';

module('Integration | Modifier | did-update', function (hooks) {
  setupRenderingTest(hooks);

  test('it basically works', async function (assert) {
    assert.expect(4);

    this.someMethod = (element, positional, named) => {
      assert.strictEqual(element.tagName, 'DIV', 'correct element tagName');
      assert.dom(element).hasAttribute('data-foo', 'some-thing');

      assert.namedArgsEqual(named, {}, 'named args match');
      assert.deepEqual(positional, ['update'], 'positional args match');
    };

    this.set('boundValue', 'initial');
    await render(
      hbs`<div data-foo="some-thing" {{did-update this.someMethod this.boundValue}}></div>`
    );

    this.set('boundValue', 'update');
  });

  // only run the next test where @tracked is present
  if (macroCondition(dependencySatisfies('ember-source', '>= 3.12.0'))) {
    test('it consumes tracked properties without re-invoking', async function (assert) {
      assert.expect(1);

      class Context {
        @tracked boundValue = 'initial';
        @tracked secondaryValue = 'initial';
      }

      this.context = new Context();

      this.someMethod = () => {
        // This assertion works as an assurance that we render before `secondaryValue` changes,
        // and consumes its tag to ensure reading tracked properties won't re-trigger the modifier
        assert.strictEqual(this.context.secondaryValue, 'initial');
      };

      await render(hbs`<div {{did-update this.someMethod this.context.boundValue}}></div>`);

      this.context.boundValue = 'update';
      await settled();
      this.context.secondaryValue = 'update';
      await settled();
    });
  }
});
