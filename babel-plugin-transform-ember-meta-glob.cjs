const { globSync } = require('glob')

module.exports = function (babel) {
  const { types: t } = babel;
  // PICKUP - VariableDeclaration is the visitor we need to access to gain the variable name so that we can reassign it after getting the files https://github.com/OpenSourceRaidGuild/babel-vite/blob/main/packages/babel-plugin-transform-vite-meta-glob/src/index.ts
  // We want the same output as shown here - https://rfcs.emberjs.com/id/0939-import-glob - under "Eager mode"
  // https://astexplorer.net/#/gist/14696755417f9d41c8c2bd72c187b0da/21a2d01c90248e6cd2e024466aa50e9bd3a12a89
  return {
    name: "ember-meta-glob", // not required
    visitor: {
      CallExpression(path) {
        if (
          path.node.callee?.object?.meta?.name === "import" &&
          path.node.callee.object.property?.name === "meta" &&
          path.node.callee.property?.name === "glob"
        ) {
          const glob = () => ["./widgets/first.js", "./widgets/second.js"];
          const files = glob(path.node.arguments[0].value);
          console.log(files);
          const isEager = (path.node.arguments[1] && path.node.arguments[1].properties[0].key.name === "eager" && path.node.arguments[1].properties[0].value.value) || false;
          if (isEager) {
            console.log('here', path.node.arguments[0].value)
            const globPaths = globSync(path.node.arguments[0].value)
              .sort()
              .map((globPath) => globPath.replace(/\\/g, '/'))
            console.log(globPaths)
          }
          const newStuff = files.map((file) => {
            return t.objectProperty(
              t.stringLiteral(file),
              t.arrowFunctionExpression(
                [],
                t.callExpression(t.identifier("import"), [
                  t.stringLiteral(file),
                ])
              )
            );
          });

          path.replaceWith(t.objectExpression(newStuff));
        }
      },
    },
  };
};

// We need "Eager mode" from https://rfcs.emberjs.com/id/0939-import-glob
// Check out the eager stuff here - https://github.com/OpenSourceRaidGuild/babel-vite/blob/main/packages/babel-plugin-transform-vite-meta-glob/src/index.ts

// const widgets = import.meta.glob('./widgets/*.js');
// const widgets = {
//   './widgets/first.js': () => import('./widgets/first.js'),
//   './widgets/second.js': () => import('./widgets/second.js'),
// }

// const eagerWidgets = import.meta.glob('./widgets/*.js', {eager: true})
// import _w0 from './widgets/first.js';
// import _w1 from './widgets/second.js';
// const eagerWidgets = {
//   './widgets/first.js': _w0,
//   './widgets/second.js': _w1,
// }
