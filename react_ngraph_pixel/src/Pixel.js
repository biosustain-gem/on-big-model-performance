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
		function buildGraph() {
			let g = createGraph({
					uniqueLinkId:false
				});
			
			Object.entries(nodes).forEach(function ([key, node]) {
				g.addNode(+key,node);
			});
			Object.values(reactions).forEach(reaction => {
				Object.values(reaction.segments).forEach((segment) => {
					g.addLink(+segment.from_node_id,+segment.to_node_id);
				});
			});
			
			return g;
		}
		let graph = buildGraph();
		let renderer = renderGraph(graph,{
			container: this.refs.container,
			// is3d: false,
			node: {
				size:30,
				color: "#FFFFFF",
				// isPinned: true,
			}
		});
		
		renderer.forEachNode(function (node) {
			let node_d = nodes[node.id+""];
			Object.assign(node.position, {
				x:  node_d.x,
				y:  node_d.y,
				z:  Math.random()*200-100
			});
		});
		
		let camera = renderer.camera();
		Object.assign(camera.position, {x:18000,y:11000,z:-18000});
		camera.far = 5000;
		camera.aspect = 0.9;
		Object.assign(camera.rotation, {x:3.14,y:0,z:0});
		console.log(renderer);
	};
	
  render() {
    return (
      <div ref="container" style={s_pixel}>
      </div>
    );
  }
}

export default Pixel;
