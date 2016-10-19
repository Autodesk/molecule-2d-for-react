import React from 'react';
import { render } from 'react-dom';
import ExampleSettings from './example_settings.jsx';
import ReactMolecule2d from '../../src/main.js';
import bipyridine from './bipyridine';
import residue from './residue';

class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAtomIds: [],
      modelData: residue,
    };

    this.onChangeSelection = this.onChangeSelection.bind(this);
    this.onToggleMolecule = this.onToggleMolecule.bind(this);
  }

  onChangeSelection(selectedAtomIds) {
    this.setState({
      selectedAtomIds,
    });
  }

  onToggleMolecule() {
    this.setState({
      modelData: this.state.modelData === bipyridine ? residue : bipyridine,
    });
  }

  render() {
    return (
      <div className="container">
        <ReactMolecule2d
          modelData={this.state.modelData}
          selectedAtomIds={this.state.selectedAtomIds}
          onChangeSelection={this.onChangeSelection}
        />
        <ExampleSettings
          selectedAtomIds={this.state.selectedAtomIds}
          onChangeSelection={this.onChangeSelection}
          onToggleMolecule={this.onToggleMolecule}
        />
      </div>
    );
  }
}

render(
  <Example />,
  document.querySelector('.react-molecule-2d')
);
