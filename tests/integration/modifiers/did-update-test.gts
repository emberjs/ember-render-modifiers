import { module, test } from 'qunit';
import { tracked } from '@glimmer/tracking';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { didUpdate } from '@ember/render-modifiers';

module('Integration | Modifier | did-update', function (hooks) {
  setupRenderingTest(hooks);

  test('it basically works', async function (assert) {
    assert.expect(4);

    const someMethod = (
      element: Element,
      positional: unknown[],
      named?: Record<string, unknown>,
    ) => {
      assert.strictEqual(element.tagName, 'DIV', 'correct element tagName');
      assert.dom(element as HTMLElement).hasAttribute('data-foo', 'some-thing');

      assert.deepEqual(named, {}, 'named args match');
      assert.deepEqual(positional, ['update'], 'positional args match');
    };

    class State {
      @tracked boundValue = 'initial';
    }
    const state = new State();

    await render(
      <template>
        <div
          data-foo="some-thing"
          {{didUpdate someMethod state.boundValue}}
        ></div>
      </template>,
    );

    state.boundValue = 'update';
    await settled();
  });

  test('it consumes tracked properties without re-invoking', async function (assert) {
    class Context {
      @tracked boundValue = 'initial';
      @tracked secondaryValue = 'initial';
    }

    const context = new Context();

    const someMethod = () => {
      // This assertion works as an assurance that we render before `secondaryValue` changes,
      // and consumes its tag to ensure reading tracked properties won't re-trigger the modifier
      assert.strictEqual(context.secondaryValue, 'initial');
    };

    await render(
      <template>
        <div {{didUpdate someMethod context.boundValue}}></div>
      </template>,
    );

    context.boundValue = 'update';
    await settled();
    context.secondaryValue = 'update';
    await settled();
  });
});
