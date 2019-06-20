var babyObj = function() {
	this.x;
	this.y;
	this.angle;
	this.babyEye = new Image();
	this.babyBody = new Image();
	this.babyTail = new Image();

	this.babyTailTimer = 0;
	this.babyTailCount = 0;

	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 1000;

	this.babyBodyTimer = 0;
	this.babyBodyCount = 0;
}

babyObj.prototype.init = function() {
	this.x = canWidth * 0.5 - 50;
	this.y = canHeight * 0.5 + 50;
	this.angle = 0;
	this.babyBody.src = './images/babyFade0.png';
}

babyObj.prototype.draw = function() {

	//lerp x,y
	this.x = lerpDistance(mom.x,this.x,0.97);
	this.y = lerpDistance(mom.y,this.y,0.97);

	//lerp angle
	var deltaX = mom.x - this.x;
	var deltaY = mom.y - this.y;
	var beta = Math.atan2(deltaY,deltaX) + Math.PI; 
	this.angle =  lerpAngle(beta,this.angle,0.6);

	//鱼尾巴计数
	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer > 50) {
		this.babyTailCount = (this.babyTailCount +1) % 8;
		this.babyTailTimer %= 50;
	}

	//鱼眼睛计数
	this.babyEyeTimer += deltaTime;
	if(this.babyEyeTimer > this.babyEyeInterval) {
		this.babyEyeCount = (this.babyEyeCount + 1) % 2;
		this.babyEyeTimer %= this.babyEyeInterval;

		if(this.babyEyeCount == 0) {
			this.babyEyeInterval = Math.random() * 1500 + 2000; 
		}else {
			this.babyEyeInterval = 200;
		}
	}

	//身体颜色
	this.babyBodyTimer += deltaTime;
	if(this.babyBodyTimer > 300) {
		this.babyBodyCount = this.babyBodyCount + 1;
		this.babyBodyTimer %= 300;
		if(this.babyBodyCount > 19) {
			this.babyBodyCount = 19;

			//gameover
			data.gameOver = true;
		}
	}

	//ctx1
	//translate()
	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);

	ctx1.drawImage(babyTails[this.babyTailCount],-babyTails[this.babyTailCount].width * 0.5 + 23,-babyTails[this.babyTailCount].height * 0.5);
	ctx1.drawImage(babyBodys[this.babyBodyCount],-babyBodys[this.babyBodyCount].width * 0.5,-babyBodys[this.babyBodyCount].height * 0.5);
	ctx1.drawImage(babyEyes[this.babyEyeCount],-babyEyes[this.babyEyeCount].width * 0.5,-babyEyes[this.babyEyeCount].height * 0.5);
	ctx1.restore();
}