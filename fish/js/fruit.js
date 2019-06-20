var fruitObj = function() {
	//bool	
	this.alive = [];
	this.x = [];
	this.y = [];
	this.aneN = [];
	this.len = [];
	this.speed = [];
	this.fruitType = [];

	//橙色果实
	this.orange = new Image();

	//蓝色果实
	this.blue = new Image();
}

fruitObj.prototype.num = 30;

fruitObj.prototype.init = function() {
	for(var i=0; i< this.num; i++) {
		this.alive[i] = true;
		this.x[i] = 0;
		this.y[i] = 0;
		this.aneN[i] = 0;
		this.speed[i] = Math.random() * 0.012 + 0.002;
		this.fruitType[i] = '';
	}

	this.orange.src = './images/fruit.png';
	this.blue.src = './images/blue.png';
}

fruitObj.prototype.draw = function() {
	for(var i=0; i<this.num; i++) {

		/*
			draw
			find ane
			grow
			fly
		*/
		if(this.alive[i]) {
			if(this.fruitType[i] == 'blue') {
				var pic = this.blue;
			}else {
				var pic = this.orange;
			}

			if(this.len[i] <= 15) {
				var num = this.aneN[i]
				this.x[i] = ane.headx[num];
				this.y[i] = ane.heady[num];
				this.len[i] += this.speed[i] * deltaTime;
				ctx2.drawImage(pic, this.x[i]-this.len[i]*0.5, this.y[i]-this.len[i]*0.5, this.len[i], this.len[i]);
			}else {
				this.y[i] -= this.speed[i] * 7 * deltaTime;
				ctx2.drawImage(pic, this.x[i]-this.len[i]*0.5, this.y[i]-this.len[i]*0.5, this.len[i], this.len[i]);
			}
			

			if(this.y[i] <  10) {
				this.alive[i] = false;
			}
		}		
	}
}


fruitObj.prototype.born = function(i) {
	// var aneId = Math.floor(Math.random() * ane.num);
	// this.x[i] = ane.x[aneId];
	// this.y[i] = ane.heady[aneId];
	this.aneN[i] = Math.floor(Math.random() * ane.num);
	this.len[i] = 0;
	this.alive[i] = true;
	var ran = Math.random();
	if(ran < 0.7) {
		this.fruitType[i] = "orange"
	}else {
		this.fruitType[i] =  "blue"
	}
	
}

fruitObj.prototype.dead = function(i) {
	this.alive[i] = false;
}


function fruitNum() {
	var num = 0;
	for(var i=0; i<fruit.num; i++) {
		if(fruit.alive[i]) {
			num++;
		}
	}

	if(num < fruitNums) {
		sendFruit()
		return;
	}
}

function sendFruit() {
	for(var i=0; i<fruit.num; i++) {
		if(!fruit.alive[i]) {
			fruit.born(i);
			return;
		}
	}
}