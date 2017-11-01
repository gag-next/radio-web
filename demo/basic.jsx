import React from 'react';
import ReactDOM from 'react-dom';
import Radio from '../src';
class App extends React.Component {
  state = {
    disabled: true,
  }
  toggleDisabled = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  }
  render() {
    return (
      <div>
        <Radio defaultChecked={false} disabled={this.state.disabled}>Disabled</Radio>
        <br />
        <Radio defaultChecked disabled={this.state.disabled}>Disabled</Radio>
        <div style={{ marginTop: 20 }}>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('sk-root'));
