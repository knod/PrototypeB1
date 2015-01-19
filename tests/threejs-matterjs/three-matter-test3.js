/* Created 01/17/15
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

var _engine = Engine.create({
    render: {
        element: document.body,
        controller: RenderThree,
    }
});

// Preparing for floatyness
_engine.world.gravity.y = 0;

Engine.run(_engine);
