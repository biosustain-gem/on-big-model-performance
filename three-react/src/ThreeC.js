import React, {Component} from "react";
import "./App.css";
import * as THREE from "three";


const ThreeC_s = {
	minHeight: 'inherit'
};


// Set some camera attributes.
const NEAR = 0.1;
const FAR = 10000;

class ThreeC extends Component {
	constructor(props) {
		super(props);
	};
	
	componentWillMount() {
		// this.width = undefined;
		// this.height = undefined;
		// this.aspect = undefined;
		// this.container = undefined;
		// Create a WebGL renderer, camera
		// and a scene
		this.renderer = new THREE.WebGLRenderer();
		this.scene = new THREE.Scene();
	}
	
	componentDidMount() {
		// Set the scene size.
		this.width = this.container.clientWidth;
		this.height = this.container.clientHeight;
		
		// Create a WebGL renderer, camera
		// and a scene
		
		this.camera = new THREE.OrthographicCamera(
				this.width / -2,
				this.width / 2,
				this.height / 2,
				this.height / -2,
				NEAR,
				FAR);
		this.camera.position.z = 10000;
		this.camera.updateProjectionMatrix();
		
		// Start the renderer.
		this.renderer.setClearColor(new THREE.Color(0, 1));
		this.renderer.setSize(this.width, this.height);
		
		// Attach the renderer-supplied
		// DOM element.
		this.container.appendChild(this.renderer.domElement);
		
		this.mouseX = 0;
		this.mouseY = 0;

// 				// create the sphere's material
// 		const sphereMaterial =
// 			new THREE.MeshLambertMaterial(
// 				{
// 					color: 0xCC0000
// 				});
//
// 		// Set up the sphere vars
// 		const RADIUS = 50;
// 		const SEGMENTS = 16;
// 		const RINGS = 16;
//
// // Create a new mesh with
// // sphere geometry - we will cover
// // the sphereMaterial next!
// 		const sphere = new THREE.Mesh(
//
// 			new THREE.SphereGeometry(
// 				RADIUS,
// 				SEGMENTS,
// 				RINGS),
//
// 			sphereMaterial);
//
// // Move the Sphere back in Z so we
// // can see it.
// 		sphere.position.z = -300;
//
// // Finally, add the sphere to the scene.
// // 		scene.add(sphere);
//
// 		let spriteMaterial = new THREE.SpriteMaterial( { color: 0xffffff } );
// 		let sprite = new THREE.Sprite( spriteMaterial );
// 		this.scene.add( sprite );
// 		sprite.position.z = -300;
// 		sprite.scale.multiplyScalar(100);
// 		console.dir(sprite);
//
// 		// create a point light
// 		const pointLight =
// 			new THREE.AmbientLight(0xFFFFFF,1);
//
// // set its position
// // 		pointLight.position.x = 10;
// // 		pointLight.position.y = 50;
// // 		pointLight.position.z = 130;
//
// // add to the scene
// 		this.scene.add(pointLight);
		let onDocumentMouseMove = ( event ) => {
			this.mouseX = (event.clientX - window.innerWidth / 2)*0.01;
			this.mouseY = (event.clientY - window.innerHeight / 2)*0.01;
		};
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		
				let geometry = new THREE.Geometry();
				let sprite = new THREE.TextureLoader().load( "sprites/disk50.png" );
				for (let i = 0; i < 12000; i ++ ) {
					var vertex = new THREE.Vector3();
					vertex.x = 2000 * Math.random() - 1000;
					vertex.y = 2000 * Math.random() - 1000;
					vertex.z = 2000 * Math.random() - 1000;
					geometry.vertices.push( vertex );
				}
				let material = new THREE.PointsMaterial( { size: 35, sizeAttenuation: false, map: sprite, alphaTest: 0.5, transparent: true } );
				material.precision = "lowp";
				material.color.setHSL( 1.0, 0.3, 0.7 );
				let particles = new THREE.Points( geometry, material );
				this.scene.add( particles );
		
		var l_material = new THREE.LineBasicMaterial({
			color: 0x0000ff,
			linewidth: 1,
			linecap: 'round', //ignored by WebGLRenderer
			linejoin:  'round' //ignored by WebGLRenderer
		});
		material.precision = "lowp";
		
		var line = new THREE.Line(geometry, l_material);
		this.scene.add(line);
		
		this.scene.add(this.camera);
		
		let renderrr = () => {
			requestAnimationFrame(renderrr);
			var time = Date.now() * 0.00005;
			this.camera.position.set(this.camera.position.x+this.mouseX, this.camera.position.y-this.mouseY, this.camera.position.z);
			
			// this.camera.updateProjectionMatrix();
			this.renderer.render( this.scene, this.camera );
		};
		renderrr();
		
	}
	
	
	render() {
		
		return (
			<div ref={(container) => {
				this.container = container;
			}} style={ThreeC_s}/>
		);
	}
}

export default ThreeC;
