import React from 'react';
import {
  select,
} from 'd3';
import molViewUtils from '../utils/mol_view_utils';

require('../styles/links.scss');

class Links extends React.Component {
  componentDidMount() {
    this.renderD3();
  }

  componentDidUpdate() {
    this.renderD3();
  }

  renderD3() {
    if (!this.linksContainer) {
      return;
    }

    const container = select(this.linksContainer);

    const links = container
      .selectAll('.link')
      .data(this.props.links, d => d.id);

    const newLinksG = links.enter()
      .append('g')
      .attr('class', 'link');

    // all edges (includes both bonds and distance constraints)
    newLinksG
      .append('line')
      .attr('class', 'link-line');
    container.selectAll('.link-line')
      .attr('source', d =>
        (typeof d.source.id !== 'undefined' ? d.source.id : d.source)
      )
      .attr('target', d => (typeof d.target.id !== 'undefined' ? d.target.id : d.target))
      .style('stroke-width', molViewUtils.getBondWidth)
      .style('stroke-dasharray', (d) => {
        if (d.style === 'dashed') {
          return 5;
        }

        return 0;
      })
      .style('stroke', d => molViewUtils.chooseColor(d, 'black'))
      .style('opacity', (d) => {
        if (d.bond !== 0) {
          return undefined;
        }
        return 0.0;
      });

    // text placeholders for all edges
    newLinksG
      .append('text');
    container.selectAll('.link').selectAll('text')
      .attr('x', d => d.source.x || 0)
      .attr('y', d => d.source.y || 0)
      .attr('text-anchor', 'middle')
      .text(() => ' ');

    // double and triple bonds
    newLinksG
      .filter(d => d.bond > 1)
      .append('line')
      .attr('class', 'separator separator-double');
    container.selectAll('.separator-double')
      .style('stroke', '#FFF')
      .style('stroke-width', d => `${(d.bond * 4) - 5}px`);

    // triple bonds
    newLinksG
      .filter(d => d.bond === 3)
      .append('line')
      .attr('class', 'separator separator-triple');
    container.selectAll('.separator-triple')
      .style('stroke', d => molViewUtils.chooseColor(d, 'black'))
      .style('stroke-width', () => molViewUtils.getBondWidth(1));

    links.exit()
      .remove();
  }

  render() {
    return (
      <g className="links-container" ref={(c) => { this.linksContainer = c; }} />
    );
  }
}

Links.propTypes = {
  links: React.PropTypes.arrayOf(React.PropTypes.object),
};

export default Links;
