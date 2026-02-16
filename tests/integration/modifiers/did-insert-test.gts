import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { didInsert } from '@ember/render-modifiers';

module('Integration | Modifier | did-insert', function (hooks) {
  setupRenderingTest(hooks);

  test('it basically works', async function (assert) {
    assert.expect(2);

    const someMethod = (element: Element) => {
      assert.strictEqual(element.tagName, 'DIV', 'correct element tagName');
      assert.dom(element as HTMLElement).hasAttribute('data-foo', 'some-thing');
    };

    await render(
      <template>
        <div data-foo="some-thing" {{didInsert someMethod}}></div>
      </template>,
    );
  });

  test('it can accept arguments', async function (assert) {
    assert.expect(4);

    const someMethod = (
      element: Element,
      positional: unknown[],
      named?: Record<string, unknown>,
    ) => {
      assert.strictEqual(element.tagName, 'DIV', 'correct element tagName');
      assert.dom(element as HTMLElement).hasAttribute('data-foo', 'some-thing');

      assert.deepEqual(named, { some: 'hash-value' }, 'named args match');
      assert.deepEqual(
        positional,
        ['some-positional-value'],
        'positional args match',
      );
    };

    await render(
      <template>
        <div
          data-foo="some-thing"
          {{didInsert someMethod "some-positional-value" some="hash-value"}}
        ></div>
      </template>,
    );
  });

  test('it is not invoked again when arguments change', async function (assert) {
    assert.expect(4);

    const firstArg = 'initial';

    const someMethod = (
      element: Element,
      positional: unknown[],
      named?: Record<string, unknown>,
    ) => {
      assert.strictEqual(element.tagName, 'DIV', 'correct element tagName');
      assert.dom(element as HTMLElement).hasAttribute('data-foo', 'some-thing');

      assert.deepEqual(named, {}, 'named args match');
      assert.deepEqual(positional, ['initial'], 'positional args match');
    };

    await render(
      <template>
        <div data-foo="some-thing" {{didInsert someMethod firstArg}}></div>
      </template>,
    );
  });
});
