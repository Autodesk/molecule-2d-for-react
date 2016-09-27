import React from 'react';
import molViewUtils from '../utils/mol_view_utils';

class Node extends React.Component {
  render() {
    return (
      <g className="node" onClick={this.props.onClickNode}>
        <circle
          className="atom-circle"
          r={}
        />
      </g>
    );
  }
}

export default Node;
