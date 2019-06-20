	var direction = 0;
	var deg = 0;
	var move = document.getElementById('move');
	var tb = document.getElementById('tb');
	var r = 0;
	var g = 0;
	var b = 0;

	//是否重合
	var ifRepeat = 0;

	//自动移动定时器
	var timer1 = null;

	//设置移动元素的初始值
	var beginX = 1;
	var beginY = 1;

	//定义一个选中元素的x,y数组
	var xy = [];

	//输入元素  和  旋转度数
	function changeDiv(ele,num) {
		deg = deg + num;

		//重置角度
		if(deg == -360 || deg == 360) {
			deg = 0;
		}
		direction = deg;  //得到角度，下面将用它来确定方向
		ele.style.transform = "rotate("+ deg +"deg)";
	}

	//固定旋转角度
	function fixRotate(ele,num) {
		ele.style.transform = "rotate("+ num +"deg)";
	}

	//判断beginX beginY 的位置
	function whereXY(a) {
		if(a <= 0) {
			a = 1;
		}
	}

	//判断是否移动到选中元素上
	function atChoose(a,b) {
		
		if(a == xy[0] && b == xy[1]) {
			//已经重合
			ifRepeat = 1;

			//得到选中元素的颜色
			var chooseColor = tb.children[b].children[a].style.backgroundColor

			//得到move的背景颜色
			var moveColor = document.getElementById('move').style.backgroundColor || 'red';
			console.log(moveColor)
			sm.style.backgroundColor = moveColor;
			move.style.backgroundColor = chooseColor;
			

			//如果两者相遇，那么清空该元素的class和背景颜色
			tb.children[b].children[a].setAttribute('class','');
			tb.children[b].children[a].style.backgroundColor = 'transparent';

			//重新生成选中元素
			randomEle(tb);
			if(xy[0] == a && xy[1] == b) {
				tb.children[b].children[a].setAttribute('class','');
				tb.children[b].children[a].style.backgroundColor = 'transparent';
				randomEle(tb);
			}
		}
	}

	atChoose(beginX,beginY)

	//得到move所在的tr的位置
	moveTr = 1;

	//移动
	function moveDiv(ele,direction) {
		
			// index初始化
			var index = null;
			
			//得到父元素，并且在他的父元素中删除
			var moveFather = ele.parentNode;

			//得到更上一级的父元素
			var moveFF = moveFather.parentNode;

			//得到这个move在当前父元素中的位置 修改index
			for(let i=0; i<moveFF.children.length; i++) {
				if(moveFF.children[i].getElementsByTagName('div').length > 0 ) {
					//得到位置
					index = i;
				}
			}

			//得到整个table 的 tr 数量
			var trs = document.getElementsByTagName('tr');

			function rightGo(ele) {
				//删除当前move 添加至下一个兄弟元素
				index++;

				if(index === moveFF.children.length) {
					return false;
				}else {					
					moveFather.removeChild(ele);
					moveFF.children[index].appendChild(ele);
					beginX++;
				}
			}

			function leftGo(ele) {		
				//删除当前move 添加至下一个兄弟元素
				index--;

				if(index === 0) {
					return false;
				}else {					
					moveFather.removeChild(ele);
					moveFF.children[index].appendChild(ele);
					beginX--;
					whereXY(beginX);
				}
			}

			function topGo(ele) {
				moveTr--;
				if(moveTr <= 0) {
					moveTr = 1;
					return false;
				}else {
					moveFather.removeChild(ele);
					trs[moveTr].children[index].appendChild(ele);
					beginY--;
					whereXY(beginY);
				}
			}

			function bottomGo(ele) {
				moveTr++;
				
				if(moveTr >= trs.length) {
					moveTr = 10;
					return false;
				}else {
					moveFather.removeChild(ele);
					trs[moveTr].children[index].appendChild(ele);
					beginY++;
				}
				// console.log(moveTr+1,trs.length)
			}
		
			//判断前进方向
			/*

				0          向上运动
				90,-270    向右运动
				180,-180   向下运动
				270,-90    向左运动
			*/

			if(direction == 0) {
				topGo(ele);
			}else if(direction == 90 || direction == -270) {
				rightGo(ele);
			}else if(direction == 180 || direction == -180) {
				bottomGo(ele);	
			}else if(direction == 270 || direction == -90) {
				leftGo(ele);
			}

			atChoose(beginX,beginY);
	}

	//随机生成一个选中元素
	function randomEle(ele) {
		var x = Math.ceil(Math.random()*10);
		var y = Math.ceil(Math.random()*10);
		r = Math.ceil(Math.random()*256);
		g = Math.ceil(Math.random()*256);
		b = Math.ceil(Math.random()*256);
		xy = [x,y];		
		var chooseTd = ele.children[y].children[x];
		chooseTd.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b +')';
		chooseTd.setAttribute('class','choose');
	}

	randomEle(tb);

	//自动移动
	function autoMove(x,y) {
		timer1 = setInterval(function() {
			if(beginX < x) {
				moveDiv(move,90);
				fixRotate(move,90);
				direction = 90;
			}else if(beginY < y) {
				moveDiv(move,180);
				fixRotate(move,180);
				direction = 180;
			}else if(y < beginY) {
				moveDiv(move,0);
				fixRotate(move,0);
				direction = 0;
			}else if(x < beginX) {
				moveDiv(move,270);
				fixRotate(move,270);
				direction = 270;
			}


			if(ifRepeat == 1) {
				clearInterval(timer1);
				autoMove(xy[0],xy[1]);
				ifRepeat = 0;
				// console.log(ifRepeat,beginX,beginY)
			}

		},500);
		

		console.log('beginX:'+beginX,   'x:'+x , 'beginY:'+beginY,   'y:'+y);
		console.log();
	}

	//点击事件
	tleft.onclick = function() {
		changeDiv(move,-90);
	}

	tright.onclick = function() {
		changeDiv(move,90);
	}

	go.onclick = function() {
		moveDiv(move,direction);
	}

	auto.onclick = function() {
		clearInterval(timer1);
		autoMove(xy[0],xy[1]);
	}

	document.getElementById('stop').onclick = function() {
		clearInterval(timer1);
	}