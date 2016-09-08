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
import Backbone from 'backbone';
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

const Nbmolviz2dView = Backbone.View.extend({

  tagName: 'div',

  initialize() {
    this.model.on('change', this.render.bind(this));

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
      if (!window.nbmolviz2d) {
        window.nbmolviz2d = [];
      }
      window.nbmolviz2d.push(this);
    }
  },

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
  },

  render() {
    // set properties
    this.graph = JSON.parse(JSON.stringify(this.model.get('graph')));

    // setup the div
    this.el.id = this.model.get('id');
    this.el.style.width = this.model.get('width');
    this.el.style.height = this.model.get('height');
    this.el.style.position = 'relative';

    // render it
    this.setCss();
    this.renderViewer();

    if (typeof this.send === 'function') {
      this.send({ event: 'ready' });
    }

    // console.log(`${this.viewerId} is ready`);
  },

  setCss() {
    if (document.querySelectorAll('#graph_css_style').length > 0) {
      return;
    }
    const css = '.link line {stroke: #696969;} \n ' +
        '.link line.separator {stroke: #fff; stroke-width: 2px;} \n' +
        '.node text {font: 10px sans-serif;  pointer-events: none;}';
    const graphStyle = document.createElement('style');
    graphStyle.type = 'text/css';
    graphStyle.id = 'graph_css_style';
    graphStyle.innerHTML = css;
    document.getElementsByTagName('head')[0].appendChild(graphStyle);
  },

  renderViewer() {
    const width = this.model.get('width');
    const height = this.model.get('height');

    if (this.el.querySelectorAll('svg').length) {
      this.svg = select(this.el).select('svg');
    } else {
      this.svg = select(this.el).append('svg');
    }

    this.svg
      .attr('width', width)
      .attr('height', height)
      .attr('border', 1);

    const simulation = forceSimulation()
      .force('link', forceLink()
        .id((d) => d.index)
        .distance((d) => molViewUtils.withDefault(d.distance, 20))
        .strength((d) => molViewUtils.withDefault(d.strength, 1.0))
      )
      .force('charge', forceManyBody())
      .force('center', forceCenter(width / 2, height / 2));

    this.linksView = new LinksView({
      model: new LinksModel({
        links: this.graph.links,
      }),
      svg: this.svg,
    });
    this.linksView.render();

    const nodesModel = new NodesModel({
      nodes: this.graph.nodes,
      selected_atom_indices: this.model.get('selected_atom_indices'),
    });
    this.model.off().on('change:selected_atom_indices', () => {
      nodesModel.set('selected_atom_indices', this.model.get('selected_atom_indices'));
    });

    if (!this.nodesView) {
      this.nodesView = new NodesView({
        model: nodesModel,
        svg: this.svg,
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
        .nodes(this.graph.nodes)
        .on('tick', ticked.bind(this));

    simulation.force('link')
        .links(this.graph.links);
  },
});

export default Nbmolviz2dView;
