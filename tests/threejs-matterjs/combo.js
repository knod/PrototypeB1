/* 01/17/15

Resources:
http://rinesh.in/lab/airhockeywebgl/
*/

'use strict'


// ==============
// COMBINE THREEJS WITH MATTERJS VALUES
// ==============
// TODO: Give own combo script
var combo = {};

combo.convertYToMatterY = function ( yPos, height ) {

	return yPos + height;	

};  // end combo.convertYToMatterY()

// Update graphics based on physics objects
combo.updateGraphicsToPhysics = function ( body, object, height ) {
	
	if( body.position && object ) {
		object.position.x = body.position.x;
		object.position.y = height - body.position.y;
	}

};  // end combo.matchGraphicsToPhysics()

// Gives Matterjs Object "body" custom properties for our project
combo.setMatterObjectDefaults = function ( body ) {

	body.threeObj = null;

	body.moveSpeed = 0.003;
	body.xImpulse = 0;
	body.yImpulse = 0;

	// These don't actually move the object, but the prepare the
	// object to be moved on update
	body.moveLeft = function () { this.xImpulse = -moveSpeed; };  // end moveLeft()
	body.moveRight = function () { this.xImpulse = moveSpeed; };  // end moveRight()
	body.moveUp = function () { this.yImpulse = -moveSpeed; };  // end moveUp()
	body.moveDown = function () { this.yImpulse = moveSpeed; };  // end moveDown()
	body.zeroXForce = function () { this.xImpulse = 0; };  // end zeroXForce()
	body.zeroYForce = function () { this.yImpulse = 0; };  // end zeroYForce()

	return body;

};  // end combo.setMatterObjectDefaults()


// Possible to have fewer parameters while still keeping
// this function isolated?
combo.box = function ( World, Bodies, engine, scene, height, position, size, isStatic, airFriction, moveSpeed ) {
/* Creates a matterjs rectangle and a threejs cube, gives
them additional properties (just a hack atm), matches
their sizes and positions, then returns a list of both
objects.
*/

	var posX = position[0],
		matterPosY = position[1],
		posZ = position[2];
	var sizeX = size[0],
		sizeY = size[1],
		sizeZ = size[2];

	// Matterjs
	var matterBox = Bodies.rectangle( 
		posX, matterPosY, 
		sizeX, sizeY, 
		{isStatic: isStatic} 
	);
	matterBox.frictionAir = airFriction;
	World.add( engine.world, [ matterBox ] );

	// Threejs
	var threeCube = new THREE.Mesh( 
		new THREE.BoxGeometry( sizeX, sizeY, sizeZ ), 
		new THREE.MeshNormalMaterial() 
	);
	scene.add( threeCube );

	// Set up default properties
	// Gives values to impulses and moveSpeed, etc.
	matterBox = combo.setMatterObjectDefaults( matterBox );

	// Change default properties
	// Give the matterBox the threeCube in a property?
	// In that case, maybe don't need to send both
	// to updateGraphics... and don't need to return
	// both?
	matterBox.threeObj = threeCube;
	if (moveSpeed) { matterBox.moveSpeed = moveSpeed; }

	// Match x and y pos using matterjs, then set z pos
	combo.updateGraphicsToPhysics( matterBox, threeCube, height );
	threeCube.position.z = posZ;

	// Add to list of objects?

	return [ matterBox, threeCube ];

};  // end combo.box()


combo.createSphere = function () {



};  // end combo.sphere()

// Create box and circle?