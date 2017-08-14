import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";
import * as THREE from 'three';


const ThreeC_s = {
	minHeight: 'inherit'
};

class ThreeC extends Component {
	
	componentDidMount() {
		
		// Set the scene size.
		const WIDTH = this.container.clientWidth;
		const HEIGHT = this.container.clientHeight;
		
		// Set some camera attributes.
		const VIEW_ANGLE = 45;
		const ASPECT = WIDTH / HEIGHT;
		const NEAR = 0.1;
		const FAR = 10000;
		
		// Get the DOM element to attach to
		const container = this.container;
		
		// Create a WebGL renderer, camera
		// and a scene
		const renderer = new THREE.WebGLRenderer();
		const camera =
			new THREE.OrthographicCamera(
				WIDTH / - 2,
				WIDTH / 2,
				HEIGHT / 2,
				HEIGHT / - 2,
				NEAR,
				FAR );
			
			// new THREE.PerspectiveCamera(
			// 	VIEW_ANGLE,
			// 	ASPECT,
			// 	NEAR,
			// 	FAR
			// );
		
		const scene = new THREE.Scene();
		
		// Add the camera to the scene.
		scene.add(camera);
		
		// Start the renderer.
		renderer.setSize(WIDTH, HEIGHT);
		
		// Attach the renderer-supplied
		// DOM element.
		container.appendChild(renderer.domElement);
		
		
		
		
		
		// create the sphere's material
		const sphereMaterial =
			new THREE.MeshLambertMaterial(
				{
					color: 0xCC0000
				});
		
		
		
		// Set up the sphere vars
		const RADIUS = 50;
		const SEGMENTS = 16;
		const RINGS = 16;

// Create a new mesh with
// sphere geometry - we will cover
// the sphereMaterial next!
		const sphere = new THREE.Mesh(
			
			new THREE.SphereGeometry(
				RADIUS,
				SEGMENTS,
				RINGS),
			
			sphereMaterial);

// Move the Sphere back in Z so we
// can see it.
		sphere.position.z = -300;

// Finally, add the sphere to the scene.
// 		scene.add(sphere);
		
		let spriteMaterial = new THREE.SpriteMaterial( { color: 0xffffff } );
		let sprite = new THREE.Sprite( spriteMaterial );
		scene.add( sprite );
		sprite.position.z = -300;
		sprite.scale.multiplyScalar(100);
		console.dir(sprite);
		
		// create a point light
		const pointLight =
			new THREE.AmbientLight(0xFFFFFF,1);

// set its position
// 		pointLight.position.x = 10;
// 		pointLight.position.y = 50;
// 		pointLight.position.z = 130;

// add to the scene
		scene.add(pointLight);
		
		
		// Draw!
		renderer.render(scene, camera);
	}
	
	
	render() {
		
		return (
			<div ref={(container) => { this.container = container; }} style={ThreeC_s} />
		);
	}
}

export default ThreeC;
