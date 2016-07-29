import Backbone from 'backbone';

const AtomModel = Backbone.Model.extend({
  defaults: {
    nodes: [],
    clicked_atom_index: null,
  },
});

export default AtomModel;
