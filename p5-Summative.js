class square{
  constructor(dim, colour, angle, z){
    this.dim = dim;
    this.colour = colour;
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

  draw(zStep){
    fill(this.colour[0], this.colour[1], this.colour[2]);
    pushMatrix();
    rotate(this.angle);
    translate(0, 0, zStep * this.z);
    rect(0, 0, this.dim. this.dim);
    popMatrix();
  }
}

/*    rot = (prevAngle - this.angle + defAngle) * angleFriction;
    if (rot > this.maxRot){
      rot = this.maxRot
    }
    else if (rot < -this.maxRot){
      rot = -this.maxRot
    }
    this.angle = rot
*/
