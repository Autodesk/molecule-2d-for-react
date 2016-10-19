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
import React from 'react';
import {
  event as d3Event,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceCenter,
  selectAll,
} from 'd3';
import Nodes from '../components/nodes.jsx';
import Links from '../components/links.jsx';
import moleculeUtils from '../utils/molecule_utils';
import molViewUtils from '../utils/mol_view_utils';

class ReactMolecule2d extends React.Component {
  static renderTransform() {
    // Nodes
    selectAll('.node')
      .attr('transform', d =>
        `translate(${d.x || 0},${d.y || 0})`
      );

    // Links
    const links = selectAll('.link');

    // keep edges pinned to their nodes
    links.selectAll('line')
      .attr('x1', d => d.source.x || 0)
      .attr('y1', d => d.source.y || 0)
      .attr('x2', d => d.target.x || 0)
      .attr('y2', d => d.target.y || 0);

    // keep edge labels pinned to the edges
    links.selectAll('text')
      .attr('x', d =>
        ((d.source.x || 0) + (d.target.x || 0)) / 2.0
      )
      .attr('y', d =>
        ((d.source.y || 0) + (d.target.y || 0)) / 2.0
      );
  }

  constructor(props) {
    super(props);

    this.onClickNode = this.onClickNode.bind(this);
    this.onDragStartedNode = this.onDragStartedNode.bind(this);
    this.onDragEndedNode = this.onDragEndedNode.bind(this);

    this.state = {
      selectedAtomIds: props.selectedAtomIds || [],
    };
  }

  componentDidMount() {
    this.renderD3();
  }

  componentWillReceiveProps(nextProps) {
    if (!moleculeUtils.compareIds(this.state.selectedAtomIds, nextProps.selectedAtomIds)) {
      this.setState({
        selectedAtomIds: nextProps.selectedAtomIds,
      });
    }
  }

  componentDidUpdate() {
    this.renderD3();
  }

  onClickNode(node) {
    const selectedAtomIds = this.state.selectedAtomIds.slice(0);
    const index = selectedAtomIds.indexOf(node.id);

    if (index !== -1) {
      selectedAtomIds.splice(index, 1);
    } else {
      selectedAtomIds.push(node.id);
    }

    this.setState({
      selectedAtomIds,
    });

    this.props.onChangeSelection(selectedAtomIds);
  }

  onDragStartedNode(d) {
    if (!d3Event.active) {
      this.simulation.alphaTarget(0.3).restart();
    }
    d.fx = d.x;
    d.fy = d.y;
  }

  onDragEndedNode(d) {
    if (!d3Event.active) {
      this.simulation.alphaTarget(0);
    }
    d.fx = null;
    d.fy = null;
  }

  renderD3() {
    this.simulation = forceSimulation()
      .force('link', forceLink()
        .distance(d => molViewUtils.withDefault(d.distance, 20))
        .strength(d => molViewUtils.withDefault(d.strength, 1.0))
      )
      .force('charge', forceManyBody())
      .force('center', forceCenter(this.props.width / 2, this.props.height / 2));

    this.simulation
        .nodes(this.nodes)
        .on('tick', () => ReactMolecule2d.renderTransform());

    this.simulation.force('link')
      .id(d => d.id)
      .links(this.links);
  }

  render() {
    this.nodes = moleculeUtils.updateModels(this.nodes || [], this.props.modelData.nodes);
    this.links = moleculeUtils.updateModels(this.links || [], this.props.modelData.links);

    return (
      <svg
        ref={(c) => { this.svg = c; }}
        width={this.props.width}
        height={this.props.height}
      >
        <Links
          links={this.links}
        />
        <Nodes
          selectedAtomIds={this.state.selectedAtomIds}
          nodes={this.nodes}
          onClickNode={this.onClickNode}
          onDragStartedNode={this.onDragStartedNode}
          onDragEndedNode={this.onDragEndedNode}
        />
      </svg>
    );
  }
}

ReactMolecule2d.defaultProps = {
  width: 500.0,
  height: 500.0,
  selectedAtomIds: [],
  onChangeSelection: () => {},
};

ReactMolecule2d.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  modelData: React.PropTypes.shape({
    nodes: React.PropTypes.array,
    links: React.PropTypes.array,
  }).isRequired,
  selectedAtomIds: React.PropTypes.arrayOf(React.PropTypes.number),
  onChangeSelection: React.PropTypes.func,
};

export default ReactMolecule2d;
