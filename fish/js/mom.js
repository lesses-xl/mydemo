var momObj = function() {
	this.x ;
	this.y ;
	this.angle;
	this.bigEye = new Image();
	this.bigBody = new Image();
	this.bigTail = new Image();

	this.bigTailTimer = 0;
	this.bigTailCount = 0;

	this.bigEyeTimer = 0;
	this.bigEyeCount = 0;
	this.bigEyeInterval = 1000;

	this.momBodyCount = 0;
}

momObj.prototype.init = function() {
	this.x = canWidth * 0.5;
	this.y = canHeight * 0.5;
	this.angle = 0;
}

momObj.prototype.draw = function() {

	//lerp x,y
	this.x = lerpDistance(mx,this.x,0.97);
	this.y = lerpDistance(my,this.y,0.97);

	//delta angel
	//Math.atan2(y,x);	
	var deltaX = mx - this.x;
	var deltaY = my - this.y;
	var beta = Math.atan2(deltaY,deltaX) + Math.PI;

	//lerp angel
	this.angle =  lerpAngle(beta,this.angle,0.6);

	//鱼尾巴计数
	this.bigTailTimer += deltaTime;
	if(this.bigTailTimer > 50) {
		this.bigTailCount = (this.bigTailCount +1) % 8;
		this.bigTailTimer %= 50;
	}

	//鱼眼睛计数
	this.bigEyeTimer += deltaTime;
	if(this.bigEyeTimer > this.bigEyeInterval) {
		this.bigEyeCount = (this.bigEyeCount + 1) % 2;
		this.bigEyeTimer %= this.bigEyeInterval;

		if(this.bigEyeCount == 0) {
			this.bigEyeInterval = Math.random() * 1500 + 2000; 
		}else {
			this.bigEyeInterval = 200;
		}
	}


	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	ctx1.drawImage(bigTails[this.bigTailCount],-bigTails[this.bigTailCount].width * 0.5 + 30, -bigTails[this.bigTailCount].height * 0.5);

	var momBodyCount = this.momBodyCount;
	if(data.doubles == 1) {
		ctx1.drawImage(bigBodyO[momBodyCount],-bigBodyO[momBodyCount].width * 0.5, -bigBodyO[momBodyCount].height * 0.5);
	}else {
		ctx1.drawImage(bigBodyB[momBodyCount],-bigBodyB[momBodyCount].width * 0.5, -bigBodyB[momBodyCount].height * 0.5);
	}
	


	ctx1.drawImage(bigEyes[this.bigEyeCount], -bigEyes[this.bigEyeCount].width * 0.5, -bigEyes[this.bigEyeCount].height * 0.5);	
	ctx1.restore();
}