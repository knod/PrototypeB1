/* 01/16/15

Resources:
http://rinesh.in/lab/airhockeywebgl/

*/

'use strict'

// Update graphics based on physics objects
var updateGraphics = function ( body, objectName ) {

  var object = scene.getChildByName(objectName); 
  if( body.somePositionProperty && object)
  {
    object.position.x = body.somePositionProperty.x;
	object.position.y = -body.somePositionProperty.y;
  }

};

