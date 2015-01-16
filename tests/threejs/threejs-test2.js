/* Created 01/16/15

From uflaig
Working here: http://91.38.75.15//three.js/knod/
http://91.38.75.15//three.js/knod/main.js
*/
var scene = new THREE.Scene();

var camera = new THREE.OrthographicCamera(innerWidth/ -8, innerWidth / 8, innerHeight / 8, innerHeight / -8 , 1, 1000);
camera.position.set(-30, 40, 30);


axes = new THREE.AxisHelper(20)
scene.add(axes)

var playerCube = new THREE.Mesh( new THREE.CubeGeometry( 40, 40, 40 ), new THREE.MeshNormalMaterial() );
playerCube.position.set(40,0,40);
scene.add(playerCube);

camera.lookAt(axes.position);


var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xEEEEEE, 1.0);
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMapEnabled = true;
renderScene();

$(document).ready(function()
{
	document.getElementById('WebGL-output').appendChild(renderer.domElement)
});

function renderScene()
{
	requestAnimationFrame(renderScene)
	renderer.render(scene,camera)
	// playerCube.rotation.y += 0.01;
}
