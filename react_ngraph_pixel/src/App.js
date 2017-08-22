import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import createGraph from 'ngraph.graph';
import renderGraph from 'ngraph.pixel';
import Pixel from './Pixel';
import { Route } from 'react-router-dom';
import { FPSStats } from 'react-stats';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FPSStats/>
        <Route component={Pixel} />
      </div>
    );
  }
}

export default App;
