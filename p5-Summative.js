class cuboid{
	constructor(dim, colour, angle, z, depth, surface){
		this.dim = dim;
		this._colour = colour || [0, 0, 0];
		this._angle = angle;
		this.z = z;
		this._depth = depth || 0;
		this._surface = surface;
	}

	set angle(angle){
		this._angle = angle;
	}

	get angle(){
		return this._angle;
	}

	set surface(surface){
		this._surface = surface;
	}

	set depth(depth){
		this._depth = depth;
	}

	set colour(colour){
		this._colour = colour;
	}

	get colour(){
		return this._colour;
	}

	drawIt(){
		if (this._surface){
			this._surface.fill(this._colour[0], this._colour[1], this._colour[2]);
			this._surface.push();
			this._surface.rotate(this._angle);
			this._surface.translate(0, 0, this._depth * this.z);
			this._surface.box(this.dim, this.dim, this._depth);
			this._surface.pop();
		}
		else{
			fill(this._colour[0], this._colour[1], this._colour[2]);
			push();
			rotate(this._angle);
			translate(0, 0, this._depth * this.z);
			box(this.dim, this.dim, this._depth);
			pop();
		}
	}
}

class bullsEye{
	constructor(surface){
		this.layers = 110;
		this.maxRot = PI / 10;
		this.maxAngle = PI * 3;
		this.defAngle = PI / 20;
		this.angleDif = -this.defAngle + (2 * this.defAngle * random(1));
		this.angleDifE = -this.defAngle + (2 * this.defAngle * random(1));
		this.angleFric = 0.7;
		this.colStep = 0.02;
		this.cuboids = [];
		this.movs = 0;
		this.destRot = this.maxAngle * random(1);
		this.noiseFactor = [random(123456), random(123456), random(123456)];
		this._depth = 0;
		this._surface = surface;
	}

	setupCuboids(){
		for (var i = 0; i < this.layers; i++){
			let dim = 4 + (i * 3);
			let angle = this.destRot + (i * this.angleDif);
			this.cuboids[i] = new cuboid(dim, undefined, angle, this.layers - i - 1);
		}
	}

	drawIt(){
		for (var i = this.layers - 1; i >= 0; i--){
			this.cuboids[i].drawIt();
		}
		this.movs += 1;
	}

	drill(){
		/* after one second, every time this.movs increaes by 35, want sin to output 1*/
		let depth = 10 + round(sin((this.movs * 2 * PI)/ 35) * 10);
		this._depth = depth * this.layers;
		for (var i = 0; i< this.layers; i++){
			this.cuboids[i].depth = depth;
		}
	}

	set surface(surface){
		this._surface = surface;
		for (var i = 0; i< this.layers; i++){
			this.cuboids[i].surface = surface;
		}
	}

	get surface(){
		return this._surface;
	}

	set depth(depth){
		this._depth = depth * this.layers;
		for (var i = 0; i< this.layers; i++){
			this.cuboids[i].depth = depth;
		}
	}


	changeColour(){
		for (var i = 0; i < this.layers; i++){
			let colour = this.cuboids[i].colour;
			for (var t = 0; t < 3; t++){
				if (i !== 0){
					let prevCol = this.cuboids[i - 1].colour;
					colour[t] += (prevCol[t] - colour[t]) - 1;
				}
				else{
					colour[t] = noise(this.noiseFactor[t] + (this.movs * this.colStep)) * 255;
				}
			}
			this.cuboids[i].colour = colour;
		}
	}

	changeAngle(){
		let newAngle = this.calcTween(this.cuboids[0].angle, this.destRot, random(0.1));
		if (Math.abs(newAngle - this.destRot) >= 0.000001){
			this.cuboids[0].angle = newAngle;
		}
		else{
			this.cuboids[0].angle = this.destRot;
			this.destRot = this.maxAngle * random(1);
		}
		this.angleDif = this.calcTween(this.angleDif, this.angleDifE, random(0.2));
		if (Math.abs(this.angleDif - this.angleDifE) < 0.00001){
			this.angleDifE = -this.defAngle + (2 * this.defAngle * random(1));
		}
		for (var i = 1; i < this.layers; i++){
			let rot = (this.cuboids[i - 1].angle - this.cuboids[i].angle + this.angleDif) * this.angleFric;
			if (Math.abs(rot) > this.maxRot){
				rot = this.maxRot * (rot / Math.abs(rot));
			}
			this.cuboids[i].angle = this.cuboids[i].angle + rot;
		}
	}

	calcTween(from, to, factor){
		let diff = to - from;
		diff *= factor;
		diff += from;
		return diff;
	}
}
