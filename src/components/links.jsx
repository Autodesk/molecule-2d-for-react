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
    const container = select(this.linksContainer);

    const links = container
      .selectAll('.link')
      .data(this.props.links);

    const newLinksG = links.enter()
      .append('g')
      .attr('class', 'link');

    // all edges (includes both bonds and distance constraints)
    newLinksG
      .append('line')
      .attr('source', d => d.source.index)
      .attr('target', d => d.target.index)
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
      .append('text')
      .attr('x', d => d.source.x)
      .attr('y', d => d.source.y)
      .attr('text-anchor', 'middle')
      .text(() => ' ');

    // double and triple bonds
    newLinksG
      .filter(d => d.bond > 1)
      .append('line')
      .attr('class', 'separator')
      .style('stroke', '#FFF')
      .style('stroke-width', d => `${(d.bond * 4) - 5}px`);

    // triple bonds
    newLinksG
      .filter(d => d.bond === 3)
      .append('line')
      .attr('class', 'separator')
      .style('stroke', d => molViewUtils.chooseColor(d, 'black'))
      .style('stroke-width', () => molViewUtils.getBondWidth(1));
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
