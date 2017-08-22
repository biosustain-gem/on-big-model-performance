import React, { Component } from 'react';
import './App.css';
import CytoscapeC from './CytoscapeC';
import { FPSStats } from 'react-stats';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CytoscapeC />
        <FPSStats />
      </div>
    );
  }
}

export default App;
