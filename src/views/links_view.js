import Backbone from 'backbone';
import molViewUtils from '../utils/mol_view_utils';

const LinksView = Backbone.View.extend({
  initialize(options) {
    this.svg = options.svg;
  },

  render() {
    const links = this.svg
      .selectAll('.link')
      .data(this.model.get('links'));

    const newLinksG = links.enter()
      .append('g')
      .attr('class', 'link');

    // all edges (includes both bonds and distance constraints)
    newLinksG
      .append('line')
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
    newLinksG
      .append('text')
      .attr('x', (d) => d.source.x)
      .attr('y', (d) => d.source.y)
      .attr('text-anchor', 'middle')
      .text(() => ' ');

    // double and triple bonds
    newLinksG
      .filter((d) => d.bond > 1)
      .append('line')
      .attr('class', 'separator')
      .style('stroke', '#FFF')
      .style('stroke-width', (d) => `${d.bond * 4 - 5}px`);

    // triple bonds
    newLinksG
      .filter((d) => d.bond === 3)
      .append('line')
      .attr('class', 'separator')
      .style('stroke', (d) => molViewUtils.chooseColor(d, 'black'))
      .style('stroke-width', () => molViewUtils.getBondWidth(1));

    return this;
  },

  renderPosition() {
    const links = this.svg.selectAll('.link');

    // keep edges pinned to their nodes
    links.selectAll('line')
      .attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y);

    // keep edge labels pinned to the edges
    links.selectAll('text')
      .attr('x', (d) =>
        (d.source.x + d.target.x) / 2.0
      )
      .attr('y', (d) =>
        (d.source.y + d.target.y) / 2.0
      );
  },
});

export default LinksView;
