import { module, test } from 'qunit';
import { visit, click, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | will destroy', function(hooks) {
  setupApplicationTest(hooks);

  test('transitioning from /will-destroy does not throw error', async function(assert) {
    await visit('/will-destroy');
    assert.equal(currentURL(), '/will-destroy');

    await click('a');
    assert.equal(currentURL(), '/');
  });
});
