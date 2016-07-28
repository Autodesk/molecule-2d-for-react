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
import d3 from 'd3';
import molViewUtils from '../utils/mol_view_utils.js';

const MolWidget2DView = Backbone.View.extend({

  tagName: 'div',

  handleMessage(message) {
    this.messages.push(message);
    if (message.event === 'function_call') {
      this.handleFunctionCall(message);
    }
  },

  handleFunctionCall(event) {
    // TODO: handle exceptions
    // console.log('MolViz3DBaseWidget received a function call: '
    //    + event.function_name +'('+ event.arguments+')');
    // try {
    this.messages.push(event);
    const myFunction = this[event.function_name];
    const result = myFunction.apply(this, event.arguments);
    this.send({
      call_id: event.call_id,
      result,
      function_name: event.function_name,
      event: 'function_done',
    });
  },

  render() {
    // TODO can we remove this?
    document.last_2d_widget = this;

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
    this.indexSvgElements();

    // set up interactions with python
    this.messages = [];
    this.highlightedAtoms = [];
    this.listenTo(this.model, 'msg:custom', this.handleMessage, this);

    if (typeof this.send === 'function') {
      this.send({ event: 'ready' });
    }

    console.log(`${this.viewerId} is ready`);
  },

  updateHighlightAtoms(atoms) {
    const svgAtoms = this.svgNodes;
    this.highlightedAtoms.forEach((x) => {
      svgAtoms[x].style.stroke = null;
    });
    this.highlightedAtoms = atoms;
    atoms.forEach((x) => {
      svgAtoms[x].style.stroke = '#39F8FF';
    });
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

  /*
   * TODO these are unused, delete them?
  setAtomStyle(atoms, atomSpec) {
    this.applyStyleSpec(atoms, this.svgNodes, atomSpec);
  },

  setBondStyle(bonds, bondSpec) {
    this.applyStyleSpec(bonds, this.svgLinks, bondSpec);
  },

  applyStyleSpec(objs, objLookup, spec) {
    // TODO: don't just assume children[0]
    objs.forEach((o) => {
      const obj = objLookup[o];
      if (typeof(obj) === 'undefined') {
        console.log(`no object ${o}`);
        return;
      }
      Object.keys(spec).forEach((st) => {
        obj.children[0].style[st] = spec[st];
      });
    });
  },

  setAtomLabel(atom, text, spec) {
    const obj = this.svgNodes[atom].children[1];
    if (typeof(text) !== 'undefined') {
      obj.innerHTML = text;
    }
    Object.keys(spec).forEach((st) => {
      obj.style[st] = spec[st];
    });
  },

  setBondLabel(bond, text, spec) {
    const link = this.svgLinks[bond];
    if (typeof(link) === 'undefined') {
      console.log(`No bond ${bond}`);
      return;
    }
    if (typeof(text) !== 'undefined') {
      link.children[1].innerHTML = text;
    }
    Object.keys(spec).forEach((st) => {
      link.children[1].style[st] = spec[st];
    });
  },
  */

  indexSvgElements() {
    this.svgNodes = {};
    this.svgLinks = {};
    const svgElements = this.svg[0][0].children;

    for (let i = 0; i < svgElements.length; ++i) {
      const elem = svgElements[i];
      if (elem.getAttribute('class') === 'node') {
        const index = elem.getAttribute('index');
        this.svgNodes[index] = elem;
      }
      if (elem.getAttribute('class') === 'link') {
        const child = elem.children[0];
        const source = child.getAttribute('source');
        const target = child.getAttribute('target');
        this.svgLinks[[source, target]] = elem;
        this.svgLinks[[target, source]] = elem;
      }
    }
  },

  renderViewer() {
    const width = this.model.get('width');
    const height = this.model.get('height');
    const graph = this.graph;

    console.log(JSON.stringify(graph));
    console.log('up8date');

    const radius = d3.scale.sqrt().range([0, 6]);

    const svg = d3
      .select(this.el)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('border', 1);
    this.svg = svg;

    /*
    const borderPath = svg.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('height', height)
        .attr('width', width)
        .style('stroke', 'black')
        .style('fill', 'none')
        .style('stroke-width', 1);
    */

    const force = d3.layout.force()
      .size([width, height])
      .charge(this.model.get('charge'))
      .linkDistance((d) => molViewUtils.withDefault(d.distance, 20))
      .linkStrength((d) => molViewUtils.withDefault(d.strength, 1.0));

    const link = svg.selectAll('.link')
      .data(graph.links)
      .enter()
      .append('g')
      .attr('class', 'link');

    const node = svg.selectAll('.node')
        .data(this.graph.nodes)
        .enter()
        .append('g')
        .on('click', (clickedNode) => {
          this.model.set('clicked_atom_index', clickedNode.index * 1);
          this.model.save();
        })
        .attr('class', 'node')
        .attr('index', (d) => d.index)
        .call(force.drag);

    force
      .nodes(graph.nodes)
      .links(graph.links)
      .on('tick', () => {
        // keep edges pinned to their nodes
        link.selectAll('line')
          .attr('x1', (d) => d.source.x)
          .attr('y1', (d) => d.source.y)
          .attr('x2', (d) => d.target.x)
          .attr('y2', (d) => d.target.y);

        // keep edge labels pinned to the edges
        link.selectAll('text')
          .attr('x', (d) =>
            (d.source.x + d.target.x) / 2.0
          )
          .attr('y', (d) =>
            (d.source.y + d.target.y) / 2.0
          );

        node.attr('transform', (d) => `translate(${d.x},${d.y})`);
      })
      .start();

    // all edges (includes both bonds and distance constraints)
    link.append('line')
        .attr('source', (d) => d.source.index)
        .attr('target', (d) => d.target.index)
        .style('stroke-width', molViewUtils.getBondWidth)
        .style('stroke-dasharray', (d) => {
          if (d.style === 'dashed') {
            return 5;
          }

          return 0;
        })
        .style('stroke', (d) => molViewUtils.chooseColor(d, 'black'))
        .style('opacity', (d) => {
          if (d.bond !== 0) {
            return undefined;
          }
          return 0.0;
        });


    // text placeholders for all edges
    link.append('text')
        .attr('x', (d) => d.source.x)
        .attr('y', (d) => d.source.y)
        .attr('text-anchor', 'middle')
        .text(() => ' ');

    // double and triple bonds
    link
      .filter((d) => d.bond > 1)
      .append('line')
      .attr('class', 'separator')
      .style('stroke', '#FFF')
      .style('stroke-width', (d) => `${d.bond * 4 - 5}px`);

    // triple bonds
    link
      .filter((d) => d.bond === 3)
      .append('line')
      .attr('class', 'separator')
      .style('stroke', (d) => molViewUtils.chooseColor(d, 'black'))
      .style('stroke-width', () => molViewUtils.getBondWidth(1));

    // circle for each atom (background color white by default)
    node.append('circle')
      .attr('r', (d) => radius(molViewUtils.withDefault(d.size, 1.5)))
      .style('fill', (d) => molViewUtils.chooseColor(d, 'white'));

    // atom labels
    node.append('text')
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .style('color', (d) =>
        molViewUtils.withDefault(d.textcolor, 'black')
      )
      .text((d) => d.atom);
  },
});

export default MolWidget2DView;
