var imgNum = [0,1,2,5,8,7,6,3];
var imgs = document.getElementsByClassName('imgdiv');
var btn = document.getElementById('btn');
var ifClick = 0;
var a = 0;
var x = 1;
var toshow = '';
var ifshow = 1;
btn.onclick = function() {
	if(!ifClick && x==1) {
		ifClick = 1;
		var maskSpan = document.createElement('span');
		maskSpan.setAttribute('class','mask');


		var timer1 = null;
		a = 0;
		var circle = 0;
		var speed = 100;
		var b = Math.floor(Math.random()*9);

		clearInterval(timer1);

		function lucky() {
			imgs[imgNum[a]].appendChild(maskSpan);
			a++;
			if(a == 8) {
				circle++;
				a = 0;			
			}

			if(circle == 3) {
				clearInterval(timer1);
				speed = 100;
				timer1 = setInterval(function() {
					lucky();
				},speed);
			}else if(circle == 5) {
				clearInterval(timer1);
				speed = 150;
				timer1 = setInterval(function() {
					lucky();
				},speed);
			}else if(circle == 7) {
				clearInterval(timer1);
				speed = 200;
				timer1 = setInterval(function() {
					lucky();
				},speed);
			}else if(circle == 9) {
				clearInterval(timer1);
				speed = 310;
				timer1 = setInterval(function() {
					lucky();
				},speed);
			}else if(circle == 11) {
				clearInterval(timer1);
				speed = 420;
				timer1 = setInterval(function() {
					lucky();
				},speed);
			}else if(circle >= 12) {				
				// console.log(b);
				clearInterval(timer1);
				speed = 500;
				timer1 = setInterval(function() {
					lucky()
				},speed);
				if(b == a) {
					clearInterval(timer1);
					// console.log(a);
					ifClick = 0;
					x = 0;
					ifshow = 0;
					// toshow = imgs[a-1].children[0].getAttribute('data-name');
				}
			}

			// console.log(circle);
		}

		timer1 = setInterval(function() {	
			lucky();
		},speed)
	}else if(ifClick == 0){
		function removeSpan() {
			// console.log(imgs[imgNum[a-1]]);
			if(a == 0) {
				imgs[3].removeChild(imgs[3].getElementsByTagName('span')[0]);
				x = 1;
			}else {
				var num = imgNum[a-1];
				imgs[num].removeChild(imgs[num].getElementsByTagName('span')[0]);
				// console.log(imgs[imgNum[a]]);
				x = 1;
			}
			
		}
		removeSpan();
	}
}

// var timer2 = setInterval(function() {
// 	if(x == 0 && ifshow == 0){
// 		ifshow = 1;
// 		alert('恭喜你，抽中'+toshow)
// 	}
// })