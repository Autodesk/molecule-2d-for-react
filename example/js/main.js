import Backbone from 'backbone';
import ExampleSettingsView from './example_settings_view';
import { Nbmolviz2dModel, Nbmolviz2dView } from '../../src/main.js';
import bipyridine from './bipyridine';

Backbone.sync = () => {};

const model = new Nbmolviz2dModel({
  graph: bipyridine,
});
const view = new Nbmolviz2dView({
  model,
  el: document.querySelector('.nbmolviz2d'),
});
view.render();

// Set up example settings controls
const settingsView = new ExampleSettingsView({
  model,
});
document.querySelector('.data').appendChild(settingsView.render().el);
