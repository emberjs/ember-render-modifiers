import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, setupOnerror } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Modifier | did-update', function (hooks) {
  setupRenderingTest(hooks);

  test('it basically works', async function (assert) {
    assert.expect(4);

    this.someMethod = (element, positional, named) => {
      assert.equal(element.tagName, 'DIV', 'correct element tagName');
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

  test('provides a useful error on install', async function (assert) {
    assert.expect(1);

    // Setup error capturing
    setupOnerror(function (err) {
      assert.equal(
        err.toString(),
        `TypeError: did-update expected a function, instead received "undefined"`
      );
    });

    await render(hbs`
      <div {{did-update this.nonExistentMethod}}></div>
    `);

    // Reset error capturing
    setupOnerror();
  });

  test('provides a useful error on update', async function (assert) {
    assert.expect(1);

    // Start with a valid function so that install works
    this.set('nonExistentMethod', () => {});

    // Setup error capturing
    setupOnerror(function (err) {
      assert.equal(
        err.toString(),
        `TypeError: did-update expected a function, instead received "undefined"`
      );
    });

    await render(hbs`
      <div {{did-update this.nonExistentMethod}}></div>
    `);

    // Remove the function to trigger an error on update
    this.set('nonExistentMethod', undefined);

    // Reset error capturing
    setupOnerror();
  });
});
