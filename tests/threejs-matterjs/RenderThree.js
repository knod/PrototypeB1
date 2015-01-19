/* Created 01/19/15

Attempt to create a threejs renderer for matterjs
Based on matter's RenderThree.js
*/


/**
* See [Demo.js](https://github.com/liabru/matter-js/blob/master/demo/js/Demo.js) 
* and [DemoMobile.js](https://github.com/liabru/matter-js/blob/master/demo/js/DemoMobile.js) for usage examples.
*
* @class RenderThree
*/

var RenderThree = {};

(function() {
    
    /**
     * Creates a new Pixi.js WebGL renderer
     * @method create
     * @param {object} options
     * @return {RenderThree} A new renderer
     */
    RenderThree.create = function( canvas ) {

    };

    /**
     * Clears the scene graph
     * @method clear
     * @param {RenderThree} render
     */
    RenderThree.clear = function(render) {
        
    };

    /**
     * Sets the background of the canvas 
     * @method setBackground
     * @param {RenderThree} render
     * @param {string} background
     */
    RenderThree.setBackground = function(render, background) {
       
    };

    /**
     * Description
     * @method world
     * @param {engine} engine
     */
    RenderThree.world = function( renderer, scene, camera ) {

		renderer.render(scene, camera);

    };


    /**
     * Description
     * @method constraint
     * @param {engine} engine
     * @param {constraint} constraint
     */
    RenderThree.constraint = function(engine, constraint) {

    };
    
    /**
     * Description
     * @method body
     * @param {engine} engine
     * @param {body} body
     */
    RenderThree.body = function(engine, body) {

    };

    /**
     * Creates a body sprite
     * @method _createBodySprite
     * @private
     * @param {RenderThree} render
     * @param {body} body
     * @return {PIXI.Sprite} sprite
     */
    var _createBodySprite = function(render, body) {

    };

    /**
     * Creates a body primitive
     * @method _createBodyPrimitive
     * @private
     * @param {RenderThree} render
     * @param {body} body
     * @return {PIXI.Graphics} graphics
     */
    var _createBodyPrimitive = function(render, body) {

    };

    /**
     * Gets the requested texture (a PIXI.Texture) via its path
     * @method _getTexture
     * @private
     * @param {RenderThree} render
     * @param {string} imagePath
     * @return {PIXI.Texture} texture
     */
    var _getTexture = function(render, imagePath) {

    };

})();

