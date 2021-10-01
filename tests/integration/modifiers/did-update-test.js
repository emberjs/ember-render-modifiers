import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
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
});
