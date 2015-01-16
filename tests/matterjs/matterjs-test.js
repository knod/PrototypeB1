/* 01/15/2015

Resources:
https://github.com/liabru/matter-js/wiki/Getting-started#usage-examples
http://brm.io/matter-js-demo/
http://dmauro.github.io/Keypress/
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
playerBox.frictionAir = 0.05;

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
var moveSpeed = 0.01;

var moveForce = function ( body, xForce, yForce ) {

	Body.applyForce( body, { x: 0, y: 0 }, { 
		x: xForce, 
		y: yForce
	});

};  // end moveForce()

var moveUp = function ( body ) {
	moveForce( body, 0, -moveSpeed );
};  // end moveUp()

var moveDown = function ( body ) {
	moveForce( body, 0, moveSpeed );
};  // end moveDown()

var moveLeft = function ( body ) {
	moveForce( body, -moveSpeed, 0 );
};  // end moveLeft()

var moveRight = function ( body ) {
	moveForce( body, moveSpeed, 0 );
};  // end moveRight()

// Diagonals
var moveLeftUp = function ( body ) {
	moveForce( body, -moveSpeed, -moveSpeed );
};  // end moveUpLeft()

var moveLeftDown = function ( body ) {
	moveForce( body, -moveSpeed, moveSpeed );
};  // end moveDownLeft()

var moveRightUp = function ( body ) {
	moveForce( body, moveSpeed, -moveSpeed );
};  // end moveUpRight()

var moveRightDown = function ( body ) {
	moveForce( body, moveSpeed, moveSpeed );
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
	moveLeftUpPlayer = moveLeftUp.bind( null, playerBox ),
	moveLeftDownPlayer = moveLeftDown.bind( null, playerBox ),
	moveRightUpPlayer = moveRightUp.bind( null, playerBox ),
	moveRightDownPlayer = moveRightDown.bind( null, playerBox );

// !!!!! I think the delay until key repeat is causing the
// lurch. I think I need to have a key up and key down
// event, but I'm not sure how to do that with diagonals

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

// Diagonals with horizontals acting as modifier keys
// Left Up
keypressjs.register_combo({
    "keys"              : "a w",
    "on_keydown"        : moveLeftUpPlayer,
    "prevent_default"   : true
});

// Left Down
keypressjs.register_combo({
    "keys"              : "a s",
    "on_keydown"        : moveLeftDownPlayer,
    "prevent_default"   : true
});

// Right Up
keypressjs.register_combo({
    "keys"              : "d w",
    "on_keydown"        : moveRightUpPlayer,
    "prevent_default"   : true
});

// Right Down
keypressjs.register_combo({
    "keys"              : "d s",
    "on_keydown"        : moveRightDownPlayer,
    "prevent_default"   : true
});

// Diagonals with veritcals acting as modifier keys
// Left Up
keypressjs.register_combo({
    "keys"              : "w a",
    "on_keydown"        : moveLeftUpPlayer,
    "prevent_default"   : true
});

// Left Down
keypressjs.register_combo({
    "keys"              : "s a",
    "on_keydown"        : moveLeftDownPlayer,
    "prevent_default"   : true
});

// Right Up
keypressjs.register_combo({
    "keys"              : "w d",
    "on_keydown"        : moveRightUpPlayer,
    "prevent_default"   : true
});

// Right Down
keypressjs.register_combo({
    "keys"              : "s d",
    "on_keydown"        : moveRightDownPlayer,
    "prevent_default"   : true
});

