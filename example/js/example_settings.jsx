import React from 'react';

class ExampleSettings extends React.Component {
  constructor(props) {
    super(props);

    this.onBlurSelection = this.onBlurSelection.bind(this);
    this.onChangeSelection = this.onChangeSelection.bind(this);

    this.state = {
      selectedAtomIds: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedAtomIds: JSON.stringify(nextProps.selectedAtomIds),
    });
  }

  onChangeSelection(event) {
    this.setState({
      selectedAtomIds: event.target.value,
    });
  }

  onBlurSelection(event) {
    let selectedAtomIds;

    try {
      selectedAtomIds = JSON.parse(event.target.value);
    } catch (err) {
      throw err;
    }

    this.props.onChangeSelection(selectedAtomIds);
  }

  render() {
    return (
      <div>
        <h4>selectedAtomIds</h4>
        <input
          value={this.state.selectedAtomIds}
          onChange={this.onChangeSelection}
          onBlur={this.onBlurSelection}
        />
      </div>
    );
  }
}

ExampleSettings.propTypes = {
  selectedAtomIds: React.PropTypes.arrayOf(React.PropTypes.number),
  onChangeSelection: React.PropTypes.func,
};

export default ExampleSettings;
