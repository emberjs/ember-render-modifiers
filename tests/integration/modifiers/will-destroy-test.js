import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, setupOnerror } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Modifier | will-destroy', function (hooks) {
  setupRenderingTest(hooks);

  test('it basically works', async function (assert) {
    assert.expect(2);

    this.someMethod = (element) => {
      assert.equal(element.tagName, 'DIV', 'correct element tagName');
      assert.dom(element).hasAttribute('data-foo', 'some-thing');
    };
    this.set('show', true);

    await render(
      hbs`{{#if this.show}}<div data-foo="some-thing" {{will-destroy this.someMethod}}></div>{{/if}}`
    );

    // trigger destroy
    this.set('show', false);
  });

  test('it can accept arguments', async function (assert) {
    assert.expect(4);

    this.someMethod = (element, positional, named) => {
      assert.equal(element.tagName, 'DIV', 'correct element tagName');
      assert.dom(element).hasAttribute('data-foo', 'some-thing');

      assert.namedArgsEqual(named, { some: 'hash-value' }, 'named args match');
      assert.deepEqual(positional, ['some-positional-value'], 'positional args match');
    };

    this.set('show', true);

    await render(
      hbs`{{#if this.show}}<div data-foo="some-thing" {{will-destroy this.someMethod "some-positional-value" some="hash-value"}}></div>{{/if}}`
    );

    // trigger destroy
    this.set('show', false);
  });

  test('provides a useful error on install', async function (assert) {
    assert.expect(1);

    // Setup error capturing
    setupOnerror(function (err) {
      assert.equal(
        err.toString(),
        `TypeError: did-destroy expected a function, instead received "undefined"`
      );
    });

    await render(hbs`
      <div {{will-destroy this.nonExistentMethod}}></div>
    `);

    // Prevent double error on test teardown
    this.set('nonExistentMethod', () => {});

    // Reset error capturing
    setupOnerror();
  });

  test('provides a useful error on destroy', async function (assert) {
    assert.expect(1);

    // Start with a valid function so that install works
    this.set('nonExistentMethod', () => {});

    // Setup error capturing
    setupOnerror(function (err) {
      assert.equal(
        err.toString(),
        `TypeError: did-destroy expected a function, instead received "undefined"`
      );
    });

    this.set('show', true);
    await render(hbs`
      {{#if this.show}}
        <div {{will-destroy this.nonExistentMethod}}></div>
      {{/if}}
    `);

    // Remove the function to trigger an error on destroy
    this.setProperties({
      nonExistentMethod: undefined,
      show: false,
    });

    // Reset error capturing
    setupOnerror();
  });
});
