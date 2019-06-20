window.onload = function() {
	game();
}	

//定义canvas变量
var can1;
var can2;
var ctx1;
var ctx2;

//定义时间
var lastTime = Date.now();
var deltaTime = 0;

//定义can2的背景图片
var bgPic = new Image();

//定义尺寸
var canWidth;
var canHeight;


//定义海葵
var ane;

//定义果实
var fruit;

//定义大鱼
var mom;
var mx;
var my;

//定义小鱼
var baby;

//定义小鱼图片数组
var babyTails = [];
var babyEyes = [];
var babyBodys = [];

//定义大鱼图片数组
var bigTails = [];
var bigEyes = [];
var bigBodyO = [];
var bigBodyB = [];

//定义分值计算
var data;

//定义涟漪
var wave;
var halo;

//漂浮物
var dust;
var dustPic = [];

//果实数量
var fruitNums = 15;


//入口函数
function game() {
	init();
	gameloop();
}


//创建
function init() {
	//获得canvas context
	can1 = document.getElementById('canvas1'); //前
	ctx1 = can1.getContext('2d');

	can2 = document.getElementById('canvas2'); //后
	ctx2 = can2.getContext('2d');

	bgPic.src = './images/background.jpg';
	canWidth = can1.width;
	canHeight = can1.height;

	can1.addEventListener('mousemove',onMouseMove,false);

	//海葵初始化
	ane = new aneObj();
	ane.init();

	//果实初始化
	fruit = new fruitObj();
	fruit.init();

	//大鱼初始化
	mom = new momObj();
	mom.init();

	//小鱼初始化
	baby = new babyObj();
	baby.init();

	//
	mx = canWidth * 0.5;
	my = canHeight * 0.5;


	//小鱼尾巴数组
	for(var i=0; i<8; i++) {
		babyTails[i] = new Image();
		babyTails[i].src = './images/babyTail'+ i +'.png';
	}

	//小鱼眼睛数组
	for(var i=0; i<2; i++) {
		babyEyes[i] = new Image();
		babyEyes[i].src = './images/babyEye'+ i +'.png';
	}

	//小鱼身体数组
	for(var i=0; i<20; i++) {
		babyBodys[i] = new Image();
		babyBodys[i].src = './images/babyFade'+ i +'.png';
	}

	//大鱼尾巴数组
	for(var i=0; i<8; i++) {
		bigTails[i] = new Image();
		bigTails[i].src = './images/bigTail'+ i +'.png';
	}

	//大鱼眼睛数组
	for(var i=0; i<2; i++) {
		bigEyes[i] = new Image();
		bigEyes[i].src = './images/bigEye'+ i +'.png';
	}

	//大鱼身体数组
	for(var i=0; i<8; i++) {
		bigBodyO[i] = new Image();
		bigBodyO[i].src = './images/bigSwim'+ i +'.png';

		bigBodyB[i] = new Image();
		bigBodyB[i].src = './images/bigSwimBlue'+ i +'.png';
	}

	data = new dataObj();
	ctx1.font = '30px Verdana';
	ctx1.textAlign = 'center';

	wave = new waveObj();
	wave.init();

	halo = new haloObj();
	halo.init();

	for(var i=0; i<7; i++) {
		dustPic[i] = new Image();
		dustPic[i].src = './images/dust'+ i +'.png';
	}

	dust = new dustObj();
	dust.init();
}


//游戏循环
function gameloop() {
	window.setTimeout(gameloop,1000/60);
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;

	if(deltaTime > 40) {
		deltaTime = 40;
	}

	//绘制背景
	drawBackground();

	//绘制海葵
	ane.draw();

	//绘制果实
	fruitNum();
	fruit.draw();

	//绘制大鱼
	//先清除ctx1的画布
	ctx1.clearRect(0,0,canWidth,canHeight)
	mom.draw();	

	//绘制小鱼
	baby.draw();

	//大鱼吃果实
	momFruitsTest();

	momBabyTest();

	//分值绘制
	data.draw();

	//画涟漪
	wave.draw();
	halo.draw();

	//绘制漂浮物
	dust.draw();

	if(data.score >7000) {
		fruitNums = 10;
	}else if(data.score > 12000) {
		fruitNums = 6;
	}else if(data.score > 15000) {
		fruitNums = 3;
	}else if(dta.score > 17000) {
		fruitNums = 1;
	}
}

//获得鼠标位置
function onMouseMove(e) {
	if(!data.gameOver) {
		if(e.offSetX || e.layerX) {
			mx = e.offSetX == undefined ? e.layerX : e.offSetX;
			my = e.offSetY == undefined ? e.layerY : e.offSetY;
		}
	}
}


//以下是计算函数
function lerpDistance(aim, cur, ratio) {
	var delta = cur - aim;
	return aim + delta * ratio;
}

function lerpAngle(a, b, t) {
	var d = b - a;
	if (d > Math.PI) d = d - 2 * Math.PI;
	if (d < -Math.PI) d = d + 2 * Math.PI;
	return a + d * t;
}

function calLength2(x1, y1, x2, y2) {
	return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
}