import React, { Component } from 'react';
import createGraph from 'ngraph.graph';
import renderGraph from 'ngraph.pixel';
import init_Data from './combined.json';

const s_pixel = {
	width: "100vw",
	height: "100vh"
};

class Pixel extends Component {
	componentDidMount() {
		console.dir(init_Data);
		let {nodes,reactions} = init_Data[1];
		function ladder(n) {
			/**
			 * Ladder graph is a graph in form of ladder
			 * @param {Number} n Represents number of steps in the ladder
			 */
			if (!n || n < 0) {
				throw new Error("Invalid number of nodes");
			}
			
			
			var g = createGraph({
					uniqueLinkId:false
				}),
				i;
			
			console.dir(g);
			
			Object.entries(nodes).forEach(function ([key, node]) {
				g.addNode(+key,node);
			});
			
			Object.values(reactions).forEach(reaction => {
				Object.values(reaction.segments).forEach((segment) => {
					g.addLink(+segment.from_node_id,+segment.to_node_id);
				});
			});
			
			console.log(g.getNode(1300212));
			
			return g;
		};
		var graph = ladder(10);
		let renderer = renderGraph(graph,{
			container: this.refs.container,
			is3d: false
		});
		console.log(renderer);
		renderer.forEachNode(function (node) {
			let node_d = nodes[node.id+""];
			node.position = {x:node_d.y,y:node_d.x,z:0};
		});
		var ui = renderer.getNode(1300212);
		console.log(ui);
		console.log(ui.position);
	};
	
  render() {
    return (
      <div ref="container" style={s_pixel}>
      </div>
    );
  }
}

export default Pixel;
