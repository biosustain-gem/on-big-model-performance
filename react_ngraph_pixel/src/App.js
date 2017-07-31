import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import createGraph from 'ngraph.graph';
import renderGraph from 'ngraph.pixel';
import Pixel from './Pixel';

class App extends Component {
  render() {
    return (
      <div className="App">
	      <Pixel />
      </div>
    );
  }
}

export default App;
