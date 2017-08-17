import React, { Component } from 'react';
import * as sigma from 'sigma';
import init_Data from './combined.json';

const Sigmajs_s = {
	minHeight: 'inherit',
	height:"100%",
	width:"100%",
	position: "absolute",
	top: 0,
	left: 0
};

class SigmajsC extends Component {
  
  componentDidMount () {
	
	  var s = new sigma({
		  renderers: [
			  {
				  container: this.container,
				  type: 'webGL' // sigma.renderers.canvas works as well
			  }
		  ]
	  });
	  
	  
	  // Then, let's add some data to display:
	  Object.entries(init_Data[1].nodes).forEach(function ([id,node]) {
		  node.id = +id;
		  node.color = '#f00';
		  node.size = Math.random();
		  s.graph.addNode(node);
	  });
	  
	  Object.values(init_Data[1].reactions).forEach(function(reaction) {
	  	Object.entries(reaction.segments).forEach(function ([id,segment]) {
			  s.graph.addEdge({
				  id: +id,
				  source: segment.from_node_id,
				  target: segment.to_node_id
			  });
		  })
	  });
		 
	
	  // Finally, let's ask our sigma instance to refresh:
	  s.refresh();
	  
	  console.log(s);
  }
  
  render() {
    return (
      <div ref={(container) => { this.container = container; }} style={Sigmajs_s}></div>
    );
  }
}

export default SigmajsC;
