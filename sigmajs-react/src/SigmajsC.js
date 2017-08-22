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
	  s.settings({
		  // autoRescale: false,
		  nodesPowRatio: 0.8,
		  // minNodeSize: 30,
		  maxNodeSize: 10,
		  batchEdgesDrawing:  true,
		  hideEdgesOnMove:  true,
		  zoomMax: 1,
		  autoResize: false,
		  rescaleIgnoreSize: true,
		  nodesPowRatio: 0.5,
		  maxNodeSize:  1,
		  labelThreshold: 4,
		  defaultEdgeColor: '#334E75',
		  edgeColor: 'default'
	  });
	  
	  // Then, let's add some data to display:
	  Object.entries(init_Data[1].nodes).forEach(function ([id,node]) {
		  let color;
		  switch(node.node_type) {
			  case "midmarker":
				  color = '#90EE90';
				  break;
			  case "multimarker":
				  color = '#F0F8FF';
				  break;
			  case "segment":
				  color = '#D3D3D3';
				  break;
			  case "metabolite":
				  color = '#FFA500';
				  break;
			  default:
				  console.warn(node);
				  color = 'black';
		  }
		  s.graph.addNode({
		  	id: +id,
			  color: color,
			  label: node.bigg_id,
			  size: 30+30*(+node.node_is_primary),
			  data: node,
			  x: node.x,
			  y: node.y,
		  });
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
