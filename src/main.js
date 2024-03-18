import "./main.css"
import {
	ImageLoader,
	PlaneGeometry,
	BufferAttribute,
	PointsMaterial,
	Points,
} from "three"
import { setupScene } from "./setup-scene"

// Canvas

const canvas = document.createElementNS( "http://www.w3.org/1999/xhtml", "canvas" )
document.body.insertBefore( canvas, document.body.firstElementChild )

// Basic setup

const { scene } = setupScene( { canvas } )

//

const loader = new ImageLoader().setPath( "/assets/textures" )

loader.load( "/cat.png", image => {

	const colors = extractColors( image )

	const geometry = new PlaneGeometry( 100, 100, image.width - 1, image.height - 1 ).rotateX( - Math.PI / 2 )
	geometry.setAttribute( "color", new BufferAttribute( colors, 4 ) )
	const material = new PointsMaterial( {
		transparent: true,
		vertexColors: true,
		sizeAttenuation: false,
		size: 4,
	} )
	const object = new Points( geometry, material )
	scene.add( object )
} )

function extractColors( image ) {

	const canvas = document.createElement( "canvas" )
	canvas.width = image.width
	canvas.height = image.height

	const context = canvas.getContext( "2d" )

	const size = image.width * image.height
	const colors = new Float32Array( size * 4 )

	context.drawImage( image, 0, 0 )

	const pixels = context.getImageData( 0, 0, image.width, image.height ).data

	for ( let i = 0; i < pixels.length; i += 4 ) {

		const R = pixels[ i + 0 ] / 255
		const G = pixels[ i + 1 ] / 255
		const B = pixels[ i + 2 ] / 255
		const A = pixels[ i + 3 ] / 255

		colors[ i + 0 ] = R
		colors[ i + 1 ] = G
		colors[ i + 2 ] = B
		colors[ i + 3 ] = A
	}

	return colors
}
