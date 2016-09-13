import Backbone from 'backbone';

const ExampleSettingsView = Backbone.View.extend({
  initialize() {
    this.model.on('change', this.render.bind(this));
  },

  onBlurSelection(event) {
    this.model.set('selected_atom_indices', JSON.parse(event.target.value));
  },

  render() {
    this.el.innerHTML = '';

    const selectionLabel = document.createElement('h4');
    selectionLabel.innerHTML = 'selected_atom_indices';
    this.el.appendChild(selectionLabel);
    const selectionInput = document.createElement('input');
    selectionInput.value = JSON.stringify(this.model.get('selected_atom_indices'));
    selectionInput.addEventListener('blur', this.onBlurSelection.bind(this));
    this.el.appendChild(selectionInput);

    return this;
  },
});

export default ExampleSettingsView;
