import React, { Component } from 'react';
import './App.css';
import SigmajsC from './SigmajsC';
import { FPSStats } from 'react-stats';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FPSStats />
        <SigmajsC />
      </div>
    );
  }
}

export default App;
