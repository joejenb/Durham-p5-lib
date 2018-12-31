var bullsEye1;
class square{
  constructor(dim, colour, angle, z){
    this.dim = dim;
    this.colour = colour || [0, 0, 0];
    this.angle = angle;
    this.z = z;
  }

  setAngle(angle){
    this.angle = angle;
  }

  getAngle(){
    return this.angle;
  }

  setColour(colour){
    this.colour = colour;
  }

  getColour(){
    return this.colour;
  }

  drawIt(zStep){
    fill(this.colour[0], this.colour[1], this.colour[2]);
    push();
    rotate(this.angle);
    //translate(0, 0, -zStep * this.z);
    rect(0, 0, this.dim, this.dim);
    pop();
  }
}

class bullsEye{
  constructor(){
    this.layers = 110;
    this.zStep = 7;
    this.maxRot = Math.PI / 10;
    this.maxAngle = Math.PI * 3;
    this.defAngle = Math.PI / 20;
    this.angleDif = -this.defAngle + (2 * this.defAngle * random(1));
    this.angleDifE = -this.defAngle + (2 * this.defAngle * random(1));
    this.angleFric = 0.7;
    this.colStep = 0.02;
    this.squares = [];
    this.movs = 0;
    this.destRot = this.maxAngle * random(1);
    this.noiseFactor = [random(123456), random(123456), random(123456)];
  }

  setupSquares(){
    for (var i = 0; i < this.layers; i++){
      let dim = 4 + (i * 3);
      let angle = this.destRot + (i * this.angleDif);
      this.squares[i] = new square(dim, undefined, angle, i);
    }
  }

  drawIt(){
    for (var i = this.layers - 1; i >= 0; i--){
      this.squares[i].drawIt(this.zStep);
    }
    this.movs += 1;
  }

  changeColour(){
    for (var i = 0; i < this.layers; i++){
      let colour = this.squares[i].getColour();
      for (var t = 0; t < 3; t++){
        if (i !== 0){
					let prevCol = this.squares[i - 1].getColour();
          colour[t] += (prevCol[t] - colour[t]) - 0x000001;
        }
        else{
          colour[t] = noise(this.noiseFactor[t] + (this.movs * this.colStep)) * 255;
        }
      }
      this.squares[i].setColour(colour);
    }
  }

  changeAngle(){
    let newAngle = this.calcTween(this.squares[0].getAngle(), this.destRot, random(0.1));
    if (Math.abs(newAngle - this.destRot) >= 0.000001){
      this.squares[0].setAngle(newAngle);
    }
    else{
      this.squares[0].setAngle(this.destRot);
      this.destRot = this.maxAngle * random(1);
    }
    this.angleDif = this.calcTween(this.angleDif, this.angleDifE, random(0.2));
    if (Math.abs(this.angleDif - this.angleDifE) < 0.00001){
      this.angleDifE = -this.defAngle + (2 * this.defAngle * random(1));
    }
    for (var i = 1; i < this.layers; i++){
      let rot = (this.squares[i - 1].getAngle() - this.squares[i].getAngle() + this.angleDif) * this.angleFric;
      if (Math.abs(rot) > this.maxRot){
        rot = this.maxRot * (rot / Math.abs(rot));
      }
      this.squares[i].setAngle(this.squares[i].getAngle() + rot);
    }
  }

  calcTween(from, to, factor){
    let diff = to - from;
    diff *= factor;
    diff += from;
    return diff;
  }
}



function setup(){
  createCanvas(800, 600, P2D);
  frameRate(25);
  strokeWeight(2);
  stroke(0, 0, 0, 90);
  rectMode(CENTER);
	bullsEye1 = new bullsEye();
  bullsEye1.setupSquares();
}

function draw(){
	background(0);
	translate(400, 300);
  bullsEye1.changeColour();
  bullsEye1.changeAngle();
  bullsEye1.drawIt();
}
