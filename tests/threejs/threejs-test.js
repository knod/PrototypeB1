/* 01/16/15

Resources:
http://blog.teamtreehouse.com/the-beginners-guide-to-three-js
http://learningthreejs.com/data/lets_do_a_cube/docs/lets_do_a_cube.html
http://www.tonicodes.net/blog/using-an-existing-canvas-element-for-three-js/
*/


'use strict'

// http://aerotwist.com/tutorials/getting-started-with-three-js/
// set the scene size
var WIDTH = 400,
  HEIGHT = 300;

// set some camera attributes
var VIEW_ANGLE = 45,
  ASPECT = WIDTH / HEIGHT,
  NEAR = 0.1,
  FAR = 10000;

// get the DOM element to attach to
// - assume we've got jQuery to hand
// var $container = $('#container');

var viewport = document.getElementById('viewport');

// create a WebGL renderer, camera
// and a scene
var renderer = new THREE.WebGLRenderer({canvas: viewport });
var camera =
  new THREE.PerspectiveCamera(
    VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR);

var scene = new THREE.Scene();

// add the camera to the scene
scene.add(camera);

// the camera starts at 0,0,0
// so pull it back
camera.position.z = 700;

// // start the renderer
// renderer.setSize(WIDTH, HEIGHT);

// // attach the render-supplied DOM element
// // $container.append(renderer.domElement);
// document.body.appendChild(renderer.domElement);


// create a point light
var pointLight =
  new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add to the scene
scene.add(pointLight);


// Objects
// // set up the sphere vars
// var radius = 50,
//     segments = 16,
//     rings = 16;

// // create the sphere's material
// var sphereMaterial =
//   new THREE.MeshLambertMaterial(
//     {
//       color: 0xCC0000
//     });

// // create a new mesh with
// // sphere geometry - we will cover
// // the sphereMaterial next!
// var sphere = new THREE.Mesh(

//   new THREE.SphereGeometry(
//     radius,
//     segments,
//     rings),

//   sphereMaterial);

// scene.add(sphere);

// // set the geometry to dynamic
// // so that it allow updates
// sphere.geometry.dynamic = true;


var playerCube = new THREE.Mesh( new THREE.BoxGeometry( 40, 40, 40 ), new THREE.MeshNormalMaterial() );
playerCube.position.x = 0;
playerCube.position.y = 0;
playerCube.position.z = 0;
scene.add( playerCube );

var cubeB = new THREE.Mesh( new THREE.BoxGeometry( 40, 40, 40 ), new THREE.MeshNormalMaterial() );
cubeB.position.x = 450;
cubeB.position.y = 50;
scene.add( cubeB );


// draw!
renderer.render(scene, camera);


// Mostly http://blog.teamtreehouse.com/the-beginners-guide-to-three-js
// var scene, camera, renderer,
// 	// controls,
// 	playerCube, cubeB;
 
// // Will be called when screen is resized
// var resizeScene = function () {

// 	var WIDTH = window.innerWidth,
//           HEIGHT = window.innerHeight;
//       renderer.setSize(WIDTH, HEIGHT);
//       camera.aspect = WIDTH / HEIGHT;
//       camera.updateProjectionMatrix();

// };


// var init = function () {

// 	// Create the scene and set the scene size.
// 	scene = new THREE.Scene();
// 	var WIDTH = window.innerWidth,
// 		HEIGHT = window.innerHeight;

// 	// Create a renderer and add it to the DOM.
// 	renderer = new THREE.WebGLRenderer( {antialias:true} );
// 	renderer.setSize( WIDTH, HEIGHT );
// 	document.body.appendChild( renderer.domElement );

// 	// Create a camera, zoom it out from the model a bit, and add it to the scene.
// 	camera = new THREE.PerspectiveCamera( 0, WIDTH / HEIGHT, 0.1, 1000 );
// 	camera.position.set( 0, 0, 60 );
// 	scene.add( camera );

// 	// Create an event listener that resizes the renderer with the browser window.
// 	window.addEventListener( 'resize', resizeScene );


// 	// Set the background color of the scene.
// 	renderer.setClearColor( 0x333F47, 1 );

// 	// Create a light, set its position, and add it to the scene.
// 	var light = new THREE.PointLight( 0xffffff );
// 	light.position.set( -100, 200, 100 );
// 	scene.add(light);


// 	// Objects
// 	playerCube = new THREE.Mesh( new THREE.BoxGeometry( 40, 40, 40 ), new THREE.MeshNormalMaterial() );
// 	playerCube.position.x = 0;
// 	playerCube.position.y = 0;
// 	playerCube.position.z = 0;
// 	scene.add( playerCube );

// 	cubeB = new THREE.Mesh( new THREE.BoxGeometry( 40, 40, 40 ), new THREE.MeshNormalMaterial() );
// 	cubeB.position.x = 450;
// 	cubeB.position.y = 50;
// 	scene.add( cubeB );


// 	// // Add OrbitControls so that we can pan around with the mouse.
// 	// controls = new THREE.OrbitControls(camera, renderer.domElement);

// };  // end init()


// // Renders the scene and updates the render as needed.
// function animate() {

// 	// Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
// 	requestAnimationFrame(animate);

// 	// Render the scene.
// 	renderer.render(scene, camera);
// 	// controls.update();

// }  // end animate()


// init();
// animate();
