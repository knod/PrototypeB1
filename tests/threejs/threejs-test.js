/* 01/16/15

Resources:
http://blog.teamtreehouse.com/the-beginners-guide-to-three-js
http://learningthreejs.com/data/lets_do_a_cube/docs/lets_do_a_cube.html
http://www.tonicodes.net/blog/using-an-existing-canvas-element-for-three-js/
*/


'use strict'

// http://aerotwist.com/tutorials/getting-started-with-three-js/
// set the scene size
var WIDTH = 800,
	HEIGHT = 600;

// set some camera attributes
var VIEW_ANGLE = 45,
	ASPECT = WIDTH / HEIGHT,
	NEAR = 0.1,
	FAR = 10000;

var viewport = document.getElementById( 'viewport' );

// create a WebGL renderer, camera, and a scene
var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer({ canvas: viewport });

var camera = new THREE.PerspectiveCamera(
	VIEW_ANGLE,
	ASPECT,
	NEAR,
	FAR
);

// // Orthographic Camera Test, not working
// var camera = new THREE.OrthographicCamera(
// 	0, HEIGHT, 0, WIDTH, 100, -100
// );

// add the camera to the scene
scene.add(camera);

// the camera starts at 0,0,0, so pull it back
camera.position.z = 1000;
camera.position.set( WIDTH/2, HEIGHT/2, 1000 );
// // Orthographic Camera Test, not working
// camera.position.set(-30, 40, 30);

// Needed?
// renderer.setSize(WIDTH, HEIGHT);


// create a point light
var pointLight = new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add to the scene
scene.add(pointLight);


// Objects
var playerCube = new THREE.Mesh( new THREE.BoxGeometry( 40, 40, 40 ), new THREE.MeshNormalMaterial() );
playerCube.position.x = 400;
playerCube.position.y = HEIGHT - 200;
playerCube.position.z = 0;
scene.add( playerCube );

var cubeB = new THREE.Mesh( new THREE.BoxGeometry( 80, 80, 80 ), new THREE.MeshNormalMaterial() );
cubeB.position.x = 450;
cubeB.position.y = HEIGHT - 50;
cubeB.position.z = 0;
scene.add( cubeB );


var axes = new THREE.AxisHelper(20)
scene.add(axes)


// set the geometry to dynamic so that it allow updates
playerCube.geometry.dynamic = true;
cubeB.geometry.dynamic = true;
axes.geometry.dynamic = true;


// Renders the scene and updates the render as needed.
function animate() {

	// Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
	requestAnimationFrame(animate);

	// Render the scene.
	renderer.render(scene, camera);
	// controls.update();

}  // end animate()


animate();
