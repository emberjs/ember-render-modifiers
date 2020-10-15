import { gte } from 'ember-compatibility-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Modifier | did-update', function(hooks) {
  setupRenderingTest(hooks);

  if (gte('3.22.0')) {
    module('capabilities(3.22)', function() {
      test('it basically works', async function(assert) {
        assert.expect(5);

        class Context {
          @tracked boundValue = 'initial';
        }


        this.setProperties({
          ctx: new Context() ,
          someMethod(element, positional, named) {
            assert.equal(element.tagName, 'DIV', 'correct element tagName');
            assert.dom(element).hasAttribute('data-foo', 'some-thing');

            assert.namedArgsEqual(named, {}, 'named args match');
            assert.equal(positional.length, 1);
            assert.equal(positional[0], 'update', 'positional args match');
          },
        });


        await render(
          hbs`
            <div
              data-foo="some-thing"
              {{did-update this.someMethod this.ctx.boundValue}}
            >
            </div>`
        );

        this.set('ctx.boundValue', 'update');

        await settled();
      });
    });
  } else {
    module('capabilities(3.13)', function() {
      test('it basically works', async function(assert) {
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
  }
});
