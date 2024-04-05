import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-glob-import-demo/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | foo/a', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Foo::A />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <Foo::A>
        template block text
      </Foo::A>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
