import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { ensureSafeComponent } from '@embroider/util';

// We want to use ember classic components in this test
// So that we can test all the way back to ember-lts-2.18
// eslint-disable-next-line ember/no-classic-components
import Component from '@ember/component';

module('Integration | Modifier | did-insert', function (hooks) {
  setupRenderingTest(hooks);

  test('it basically works', async function (assert) {
    assert.expect(2);

    this.someMethod = (element) => {
      assert.strictEqual(element.tagName, 'DIV', 'correct element tagName');
      assert.dom(element).hasAttribute('data-foo', 'some-thing');
    };
    await render(
      hbs`<div data-foo="some-thing" {{did-insert this.someMethod}}></div>`,
    );
  });

  test('it can accept arguments', async function (assert) {
    assert.expect(4);

    this.someMethod = (element, positional, named) => {
      assert.strictEqual(element.tagName, 'DIV', 'correct element tagName');
      assert.dom(element).hasAttribute('data-foo', 'some-thing');

      assert.namedArgsEqual(named, { some: 'hash-value' }, 'named args match');
      assert.deepEqual(
        positional,
        ['some-positional-value'],
        'positional args match',
      );
    };

    await render(
      hbs`<div data-foo="some-thing" {{did-insert this.someMethod "some-positional-value" some="hash-value"}}></div>`,
    );
  });

  test('it is not invoked again when arguments change', async function (assert) {
    assert.expect(4);

    this.someMethod = (element, positional, named) => {
      assert.strictEqual(element.tagName, 'DIV', 'correct element tagName');
      assert.dom(element).hasAttribute('data-foo', 'some-thing');

      assert.namedArgsEqual(named, {}, 'named args match');
      assert.deepEqual(positional, ['initial'], 'positional args match');
    };

    this.set('firstArg', 'initial');
    await render(
      hbs`<div data-foo="some-thing" {{did-insert this.someMethod this.firstArg}}></div>`,
    );
    this.set('firstArg', 'updated');
  });

  test('adding class on insert (RFC example)', async function (assert) {
    this.owner.register(
      'component:sometimes-fades-in',
      // eslint-disable-next-line ember/no-classic-classes
      Component.extend({}),
    );

    // eslint-disable-next-line ember/no-classic-classes
    const SometimesFadesIn = Component.extend({
      tagName: '',
      layout: hbs`
      {{#if this.shouldShow}}
        <div {{did-insert this.fadeIn}} class="alert">
          {{yield}}
        </div>
      {{/if}}`,
      fadeIn(element) {
        element.classList.add('fade-in');
      },
    });

    this.sometimesFadesIn = ensureSafeComponent(SometimesFadesIn, this);

    await render(hbs`
      <this.sometimesFadesIn @shouldShow={{true}}/>
    `);

    assert.dom('.alert').hasClass('fade-in');
  });
});
