import React from 'react';
import { render } from 'react-dom';
import ExampleSettings from './example_settings.jsx';
import ReactMolecule2D from '../../src/main.js';
import bipyridine from './bipyridine';

class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAtomIds: [],
    };

    this.onChangeSelection = this.onChangeSelection.bind(this);
  }

  onChangeSelection(selectedAtomIds) {
    this.setState({
      selectedAtomIds,
    });
  }

  render() {
    return (
      <div className="container">
        <ReactMolecule2D
          modelData={bipyridine}
          selectedAtomIds={this.state.selectedAtomIds}
          onChangeSelection={this.onChangeSelection}
        />
        <ExampleSettings
          selectedAtomIds={this.state.selectedAtomIds}
          onChangeSelection={this.onChangeSelection}
        />
      </div>
    );
  }
}

render(
  <Example />,
  document.querySelector('.nbmolviz2d')
);
