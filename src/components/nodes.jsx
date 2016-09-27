import React from 'react';
import {
  drag,
  event as d3Event,
  scaleSqrt,
  select,
  selectAll,
} from 'd3';
import molViewUtils from '../utils/mol_view_utils';

require('../styles/nodes.scss');

const SELECTED_COLOR = '#39f8ff';

class Nodes extends React.Component {
  static onDragged(d) {
    d.fx = d3Event.x;
    d.fy = d3Event.y;
  }

  componentDidMount() {
    this.renderD3();
  }

  componentDidUpdate() {
    this.renderD3();
  }

  renderD3() {
    const container = select(this.nodesContainer);
    const nodes = container.selectAll('.node')
      .data(this.props.nodes, d => d.index);

    const newNodesG = nodes.enter()
      .append('g')
      .attr('class', 'node')
      .on('click', this.props.onClickNode);

    const selectedAtoms = this.props.selectedAtomIds;

    newNodesG
      .attr('index', d => d.index)
      .call(drag()
        .on('start', this.props.onDragStartedNode)
        .on('drag', Nodes.onDragged)
        .on('end', this.props.onDragEndedNode)
      );

    container.selectAll('.node')
      .classed('selected', d =>
        (selectedAtoms.indexOf(d.index) === -1 ? '' : SELECTED_COLOR)
    );

    const radius = scaleSqrt().range([0, 6]);

    // circle for each atom (background color white by default)
    newNodesG.append('circle')
      .attr('class', 'atom-circle')
      .attr('r', d => radius(molViewUtils.withDefault(d.size, 1.5)))
      .style('fill', d => molViewUtils.chooseColor(d, 'white'));
    selectAll('.atom-circle')
      .style('stroke', d =>
        (selectedAtoms.indexOf(d.index) === -1 ? '' : SELECTED_COLOR)
      );

    // atom labels
    newNodesG.append('text')
      .attr('class', 'atom-label')
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .text(d => d.atom);
    container.selectAll('.atom-label')
      .attr('fill', (d) => {
        const color = (selectedAtoms.indexOf(d.index) === -1 ? '#000000' : SELECTED_COLOR);
        return molViewUtils.withDefault(d.textcolor, color);
      });
  }

  render() {
    return (
      <g className="nodes-container" ref={(c) => { this.nodesContainer = c; }} />
    );
  }
}

Nodes.propTypes = {
  selectedAtomIds: React.PropTypes.arrayOf(React.PropTypes.number),
  nodes: React.PropTypes.arrayOf(React.PropTypes.object),
  onClickNode: React.PropTypes.func,
  onDragStartedNode: React.PropTypes.func,
  onDragEndedNode: React.PropTypes.func,
};

export default Nodes;
