import Component from '@ember/component';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { settled } from '@ember/test-helpers';

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

  test('it should invoke UI re-rendering when changing tracked properties', async function(assert) {
    this.owner.register(
      'component:test-component',
      Component.extend({
        showMessage: true,

        actions: {
          toggle() {
            this.set('showMessage', false);
          },
        },
      })
    );

    this.owner.register(
      'template:components/test-component',
      hbs`
        {{#if this.showMessage}}
          <div data-dummy>Hello Ember</div>
        {{/if}}
        {{#if @shouldShow}}
          <div {{will-destroy (action "toggle")}}></div>
        {{/if}}
      `
    );

    this.set('show', true);

    await render(hbs`<TestComponent @shouldShow={{this.show}}></TestComponent>`);
    assert.dom('[data-dummy]').exists();

    // trigger destroying. should remove [data-dummy] element.
    this.set('show', false);
    await settled();

    assert.dom('[data-dummy]').doesNotExist();
  });
});
