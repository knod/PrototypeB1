/* Created 01/18/15

*/

'use strict'


// ==============
// SETUP
// ==============
// --- ThreeJS ---
var viewport = document.getElementById( 'viewport' );

// set the scene size
var WIDTH = viewport.width,
	HEIGHT = viewport.height;

// set some camera attributes
var VIEW_ANGLE = 45,
	ASPECT = WIDTH / HEIGHT,
	NEAR = 0.1,
	FAR = 10000;

var renderer = new THREE.WebGLRenderer({ canvas: viewport });
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
	VIEW_ANGLE, ASPECT, NEAR, FAR
);
// add the camera to the scene
// needed? (See threejs-test2.js)
scene.add(camera);
// the camera starts at 0,0,0, so pull it back
camera.position.z = 1000;
camera.position.set( WIDTH/2, HEIGHT/2, 1000 );

// create a point light
var pointLight = new THREE.PointLight(0xFFFFFF);
// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;
// add to the scene
scene.add(pointLight);


// --- Both ---
// Create scene objects
var playerPos = [ 0, 0, 0 ],
	playerSize = [ 40, 40, 40 ],
	playerIsStatic = false,
	playerAirFriction = 0.05,
	playerMoveSpeed = 0.003;

playerPos[1] = combo.convertYToMatterY( 0, HEIGHT );

//combo.box( World, Bodies, engine, scene, height, position, size, isStatic, airFriction, moveSpeed )
// var player = combo.box( World, Bodies, _engine, scene, HEIGHT,
// 	playerPos, playerSize, playerIsStatic, playerAirFriction, playerMoveSpeed );
// var playerMatter = player[0];
// var playerThree = player[1];
var playerThree = new THREE.Mesh( new THREE.BoxGeometry( 40, 40, 40 ), new THREE.MeshNormalMaterial() );
playerThree.position.x = 0;
playerThree.position.y = HEIGHT - 0;
playerThree.position.z = 0;
scene.add( playerThree );

var cubeB = new THREE.Mesh( new THREE.BoxGeometry( 80, 80, 80 ), new THREE.MeshNormalMaterial() );
cubeB.position.x = 500;
cubeB.position.y = HEIGHT - 50;
cubeB.position.z = 0;
scene.add( cubeB );


var axes = new THREE.AxisHelper(20)
scene.add(axes)


// set the geometry to dynamic so that it allow updates
playerThree.geometry.dynamic = true;
cubeB.geometry.dynamic = true;
axes.geometry.dynamic = true;




// // --- MatterJS ---
// // Aliases
// var Engine = Matter.Engine,
// 	World = Matter.World,
// 	Bodies = Matter.Bodies,
// 	Body = Matter.Body,
// 	Events = Matter.Events;

// var viewport = document.getElementById( 'viewport' );
// var docBody = document.body;

// var pixi = Matter.RenderPixi.create( {element: docBody, 
// 	// // canvas: viewport
// 	// options: { wireframe: false, background: 'transparent',
// 	// 	wireframes: false//,
// 	// 	// wireframeBackground: false 
// 	// }
// } );
// // pixi.options.background = 'transparent';

// // create a Matter.js engine
// var _engine = Engine.create(document.body, {render: pixi} );

// // Preparing for floatyness
// _engine.world.gravity.y = 0;


// // --- ThreeJS ---
// // Get the canvas from matterjs
// var matterCanvas = _engine.render.canvas;

// // From yansanmo
// var detectCanvasContext = function ( canvas ) {

// 	var s = ["2d", "webgl", "webgl2", "experimental-webgl", "experimental-webgl2"];
// 	var context = null; 
// 	for(var i = 0; i < s.length; i++) { 
// 		context = matterCanvas.getContext(s[i]); 
// 		if (context) { break; } 
// 	}

// 	// console.log(context);
// 	console.log(Object.prototype.toString.call(context));

// };  // end detectCanvasContext()

// detectCanvasContext( matterCanvas );




// // --- Both ---
// // ==============
// // UPDATE
// // ==============
// // atm, just for updating physics forces
// var afterUpdate = function ( event ) {

// 	// Render the scene with threejs
// 	renderer.render(scene, camera);

// };

// Events.on( _engine, "afterUpdate",  afterUpdate );


// Render the scene.
renderer.render(scene, camera);
// Engine.run(_engine);




/* Created 01/18/15

XXX Currently I get three canvases in a column - one gray,
one black, and one very dark gray.
Now I have two canvases, one gray and one dark gray, so
now I'm all set

I'm actually just trying to make everything transparent
so that the threejs stuff will show through.

The problem may be the new version of pixi.js, but I don't
know how to get the right version.
*/

'use strict'

// ==============
// SETUP
// ==============
// --- MatterJS ---
// Aliases
var Engine = Matter.Engine,
	World = Matter.World,
	Bodies = Matter.Bodies,
	Body = Matter.Body,
	Events = Matter.Events;

// var viewport = document.getElementById( 'viewport' );
var docBody = document.body;

// var pixi = Matter.RenderPixi.create( { element: docBody, 
// 	canvas: viewport
// 	, options: {

// 		// The wireframe stuff doesn't matter right now, just trying
// 		// to get canvas working
// 		// wireframe: false, 
// 		background: '#358d35',
// 	// 	wireframes: false//,
// 	// 	// wireframeBackground: false 

// 	}
// } );
// pixi.options.background = 'transparent';

// create a Matter.js engine
// var _engine = Engine.create(document.body, {render: pixi} );
// This gets me the error: "Uncaught ReferenceError: pixi is not defined"
// (When I tried this, I tried taking out the the var pixi)
// ^^^^ What happened to that error?
var _engine = Engine.create(document.body, {render: Matter.RenderPixi} );

// None of these work, I still have a black background
// _engine.render.options.background = "green";
// _engine.render.options.background = "#358d35";
_engine.render.options.background = "http://i.imgur.com/lDiR0tB.jpg";

// The canvas at the bottom of the page is the one that gets the events
var _sceneEvents = [];
// Still trying to change canvas background
_sceneEvents.push(

	Events.on(_engine, 'mousedown', function(event) {
		var mousePosition = event.mouse.position;
		console.log('mousedown at ' + mousePosition.x + ' ' + mousePosition.y);

		// None of these work either, whether I use pixi or _engine.render:
		
		// With this one nothing happens, didn't work with default render either
		// pixi.options.background = 'blue';

		// Gets me a file not found error, worked fine with default render
		// pixi.controller.setBackground( pixi, 'green' );
		
		// Worked with the default render, but doesn't with pixi
		_engine.render.canvas.style.background = "rgba(0, 0, 0, 0)";
	})

);


// Preparing for floatyness
_engine.world.gravity.y = 0;

Engine.run(_engine);
