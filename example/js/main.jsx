import Backbone from 'backbone';
import React from 'react';
import { render } from 'react-dom';
import ExampleSettingsView from './example_settings_view';
import { Nbmolviz2dModel, ReactMolecule2D } from '../../src/main.js';
import bipyridine from './bipyridine';

Backbone.sync = () => {};

const model = new Nbmolviz2dModel({
  graph: bipyridine,
});

render(
  <ReactMolecule2D
    modelData={bipyridine}
  />,
  document.querySelector('.nbmolviz2d')
);

// Set up example settings controls
const settingsView = new ExampleSettingsView({
  model,
});
document.querySelector('.data').appendChild(settingsView.render().el);
