import Backbone from 'backbone';
import d3 from 'd3';
import molViewUtils from '../utils/mol_view_utils';

const SELECTED_COLOR = '#39f8ff';

const NodesView = Backbone.View.extend({
  initialize(options) {
    this.svg = options.svg;
    this.force = options.force;
    this.model.on('change', this.render.bind(this));
  },

  onClick(node) {
    this.model.set('clicked_atom_index', node.index * 1);
    this.model.save();
  },

  render() {
    const nodes = this.svg
      .selectAll('.node')
      .data(this.model.get('nodes'), (d) => d.index);

    // Clear everything inside the groups so it can be redrawn
    nodes.selectAll('*').remove();

    nodes.enter()
      .append('g')
      .on('click', this.onClick.bind(this));

    const clickedAtomIndex = this.model.get('clicked_atom_index');

    nodes
      .attr('class', (d) => {
        const selectedClass = d.index === clickedAtomIndex ? 'selected' : '';
        return `node ${selectedClass}`;
      })
      .attr('index', (d) => d.index)
      .call(this.force.drag);

    const radius = d3.scale.sqrt().range([0, 6]);

    // circle for each atom (background color white by default)
    nodes.append('circle')
      .attr('class', 'atom-circle')
      .attr('r', (d) => radius(molViewUtils.withDefault(d.size, 1.5)))
      .style('fill', (d) => molViewUtils.chooseColor(d, 'white'))
      .style('stroke', (d) =>
        (d.index === clickedAtomIndex ? SELECTED_COLOR : '')
      );

    // atom labels
    nodes.append('text')
      .attr('class', 'atom-label')
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .attr('fill', (d) => {
        const color = d.index === clickedAtomIndex ? SELECTED_COLOR : '#000000';
        return molViewUtils.withDefault(d.textcolor, color);
      })
      .text((d) => d.atom);

    nodes.attr('transform', (d) =>
      `translate(${d.x || 0},${d.y || 0})`
    );

    this.renderTransform();

    return this;
  },

  renderTransform() {
    this.svg.selectAll('.node')
      .attr('transform', (d) =>
        `translate(${d.x || 0},${d.y || 0})`
      );
  },
});

export default NodesView;
