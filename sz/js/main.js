function auto() {
	var moveNum = 1;
	var timer1 = null;
	function leftMove() {
		$('#move').children('img').eq(1).fadeOut(500);
		$('#move').children('img').eq(0).fadeIn(500);
		moveNum = 1;
		$('#move').children('button').eq(0).addClass('current');
		$('#move').children('button').eq(1).removeClass('current');
	}

	function rightMove() {
		$('#move').children('img').eq(0).fadeOut(500);
		$('#move').children('img').eq(1).fadeIn(500);
		moveNum = 2;
		$('#move').children('button').eq(1).addClass('current');
		$('#move').children('button').eq(0).removeClass('current')
	}
	function autoMove() {		
		clearInterval(timer1);
		timer1 =  setInterval(function(){
			if(moveNum == 1) {
				rightMove();
			}

			else if(moveNum == 2){
				leftMove();
			}
			console.log(moveNum);
		},5000);
	};

	autoMove();
	$('#move .left').eq(0).click(function(){
		moveNum = 1;
		leftMove();
		clearInterval(timer1);
		timer1 =  setInterval(function(){
			if(moveNum == 1) {
				rightMove();
			}

			else if(moveNum == 2){
				leftMove();
			}
			console.log(moveNum);
		},5000);
	})

	$('#move .right').eq(0).click(function(){
		moveNum = 2;
		rightMove();
		clearInterval(timer1);
		timer1 =  setInterval(function(){
			if(moveNum == 1) {
				rightMove();
			}

			else if(moveNum == 2){
				leftMove();
			}
			console.log(moveNum);
		},5000);
	})
};

auto();