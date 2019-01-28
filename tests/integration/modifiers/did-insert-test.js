import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Modifier | did-insert', function(hooks) {
  setupRenderingTest(hooks);

  test('it basically works', async function(assert) {
    assert.expect(2);

    this.someMethod = element => {
      assert.equal(element.tagName, 'DIV', 'correct element tagName');
      assert.dom(element).hasAttribute('data-foo', 'some-thing');
    };
    await render(hbs`<div data-foo="some-thing" {{did-insert this.someMethod}}></div>`);
  });

  test('it can accept arguments', async function(assert) {
    assert.expect(4);

    this.someMethod = (element, positional, named) => {
      assert.equal(element.tagName, 'DIV', 'correct element tagName');
      assert.dom(element).hasAttribute('data-foo', 'some-thing');

      assert.deepEqual(named, { some: 'hash-value' }, 'named args match');
      assert.deepEqual(positional, ['some-positional-value'], 'positional args match');
    };

    await render(
      hbs`<div data-foo="some-thing" {{did-insert this.someMethod "some-positional-value" some="hash-value"}}></div>`
    );
  });

  test('it is not invoked again when arguments change', async function(assert) {
    assert.expect(4);

    this.someMethod = (element, positional, named) => {
      assert.equal(element.tagName, 'DIV', 'correct element tagName');
      assert.dom(element).hasAttribute('data-foo', 'some-thing');

      assert.deepEqual(named, {}, 'named args match');
      assert.deepEqual(positional, ['initial'], 'positional args match');
    };

    this.set('firstArg', 'initial');
    await render(
      hbs`<div data-foo="some-thing" {{did-insert this.someMethod this.firstArg}}></div>`
    );
    this.set('firstArg', 'updated');
  });
});
