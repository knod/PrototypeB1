/* Created 01/16/15

*/

'use strict'


// ==============
// MOVING PLAYER
// ==============
// Should this be in the matterjs object itself?
var moveForce = function ( body, xForce, yForce ) {

	Body.applyForce( body, { x: 0, y: 0 }, { 
		x: xForce, 
		y: yForce
	});

};  // end moveForce()


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

var viewport = document.getElementById( 'viewport' );
var docBody = document.body;

var pixi = Matter.RenderPixi.create( {element: docBody, 
	// // canvas: viewport
	// options: { wireframe: false, background: 'transparent',
	// 	wireframes: false//,
	// 	// wireframeBackground: false 
	// }
} );
// pixi.options.background = 'transparent';

// create a Matter.js engine
var _engine = Engine.create(document.body, {render: pixi} );

// Preparing for floatyness
_engine.world.gravity.y = 0;


// --- ThreeJS ---
// Get the canvas from matterjs
var matterCanvas = _engine.render.canvas;

// From yansanmo
var detectCanvasContext = function ( canvas ) {

	var s = ["2d", "webgl", "webgl2", "experimental-webgl", "experimental-webgl2"];
	var context = null; 
	for(var i = 0; i < s.length; i++) { 
		context = matterCanvas.getContext(s[i]); 
		if (context) { break; } 
	}

	// console.log(context);
	console.log(Object.prototype.toString.call(context));

};  // end detectCanvasContext()

detectCanvasContext( matterCanvas );

// set the scene size
var WIDTH = matterCanvas.width,
	HEIGHT = matterCanvas.height;

// set some camera attributes
var VIEW_ANGLE = 45,
	ASPECT = WIDTH / HEIGHT,
	NEAR = 0.1,
	FAR = 10000;

var renderer = new THREE.WebGLRenderer({ canvas: matterCanvas });
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
var player = combo.box( World, Bodies, _engine, scene, HEIGHT,
	playerPos, playerSize, playerIsStatic, playerAirFriction, playerMoveSpeed );
var playerMatter = player[0];
var playerThree = player[1];

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


// ==============
// INPUT
// ==============
// Keypress library
var keypressjs = new window.keypress.Listener();

// Template
keypressjs.register_combo({
    "keys"              : null,
    "on_keydown"        : null,
    "on_keyup"          : null,
    "on_release"        : null,
    "this"              : undefined,
    "prevent_default"   : false,
    "prevent_repeat"    : false,
    "is_unordered"      : false,
    "is_counting"       : false,
    "is_exclusive"      : false,
    "is_solitary"       : false,
    "is_sequence"       : false
});

// Up
keypressjs.register_combo({
    "keys"              : "w",
    "on_keydown"        : player.moveUp,
    "on_keyup"          : player.zeroYForce,
    "prevent_default"   : true
});

// Down
keypressjs.register_combo({
    "keys"              : "s",
    "on_keydown"        : player.moveDown,
    "on_keyup"          : player.zeroYForce,
    "prevent_default"   : true
});

// Left
keypressjs.register_combo({
    "keys"              : "a",
    "on_keydown"        : player.moveLeft,
    "on_keyup"          : player.zeroXForce,
    "prevent_default"   : true
});

// Right
keypressjs.register_combo({
    "keys"              : "d",
    "on_keydown"        : player.moveRight,
    "on_keyup"          : player.zeroXForce,
    "prevent_default"   : true
});


// --- Both ---
// ==============
// UPDATE
// ==============
// atm, just for updating physics forces
var afterUpdate = function ( event ) {
	// The payload

	var bodies = Matter.Composite.allBodies( event.source.world );


    for (var bodyIndx = 0; bodyIndx < bodies.length; bodyIndx++) {
        var body = bodies[ bodyIndx ];

		// Don't always do the whole calculation
		// There will be a lot of times without movement methinks
        if ( body.xImpulse != 0 || body.yImpulse != 0 ) {
        	console.log("impulse");
        	moveForce( body, body.xImpulse, body.yImpulse );
        }

        if ( body.threeObj ) {
			combo.updateGraphicsToPhysics( body, body.threeObj, HEIGHT );
        }

	}

	// Render the scene with threejs
	renderer.render(scene, camera);

};

Events.on( _engine, "afterUpdate",  afterUpdate );


var _sceneEvents = [];
var _render = _engine.render.controller.create(_engine.render)
_sceneEvents.push(

	// an example of using mouse events on an engine.input.mouse
	Events.on(_engine, 'mousedown', function(event) {
		var mousePosition = event.mouse.position;
		console.log('mousedown at ' + mousePosition.x + ' ' + mousePosition.y);
		// From Demo, doesn't work
		_engine.render.options.background = 'blue';
		// Works, not in docs, derived from source code
		_render.controller.setBackground( _render, 'green' );
		// Works, but it's in the lib's definition, so not sure I should use
		_engine.render.canvas.style.background = "white";
	})

);


// Render the scene.
renderer.render(scene, camera);
Engine.run(_engine);
