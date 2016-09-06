import Backbone from 'backbone';

const NodesModel = Backbone.Model.extend({
  defaults: {
    nodes: [],
    selected_atom_indices: [],
  },
});

export default NodesModel;
