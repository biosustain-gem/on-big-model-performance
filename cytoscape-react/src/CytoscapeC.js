import React, { Component } from 'react';
import './App.css';
import cytoscape from 'cytoscape';
import data from './combined.json';

const cy_s = {
	height:"100%",
	width:"100%",
	position: "absolute",
	top: 0,
	left: 0
};

class CytoscapeC extends Component {
	componentDidMount() {
		console.log(data);
		let nodes_f = Object.entries(data[1].nodes).map(function([key,node]){
			Object.assign(node, {
				group: 'nodes',
				data:{id:parseInt(key)},
				position: {x:node.x,y:node.y}
			});
			return node;
		});
		let edges_f = [];
			Object.entries(data[1].reactions).forEach(function([key,reaction]){
			Object.entries(reaction.segments).forEach(function([key,segment]) {
				Object.assign(segment, {
					group: 'edges',
					data: {
						id: parseInt(key),
						source: segment.from_node_id,
						target: segment.to_node_id
					},
					position: {x: segment.x, y: segment.y}
				});
				edges_f.push(segment);
			});
		});
		console.log(this.cont,Object.entries(data[1].nodes), nodes_f, edges_f);
		let cy = cytoscape({
			container: this.cont,
			elements: nodes_f.concat(edges_f),
			layout: {
				name: 'preset'
			}
		});
	}
  render() {
    return (
      <div ref={(cont) => this.cont = cont} style={cy_s}>
      
      </div>
    );
  }
}

export default CytoscapeC;
