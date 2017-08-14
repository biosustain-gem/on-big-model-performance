import React, { Component } from 'react';
import * as escher from 'escher-vis';
import init_Data from './combined_f.json';
import './builder.css';

const Escher_s = {
	minHeight: 'inherit'
};

class EscherC extends Component {
  
  componentDidMount() {
    console.log(init_Data);
    escher.Builder(init_Data,null,null,this.container,{menu:'zoom'});
  }
  
  render() {
    return (
      <div ref={(container) => { this.container = container; }} style={Escher_s} className="escher-container fill-screen-div" />
    );
  }
}

export default EscherC;
