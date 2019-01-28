import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Modifier | will-destroy', function(hooks) {
  setupRenderingTest(hooks);

  test('it basically works', async function(assert) {
    assert.expect(2);

    this.someMethod = element => {
      assert.equal(element.tagName, 'DIV', 'correct element tagName');
      assert.dom(element).hasAttribute('data-foo', 'some-thing');
    };
    this.set('show', true);

    await render(
      hbs`{{#if show}}<div data-foo="some-thing" {{will-destroy this.someMethod}}></div>{{/if}}`
    );

    // trigger destroy
    this.set('show', false);
  });

  test('it can accept arguments', async function(assert) {
    assert.expect(4);

    this.someMethod = (element, positional, named) => {
      assert.equal(element.tagName, 'DIV', 'correct element tagName');
      assert.dom(element).hasAttribute('data-foo', 'some-thing');

      assert.namedArgsEqual(named, { some: 'hash-value' }, 'named args match');
      assert.deepEqual(positional, ['some-positional-value'], 'positional args match');
    };

    this.set('show', true);

    await render(
      hbs`{{#if show}}<div data-foo="some-thing" {{will-destroy this.someMethod "some-positional-value" some="hash-value"}}></div>{{/if}}`
    );

    // trigger destroy
    this.set('show', false);
  });
});
