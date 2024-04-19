'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const path = require('path');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    babel: {
      plugins: [
        require.resolve(
          path.join(__dirname, 'babel-plugin-transform-ember-meta-glob.cjs')
        ),
      ],
    },
  });

  return app.toTree();
};
