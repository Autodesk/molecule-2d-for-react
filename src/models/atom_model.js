import Backbone from 'backbone';

const AtomsModel = Backbone.Model.extend({
  defaults: {
    nodes: [],
    clicked_atom_index: null,
  },
});

export default AtomsModel;
