import React, { Component } from 'react';
import createGraph from 'ngraph.graph';
import renderGraph from 'ngraph.pixel';
import staticLayout from 'pixel.static';
import init_Data from './combined.json';

const s_pixel = {
	width: "100vw",
	height: "100vh"
};

class Pixel extends Component {
	constructor(props) {
		super(props);
	}
	
	componentDidMount() {
		console.dir(init_Data);
		let {nodes,reactions} = init_Data[1];
		function buildGraph() {
			let g = createGraph({
					uniqueLinkId:false
				});
			
			console.warn(g);
			Object.entries(nodes).forEach(function ([key, node]) {
				// node.isPinned = true;
				g.addNode(+key,node);
			});
			g.forEachNode(node => {
				node.position = {
					x: node.data.x,
					y: node.data.y,
					z: 0,
				};
				node.isPinned = node.data.node_is_primary ? Math.round(Math.random()*0.5) : false;
			});
			Object.values(reactions).forEach(reaction => {
				Object.values(reaction.segments).forEach((segment) => {
					g.addLink(+segment.from_node_id,+segment.to_node_id,reaction);
				});
			});
			
			return g;
		}
		let graph = buildGraph();
		let renderer_options = {
			container: this.refs.container,
			clearColor: 0xFFFFFF,
			// first, set a custom layout:
			initPosition: getNodePosition,
			autoFit: false,
			node: createNodeUI,
			link: createLinkUI
		};
		
		if (this.props.location.pathname !== "/force") {
			renderer_options.createLayout = staticLayout;
			renderer_options.is3d = false;
		};
		
		let renderer = renderGraph(graph,renderer_options);
		
		function createNodeUI(node) {
			let color;
			switch(node.data.node_type) {
				case "midmarker":
					color = 0x90EE90;
					break;
				case "multimarker":
					color = 0xF0F8FF;
					break;
				case "segment":
					color = 0xD3D3D3;
					break;
				case "metabolite":
					color = 0xFFA500;
					break;
				default:
					console.warn(node);
			}
			return {
				color: color,
				size: 30+30*(+node.data.node_is_primary)
			};
		};
		
		function createLinkUI(link) {
			return {
				fromColor: 0x334E75,
				toColor: 0x334E75
			};
		}
		
		function getNodePosition(node) {
			// node is a regular ngraph.graph node
			// we can have access to its `data` or `id`, so if position is known:
			return {
				x: node.data.x,
				y: node.data.y,
				z: 0
			};
		}
		
		let camera = renderer.camera();
		Object.assign(camera.position, {x:18000,y:15000,z:-19000});
		Object.assign(camera.rotation, {x:Math.PI,y:0,z:0});
		camera.matrixWorldNeedsUpdate = true;
		console.log(renderer,camera);
	};
	
  render() {
    return (
      <div ref="container" style={s_pixel}>
      </div>
    );
  }
}

export default Pixel;
