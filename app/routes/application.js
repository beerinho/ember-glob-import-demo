import Route from '@ember/routing/route';
const stuff = import.meta.glob('ember-glob-import-demo/components/foo/*', { eager: true });
console.log(stuff)

export default class ApplicationRoute extends Route { }
