/* 01/15/2015

Resources:
https://github.com/liabru/matter-js/wiki/Getting-started#usage-examples
http://brm.io/matter-js-demo/
*/

'use strict'

// https://github.com/liabru/matter-js/wiki/Getting-started#usage-examples
// Matter.js module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create a Matter.js engine
var _engine = Engine.create(document.body);

// create two boxes and a ground
var playerBox = Bodies.rectangle(400, 200, 40, 40);
playerBox.frictionAir = 0.07;

var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
World.add(_engine.world, [playerBox, boxB, ground]);

// run the engine
Engine.run(_engine);


// ===================
// MY STUFF
// ===================
// Matter.js module aliases
var Body = Matter.Body;

// Must create _engine.render this way? Not in docs, derived from
// source code
var _render = _engine.render.controller.create(_engine.render)
_engine.render.controller.setBackground( _render, 'black' );

// Preparing for floatyness
_engine.world.gravity.y = 0;

// Events
var Events = Matter.Events,
	_sceneEvents = [];

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
		// _engine.render.canvas.style.background = "white";
	})

);

_sceneEvents.push(

	// an example of using mouse events on an engine.input.mouse
	Events.on(_engine, 'mouseup', function(event) {
		var mousePosition = event.mouse.position;
		// Works, not in docs, derived from source code
		_render.controller.setBackground( _render, 'black' );
		console.log('mouseup at ' + mousePosition.x + ' ' + mousePosition.y);
	})

);


// Movement
var moveSpeed = 0.05;

var moveForce = function ( body, xForce, yForce ) {


};  // end moveForce


var moveUp = function ( body ) {

	Body.applyForce( body, { x: 0, y: 0 }, { 
		x: 0, 
		y: -moveSpeed
	});

};  // end moveUp()

var moveDown = function ( body ) {

	Body.applyForce( body, { x: 0, y: 0 }, { 
		x: 0, 
		y: moveSpeed
	});

};  // end moveDown()

var moveLeft = function ( body ) {

	Body.applyForce( body, { x: 0, y: 0 }, { 
		x: -moveSpeed, 
		y: 0
	});

};  // end moveLeft()

var moveRight = function ( body ) {

	Body.applyForce( body, { x: 0, y: 0 }, { 
		x: moveSpeed, 
		y: 0
	});

};  // end moveRight()

// Diagonals
var moveUpLeft = function ( body ) {
	moveUp( body );
	moveLeft( body );
};  // end moveUpLeft()

var moveDownLeft = function ( body ) {
	moveDown( body );
	moveLeft( body );
};  // end moveDownLeft()

var moveUpRight = function ( body ) {
	moveUp( body );
	moveRight( body );
};  // end moveUpRight()

var moveDownRight = function ( body ) {
	moveDown( body );
	moveRight( body );
};  // end moveDownRight()

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

var moveUpPlayer = moveUp.bind( null, playerBox ),
	moveDownPlayer = moveDown.bind( null, playerBox ),
	moveLeftPlayer = moveLeft.bind( null, playerBox ),
	moveRightPlayer = moveRight.bind( null, playerBox ),
	moveUpLeftPlayer = moveUpLeft.bind( null, playerBox ),
	moveDownLeftPlayer = moveDownLeft.bind( null, playerBox ),
	moveUpRightPlayer = moveUpRight.bind( null, playerBox ),
	moveDownRightPlayer = moveDownRight.bind( null, playerBox );

// Up
keypressjs.register_combo({
    "keys"              : "w",
    "on_keydown"        : moveUpPlayer,
    "prevent_default"   : true
});

// Down
keypressjs.register_combo({
    "keys"              : "s",
    "on_keydown"        : moveDownPlayer,
    "prevent_default"   : true
});

// Left
keypressjs.register_combo({
    "keys"              : "a",
    "on_keydown"        : moveLeftPlayer,
    "prevent_default"   : true
});

// Right
keypressjs.register_combo({
    "keys"              : "d",
    "on_keydown"        : moveRightPlayer,
    "prevent_default"   : true
});
