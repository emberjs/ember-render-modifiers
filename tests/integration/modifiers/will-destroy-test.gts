import { module, test } from 'qunit';
import { tracked } from '@glimmer/tracking';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { willDestroy } from '#src/index.ts';

module('Integration | Modifier | will-destroy', function (hooks) {
  setupRenderingTest(hooks);

  test('it basically works', async function (assert) {
    assert.expect(2);

    const someMethod = (element: Element) => {
      assert.strictEqual(element.tagName, 'DIV', 'correct element tagName');
      assert.dom(element as HTMLElement).hasAttribute('data-foo', 'some-thing');
    };

    class State {
      @tracked show = true;
    }
    const state = new State();

    await render(
      <template>
        {{#if state.show}}
          <div data-foo="some-thing" {{willDestroy someMethod}}></div>
        {{/if}}
      </template>,
    );

    // trigger destroy
    state.show = false;
    await settled();
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

    class State {
      @tracked show = true;
    }
    const state = new State();

    await render(
      <template>
        {{#if state.show}}
          <div
            data-foo="some-thing"
            {{willDestroy someMethod "some-positional-value" some="hash-value"}}
          ></div>
        {{/if}}
      </template>,
    );

    // trigger destroy
    state.show = false;
    await settled();
  });
});
