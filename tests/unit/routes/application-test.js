import { module, test } from 'qunit';
import { setupTest } from 'ember-glob-import-demo/tests/helpers';

module('Unit | Route | application', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:application');
    assert.ok(route);
  });
});
