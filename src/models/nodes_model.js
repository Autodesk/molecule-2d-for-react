import Backbone from 'backbone';

const NodesModel = Backbone.Model.extend({
  defaults: {
    nodes: [],
    clicked_atom_index: null,
  },
});

export default NodesModel;
