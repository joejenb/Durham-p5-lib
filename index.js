var bullsEye1;
var zoomValue;
var angleValue;
var oscillate;
var surface;


function setup(){
	createCanvas(1300, 800, WEBGL);
	frameRate(35);
	bullsEye1 = new bullsEye();
	bullsEye1.setupCuboids();
}

function draw(){
	background(0);
	stroke(0)
	if (surface !== bullsEye1.surface){
		bullsEye1.surface = surface;
	}
	if (oscillate){
		bullsEye1.drill();
	}
	bullsEye1.changeColour();
	bullsEye1.changeAngle();
	if (surface){
		surface.background(0);
		bullsEye1.drawIt();
		surface.camera(angleValue, 0, round(zoomValue), 0, 0, 0, 0, 1, 0);
		camera(0, 0, 1000, 0, 0, 0, 0, 1, 0);
		rotateX(frameCount * 0.01)
		rotateY(frameCount * 0.01)
		texture(surface);
		box(470);
	}
	else{
		bullsEye1.drawIt();
		camera(angleValue, 0, round(zoomValue), 0, 0, 0, 0, 1, 0);
	}
}
document.addEventListener('DOMContentLoaded', function(){
	let depth = document.getElementById('depth');
	let zoom = document.getElementById('zoom');
	let angle = document.getElementById('angle');
	let osciCB = document.getElementById('oscillate');
  let cube = document.getElementById('cube');


	function changeDepth(event){
		bullsEye1.depth = depth.value;
	}
	function changeZoom(event){
		zoomValue = 5200 - zoom.value;
	}
	function changeAngle(event){
		angleValue = angle.value;
	}
	function changeOscillation(event){
		if (oscillate){
			oscillate = false;
		}
		else{
			oscillate = true;
		}
	}
  function changeToCube(event){
		if (surface){
			surface = undefined;
		}
		else{
			surface = createGraphics(470, 470, WEBGL);
		}
  }

	changeZoom();
	changeAngle();
	depth.addEventListener('input', changeDepth);
	zoom.addEventListener('input', changeZoom);
	angle.addEventListener('input', changeAngle);
	osciCB.addEventListener('change', changeOscillation);
	cube.addEventListener('change', changeToCube);
});
