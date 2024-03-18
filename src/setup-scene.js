import {
	Scene,
	PerspectiveCamera,
	AmbientLight,
	DirectionalLight,
	WebGLRenderer,
} from "three"
import Stats from "three/addons/libs/stats.module.js"

import { MapControls } from "three/addons/controls/MapControls"

export function setupScene( { canvas } ) {

	// Scene

	const scene = new Scene()

	// Camera

	const FOV = 45 // Field of view
	const ASPECT = window.innerWidth / window.innerHeight
	const NEAR = 0.1
	const FAR = 2_000

	const camera = new PerspectiveCamera( FOV, ASPECT, NEAR, FAR )
	camera.position.set( - 50, 50, 50 )
	camera.lookAt( 0, 0, 0 )

	// Renderer

	const renderer = new WebGLRenderer( {
		canvas,
		antialias: true,
	} )

	renderer.setPixelRatio( window.devicePixelRatio )
	renderer.setSize( window.innerWidth, window.innerHeight )

	// Controls

	const controls = new MapControls( camera, canvas )
	// controls.maxPolarAngle = Math.PI / 2 - 0.1
	controls.maxTargetRadius = 150
	controls.minDistance = 10
	controls.maxDistance = 300

	// FPS Monitor

	const stats = new Stats()
	document.body.insertBefore( stats.dom, document.body.firstElementChild )

	// On resize

	window.addEventListener( "resize", () => {
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
		renderer.setSize( window.innerWidth, window.innerHeight )
	} )

	// Animation (optional)

	renderer.setAnimationLoop( () => {

		renderer.render( scene, camera )

		stats.update()
	} )

	//

	return {
		scene,
	}
}
