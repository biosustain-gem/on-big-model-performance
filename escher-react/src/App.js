import React, { Component } from 'react';
import './App.css';
import EscherC from './EscherC';
import { FPSStats } from 'react-stats';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FPSStats />
        <EscherC />
      </div>
    );
  }
}

export default App;
