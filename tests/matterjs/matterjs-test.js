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
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
World.add(_engine.world, [boxA, boxB, ground]);

// run the engine
Engine.run(_engine);


// ===================
// MY STUFF
// ===================
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

// Keyboard Events (testing)
// var _canvas = _render.canvas;

document.addEventListener( "keydown", function (event) {

	_render.controller.setBackground( _render, 'green' );

});

document.addEventListener( "keyup", function (event) {

	_render.controller.setBackground( _render, 'black' );

});


