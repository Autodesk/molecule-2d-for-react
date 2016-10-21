import React from 'react';
import { render } from 'react-dom';
import ExampleSettings from './example_settings.jsx';
import Molecule2d from '../../src/main.js';
import bipyridine from './bipyridine';
import residue from './residue';

class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAtomIds: [],
      modelData: residue,
    };
  }

  onChangeSelection = (selectedAtomIds) => {
    this.setState({
      selectedAtomIds,
    });
  }

  onToggleMolecule = () => {
    this.setState({
      modelData: this.state.modelData === bipyridine ? residue : bipyridine,
    });
  }

  render() {
    return (
      <div className="container">
        <Molecule2d
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
  document.querySelector('.molecule-2d')
);
