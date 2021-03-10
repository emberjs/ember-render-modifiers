import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Component from '@ember/component';

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

      assert.namedArgsEqual(named, { some: 'hash-value' }, 'named args match');
      assert.deepEqual(positional, ['some-positional-value'], 'positional args match');
    };

    await render(
      hbs`<div data-foo="some-thing" {{did-insert this.someMethod "some-positional-value" some="hash-value"}}></div>`
    );
  });

  test('it works with fn helper', async function(assert) {
    assert.expect(3);

    this.someMethod = (mayBeFoo, element, positional) => {
      assert.equal(mayBeFoo, 'foo', 'closure is working as expected');
      assert.equal(element.tagName, 'DIV', 'correct element tagName');
      assert.equal(positional.length, 0, 'no positional arguments should exists');
    };

    await render(hbs`<div {{did-insert (fn this.someMethod "foo")}}></div>`);
  });

  test('it is not invoked again when arguments change', async function(assert) {
    assert.expect(4);

    this.someMethod = (element, positional, named) => {
      assert.equal(element.tagName, 'DIV', 'correct element tagName');
      assert.dom(element).hasAttribute('data-foo', 'some-thing');

      assert.namedArgsEqual(named, {}, 'named args match');
      assert.deepEqual(positional, ['initial'], 'positional args match');
    };

    this.set('firstArg', 'initial');
    await render(
      hbs`<div data-foo="some-thing" {{did-insert this.someMethod this.firstArg}}></div>`
    );
    this.set('firstArg', 'updated');
  });

  test('adding class on insert (RFC example)', async function(assert) {
    this.owner.register(
      'component:sometimes-fades-in',
      Component.extend({
        fadeIn(element) {
          element.classList.add('fade-in');
        },
      })
    );

    this.owner.register(
      'template:components/sometimes-fades-in',
      hbs`
        {{#if shouldShow}}
          <div {{did-insert this.fadeIn}} class="alert">
            {{yield}}
          </div>
        {{/if}}
      `
    );

    await render(hbs`{{sometimes-fades-in shouldShow=true}}`);

    assert.dom('.alert').hasClass('fade-in');
  });
});
