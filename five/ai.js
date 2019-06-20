//赢法数组
var wins = [];
for(var i=0; i<15; i++) {
	wins[i] = [];
	for(var j=0; j<15; j++) {
		wins[i][j] = [];
	}
}

//赢法统计数组
var mywin = [];
var comwin = [];

var count = 0;

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
							myScore[i][j] += 2000;
						}else if(mywin[k] == 4) {
							myScore[i][j] += 10000;
						}

						if(comwin[k] == 1) {
							comScore[i][j] += 220;
						}else if(comwin[k] == 2) {
							comScore[i][j] += 520;
						}else if(comwin[k] == 3) {
							comScore[i][j] += 2200;
						}else if(comwin[k] == 4) {
							comScore[i][j] += 20000;
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
				gameover()
				over = true;
			}
		}
	}

	if(!over) {
		c = !c;
	}
}