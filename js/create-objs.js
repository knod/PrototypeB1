// Created 01/14/15

var b2Vec2 = Box2D.Common.Math.b2Vec2,
        /**/b2BodyDef = Box2D.Dynamics.b2BodyDef,
        b2Body = Box2D.Dynamics.b2Body,
        /**/b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
        b2Fixture = Box2D.Dynamics.b2Fixture,
        b2World = Box2D.Dynamics.b2World,
        b2MassData = Box2D.Collision.Shapes.b2MassData,
        b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
        b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
        b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
        /**/bodyDef = new b2BodyDef, // `bodyDef` will describe the type of bodies we're creating
    
    // Create a fixture definition
    //  `density` represents kilograms per meter squared.
    //        a denser object will have greater mass
    //    `friction` describes the friction between two objects
    //    `restitution` is how much "bounce" an object will have
    //        "0.0" is no restitution, "1.0" means the object won't lose velocity
    /**/fixDef = new b2FixtureDef;
fixDef.density = 1.0;
fixDef.friction = 0.3;
fixDef.restitution = 0.3;


function createRound ( scene, world, ball_geometry, ball_material, radius, x, y ) {

	// THREE.js
	ball = new THREE.Mesh( ball_geometry, ball_material );
    scene.add( ball );

	fixDef.shape = new b2CircleShape;
    fixDef.shape.SetRadius( radius );

    bodyDef.type = b2Body.b2_dynamicBody; // balls can move
    bodyDef.position.x = ball.position.x = x;
    bodyDef.position.y = ball.position.y = y;
    bodyDef.userData = ball; // Keep a reference to `ball`
    world.CreateBody( bodyDef ).CreateFixture( fixDef ); // Add this physics body to the world

};


function createCube () {};


