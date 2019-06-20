var chess = document.getElementById('chess');
var ctx = chess.getContext('2d');

var c = true;
var arr = [];
var over = false;

var who;


//赢法数组
var wins = [];

//赢法统计数组
var mywin = [];
var comwin = [];
var count = 0;


window.onload = function() {
	newgame()
}

var chessBorder = function() {
	ctx.beginPath();
	ctx.strokeStyle = '#bfbfbf';
	for(var i=0; i<15; i++) {
		ctx.moveTo(15 + i*30, 15);
		ctx.lineTo(15 + i*30, 435);
		ctx.moveTo(15, 15 + i*30);
		ctx.lineTo(435, 15 + i*30);
		ctx.stroke();
	}
	ctx.closePath();
};

function newgame() {
	c=true;
	over =false;

	arr = [];
	/*赢法数组*/
	wins = [];

	//赢法统计数组
	mywin = [];
	comwin = [];
	count = 0;



	chess = document.getElementById('chess');
	ctx = chess.getContext('2d');
	ctx.clearRect(0,0,450,450);
	chessBorder()

	for(var i=0; i<15; i++) {
		wins[i] = [];
		for(var j=0; j<15; j++) {
			wins[i][j] = [];
		}
	}

	//横线
	for(var i=0; i<15; i++) {
		for(var j=0; j<11; j++) {
			for(var k=0; k<5; k++) {
				wins[i][j+k][count] = true;
			}
			count++;
		}
	}

	//竖线
	for(var i=0; i<15; i++) {
		for(var j=0; j<11; j++) {
			for(var k=0; k<5; k++) {
				wins[j+k][i][count] = true;
			}
			count++;
		}
	}

	//斜线
	for(var i=0; i<11; i++) {
		for(var j=0; j<11; j++) {
			for(var k=0; k<5; k++) {
				wins[i+k][j+k][count] = true;
			}
			count++;
		}
	}

	//反斜线
	for(var i=0; i<11; i++) {
		for(var j=14; j>3; j--) {
			for(var k=0; k<5; k++) {
				wins[i+k][j-k][count] = true;
			}
			count++;
		}
	}

	for(var i=0; i<count; i++) {
		mywin[i] = 0;
		comwin[i] = 0;
	}


	for(var i=0 ;i<15; i++) {
		arr[i] = [];
		for(var j=0; j<15; j++) {
			arr[i][j] = 0;
		}
	}
}

function gameover() {
	// c = true;
	var a = 0;
	if(who == 1) {
		a = confirm('你赢了，是否重新开始');
	}else if(who == 0){
		a = confirm("电脑赢了，是否重新开始");
	}
	if(a) {
		setTimeout(function() {
			newgame();
			chessBorder();
		},200);
	}
}

function oneStep(i,j,c) {
		ctx.beginPath();
		ctx.arc(15+i*30,15+j*30,13,0,2*Math.PI);
		var grd = ctx.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0);
		if (c) {
			grd.addColorStop(0,"#0a0a0a");
			grd.addColorStop(1,"#636766");
		}else{
			grd.addColorStop(0,"#d1d1d1");
			grd.addColorStop(1,"#f9f9f9");
		}
		ctx.fillStyle = grd;
		ctx.fill();
		ctx.closePath();
}

function comAi() {
	var myScore = [];
	var comScore = [];
	var max = 0;
	var u = 0;
	var v = 0;
	for(var i=0; i<15; i++) {
		myScore[i] = [];
		comScore[i] = [];
		for(var j=0; j<15; j++) {
			myScore[i][j] = 0;
			comScore[i][j] = 0;
		}
	}

	for(var i=0; i<15; i++) {
		for(var j=0; j<15; j++) {
			if(arr[i][j] == 0) {
				for(var k=0; k<count; k++) {
					if(wins[i][j][k]) {
						if(mywin[k] == 1) {
							myScore[i][j] += 200;
						}else if(mywin[k] == 2) {
							myScore[i][j] += 500;
						}else if(mywin[k] == 3) {
							myScore[i][j] += 2300;
						}else if(mywin[k] == 4) {
							myScore[i][j] += 20000;
						}

						if(comwin[k] == 1) {
							comScore[i][j] += 220;
						}else if(comwin[k] == 2) {
							comScore[i][j] += 520;
						}else if(comwin[k] == 3) {
							comScore[i][j] += 2200;
						}else if(comwin[k] == 4) {
							comScore[i][j] += 22000;
						}
					}

				}

				if(myScore[i][j] > max) {
					max = myScore[i][j];
					u=i;
					v=j;
				}else if(myScore[i][j] == max){
					if(comScore[i][j] > comScore[u][v]) {
						u=i;
						v=j;
					}
				}

				if(comScore[i][j] > max) {
					max = comScore[i][j];
					u=i;
					v=j;
				}else if(comScore[i][j] == max){
					if(myScore[i][j] > myScore[u][v]) {
						u=i;
						v=j;
					}
				}
			}
		}
	}
	oneStep(u,v,false);
	arr[u][v] = 2;
	for(var k=0; k<count; k++) {
		if(wins[u][v][k]) {
			comwin[k]++;
			mywin[k] = 6;
			if(comwin[k] == 5) {
				who = 0;
				gameover();
				over = true;
			}
		}
	}

	if(!over) {
		c = !c;
	}
}

chess.onclick = function(e) {
	if(over) {
		return;
	}
	if(!c) {
		return;
	}
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x / 30);
	var j = Math.floor(y / 30);
	if(arr[i][j] == 0) {
		oneStep(i,j,c);
		arr[i][j] = 1;

		for(var k=0; k<count; k++) {
			if(wins[i][j][k]) {
				mywin[k]++;
				comwin[k] = 6;
				if(mywin[k] == 5) {
					who = 1; 
					gameover();					
					over = true;
				}
			}
		}

		if(!over) {
			c = !c;
			comAi();
		}

	}	
}	

btn.onclick = function() {
	var a = confirm('是否重新开始');
	if(a) {
		c = true;
		newgame();
		ctx.clearRect(0,0,450,450);
		chessBorder();
	}
}
