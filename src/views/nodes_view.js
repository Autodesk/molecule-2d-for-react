import Backbone from 'backbone';
import {
  drag,
  event as d3Event,
  scaleSqrt,
} from 'd3';
import molViewUtils from '../utils/mol_view_utils';
require('../styles/nodes.scss');

const SELECTED_COLOR = '#39f8ff';

const NodesView = Backbone.View.extend({
  initialize(options) {
    this.simulation = options.simulation;
    this.svg = options.svg;
    this.model.on('change', this.render.bind(this));
  },

  onClick(node) {
    this.model.set('clicked_atom_index', node.index * 1);
    this.model.save();
  },

  dragstarted(d) {
    if (!d3Event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  },

  dragged(d) {
    d.fx = d3Event.x;
    d.fy = d3Event.y;
  },

  dragended(d) {
    if (!d3Event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  },

  renderTransform() {
    this.svg.selectAll('.node')
      .attr('transform', (d) =>
        `translate(${d.x || 0},${d.y || 0})`
      );
  },

  render() {
    const nodes = this.svg
      .selectAll('.node')
      .data(this.model.get('nodes'), (d) => d.index);

    const newNodesG = nodes.enter()
      .append('g')
      .attr('class', 'node')
      .on('click', this.onClick.bind(this));

    const clickedAtomIndex = this.model.get('clicked_atom_index');

    newNodesG
      .attr('index', (d) => d.index)
      .call(drag()
        .on('start', this.dragstarted.bind(this))
        .on('drag', this.dragged.bind(this))
        .on('end', this.dragended.bind(this))
      );

    this.svg.selectAll('.node')
      .classed('selected', (d) =>
        (d.index === clickedAtomIndex ? SELECTED_COLOR : '')
    );

    const radius = scaleSqrt().range([0, 6]);

    // circle for each atom (background color white by default)
    newNodesG.append('circle')
      .attr('class', 'atom-circle')
      .attr('r', (d) => radius(molViewUtils.withDefault(d.size, 1.5)))
      .style('fill', (d) => molViewUtils.chooseColor(d, 'white'));
    this.svg.selectAll('.atom-circle')
      .style('stroke', (d) =>
        (d.index === clickedAtomIndex ? SELECTED_COLOR : '')
      );

    // atom labels
    newNodesG.append('text')
      .attr('class', 'atom-label')
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .text((d) => d.atom);
    this.svg.selectAll('.atom-label')
      .attr('fill', (d) => {
        const color = d.index === clickedAtomIndex ? SELECTED_COLOR : '#000000';
        return molViewUtils.withDefault(d.textcolor, color);
      });

    this.renderTransform();

    return this;
  },
});

export default NodesView;
