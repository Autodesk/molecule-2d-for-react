/**
 * Copyright 2016 Autodesk Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Backbone from 'backbone';

const MolWidget2DModel = Backbone.Model.extend({
  defaults: {
    _model_name: 'MolWidget2DModel',
    _view_name: 'MolWidget2DView',
    _model_module: 'nbmolviz-js',
    _view_module: 'nbmolviz-js',
    charge: 0.0,
    uuid: '',
    graph: {
      nodes: [
        { atom: 'C', category: 0, index: 0 },
        { atom: 'H', category: 1, index: 1 },
      ],
      links: [
        { source: 0, target: 1, bond: 0, category: 0 },
      ],
    },
    clicked_atom_index: -1,
    clicked_bond_indices: {},
    _atom_colors: {},
    width: 0.0,
    height: 0.0,
  },
});

export default MolWidget2DModel;
