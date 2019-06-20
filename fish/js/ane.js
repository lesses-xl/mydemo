var aneObj = function() {
	this.x = [];
	this.headx = [];
	this.heady = [];
	this.len = [];
	this.amp = [];
	this.alpha = 0;
}

//数量
aneObj.prototype.num = 50;

//初始化
aneObj.prototype.init = function() {


	for(var i=0; i<this.num; i++) {
		this.x[i] = i * 16 + Math.random() * 20;
		this.headx[i] = this.x[i];
		this.heady[i] = canHeight - 251 + Math.random() * 50;
		this.amp[i] = Math.random() * 50 + 30;
		// this.len[i] = 200 +  Math.random() * 50;
	}
}

//绘制海葵
aneObj.prototype.draw = function() {
	this.alpha += deltaTime * 0.0008;
	var l = Math.sin(this.alpha);
	ctx2.save();
	ctx2.globalAlpha = 0.6;
	ctx2.strokeStyle = '#3b154e';
	ctx2.lineWidth = 20;
	ctx2.lineCap = 'round';
	for(var i=0; i<this.num; i++) {

		/*
			beginPath 
			moveTo 
			lineTo 
		 	stroke 
		 	strokeStyle 
		  	lineWidth 
		  	lineCap 
		  	globalAlpha
		*/

		ctx2.beginPath();
		ctx2.moveTo(this.x[i],canHeight);

		this.headx[i] = this.x[i] + l * this.amp[i];

		ctx2.quadraticCurveTo(this.x[i], canHeight - 100, this.headx[i], this.heady[i]);
		// ctx2.lineTo(this.x[i],canHeight - this.len[i]);
		ctx2.stroke();
	}
	ctx2.restore(); //样式只在这中间起作用
}