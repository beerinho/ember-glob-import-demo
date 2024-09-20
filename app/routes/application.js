import Route from '@ember/routing/route';
const foo_bar = import.meta.glob('../components/foo/**', {
  eager: true,
});

console.log(foo_bar);

export default class ApplicationRoute extends Route {}
