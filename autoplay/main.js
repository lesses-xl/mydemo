
// document.getElementsByClassName('btn')[0].children[0].onclick = function(){
// 	console.log(1)
// }

$(function(){
	// console.log($('.btn li'));
	var imgWidth = $('.img li').eq(0).width();
	var imgUl = $('.img');
	var i = 0;
	var flag = true;
	var timer = null;
	console.log(imgWidth)

	$('.btn li').click(function(){
		i = $(this).index();	
		autoplay(i,300)	
		clearInterval(timer);		
	})


	function autoplay(i,speed) {

		imgUl.animate({
			left:-i*imgWidth
		},speed);

		$('.btn li').eq(i).addClass('current').siblings().removeClass('current');
	}

	timer = setInterval(function(){

		play();
		
	},2000);

	function play() {
		if(i < 0 ) {
			flag = true
		}
		if( i > 3) {
			flag = false;
		}


		if(flag) {
			i++;
		}else {
			i--;
		}

		if(i == 0) {
			i = 4;	
		}
		if(i == 4) {
			i = 0;
		}
		autoplay(i,300);
	}

	$('.wrap').mouseenter(function(){
		clearInterval(timer);
	})

	$('.wrap').mouseleave(function(){
		timer = setInterval(function(){

			play();
			
		},3000);
	})
})
