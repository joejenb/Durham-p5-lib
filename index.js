var bullsEye1;
var zoomValue;
var angleValue;
var oscillate;
var surface;


function setup(){
	createCanvas(windowWidth - 20, windowHeight - 120, WEBGL);
	frameRate(35);
	bullsEye1 = new BullsEye();
}

function draw(){
	bullsEye1.draw(surface);
	if (surface){
		surface.camera(angleValue, 0, round(zoomValue), 0, 0, 0, 0, 1, 0);
		camera(0, 0, 1000, 0, 0, 0, 0, 1, 0);	//Due to the size there must be one camera for the cube
		rotateX(frameCount * 0.01);						//and one for what's on its surface
		rotateY(frameCount * 0.01);	//Rotates the cordinate system for everything drawn after, within draw()
		texture(surface);	//Applies the renderer buffer to all surfaces after this point in the fucntion
		box(470);
	}
	else{
		camera(angleValue, 0, round(zoomValue), 0, 0, 0, 0, 1, 0);
	}
}
document.addEventListener('DOMContentLoaded', function(){
	/*Each function is called in response to a change in the state of a corresponding html
	input. Both changeOscillation() and changeToCube() use checkbox's */
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
		oscillate = osciCB.checked;
	}
	function changeToCube(event){
		/*If cube has just been clicked on or off then the renderer being used must
		be changed to the other of the two options*/
		if (cube.checked){
			surface = createGraphics(470, 470, WEBGL);
		}
		else{
			surface = undefined;
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
