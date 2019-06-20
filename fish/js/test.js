//判断大鱼和果实的距离
function momFruitsTest() {
	if(!data.gameOver) {
		for(var i=0; i<fruit.num; i++) {
			if(fruit.alive[i]) {

				var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y)
				if(l < 900) {

					//大鱼吃到果实
					fruit.dead(i);
					data.fruitNum++;

					mom.momBodyCount++;
					if(mom.momBodyCount > 7) {
						mom.momBodyCount = 7;
					}

					if(fruit.fruitType[i] == 'blue') {
						data.doubles = 2;
					} //blue

					wave.born(fruit.x[i],fruit.y[i]);
				}
			}
		}
	}
}

//大鱼和小鱼的距离
function momBabyTest() {
	if(data.fruitNum > 0 && !data.gameOver) {
		var l = calLength2(mom.x, mom.y, baby.x, baby.y)
			if(l < 900) {

				//baby
				baby.babyBodyCount = 0;

				// data => 0
				// data.rest();
				mom.momBodyCount = 0;

				//分数更新
				data.addScore();

				//大鱼碰撞小鱼 生成涟漪
				halo.born(baby.x,baby.y)
			}
	}	
}