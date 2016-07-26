import { MolWidget2DModel, MolWidget2DView } from '../../src/main.js';

const model = new MolWidget2DModel();
const view = new MolWidget2DView({
  model,
  el: document.querySelector('.app'),
});

view.render();
