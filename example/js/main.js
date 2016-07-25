import MolecularVisualization from '../../src/main.js';

const model = new MolecularVisualization.MolWidget2DModel();
const view = new MolecularVisualization.MolWidget2DView({
  model,
  el: document.querySelector('.app'),
});

view.render();
