import Route from '@ember/routing/route';
const foo_bar = import.meta.glob('app/components/foo/**', {
  eager: true,
});

// Cannot use 'import.meta' outside a module

export default class ApplicationRoute extends Route {
}
