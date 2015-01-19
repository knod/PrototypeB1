/* Created 01/17/15

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
