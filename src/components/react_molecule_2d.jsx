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
  select,
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
} from 'd3';
import NodesView from '../views/nodes_view';
import NodesModel from '../models/nodes_model';
import LinksModel from '../models/links_model';
import LinksView from '../views/links_view';
import molViewUtils from '../utils/mol_view_utils';

// TODO make sure root model is in sync with derivatives

class ReactMolecule2D extends React.Component {
  initialize() {
    this.model.on('change', this.render.bind(this));

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
      if (!window.nbmolviz2d) {
        window.nbmolviz2d = [];
      }
      window.nbmolviz2d.push(this);
    }
  }

  onClickNode(node) {
    const selectedAtomIndices = this.model.get('selected_atom_indices').slice(0);
    const index = selectedAtomIndices.indexOf(node.index);

    if (index !== -1) {
      selectedAtomIndices.splice(index, 1);
    } else {
      selectedAtomIndices.push(node.index);
    }

    this.model.set('selected_atom_indices', selectedAtomIndices);
    this.model.save();
  }

  componentDidMount() {
    this.renderViewer();
  }

  renderViewer() {
    // Copy modelData to prevent d3 from modifying it
    const modelData = JSON.parse(JSON.stringify(this.props.modelData));

    const svgD3 = select(this.svg);

    const simulation = forceSimulation()
      .force('link', forceLink()
        .id(d => d.index)
        .distance(d => molViewUtils.withDefault(d.distance, 20))
        .strength(d => molViewUtils.withDefault(d.strength, 1.0))
      )
      .force('charge', forceManyBody())
      .force('center', forceCenter(this.props.width / 2, this.props.height / 2));

    this.linksView = new LinksView({
      model: new LinksModel({
        links: modelData.links,
      }),
      svg: svgD3,
    });
    this.linksView.render();

    const nodesModel = new NodesModel({
      nodes: modelData.nodes,
      selected_atom_indices: this.props.selectedAtomIds,
    });

    if (!this.nodesView) {
      this.nodesView = new NodesView({
        model: nodesModel,
        svg: svgD3,
        simulation,
      });
      this.nodesView.onClickNode = this.onClickNode.bind(this);
      this.nodesView.render();
    }

    function ticked() {
      this.nodesView.renderTransform();
      this.linksView.renderPosition();
    }

    simulation
        .nodes(modelData.nodes)
        .on('tick', ticked.bind(this));

    simulation.force('link')
        .links(modelData.links);
  }

  render() {
    return (
      <svg
        ref={(c) => { this.svg = c; }}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}

ReactMolecule2D.defaultProps = {
  width: 500.0,
  height: 500.0,
  selectedAtomIds: [],
};

ReactMolecule2D.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  modelData: React.PropTypes.shape({
    nodes: React.PropTypes.array,
    links: React.PropTypes.array,
  }).isRequired,
  selectedAtomIds: React.PropTypes.arrayOf(React.PropTypes.number),
};

export default ReactMolecule2D;
