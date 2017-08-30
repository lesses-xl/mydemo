  var index = 0;
  var wrap = document.getElementsByClassName('wrap')[0];
  var pic = document.getElementsByClassName('pic')[0];
  var img = document.getElementsByTagName('img');
  var btn = document.getElementsByTagName('span');
  var imgWidth = img[0].offsetWidth;
  var timer = null;

// 运动函数
function animate(target) {
	pic.style.transform = 'translate('+ target +'px)';
	
}


for(var i=0; i<btn.length; i++) {
	btn[i].index = i;
	btn[i].onclick = function() {
		for(var j=0; j<btn.length; j++) {
			btn[j].className = '';
		}
		this.className = 'current';
		animate(-this.index * imgWidth);
		index = this.index;
	}
}

function autoplay() {
	clearInterval(timer);
	timer = setInterval(function() {
		if(index == 4) {
			index = 0;
		}else {
			index++;
		}
		for(var j=0; j<btn.length; j++) {
			btn[j].className = '';
		}
		btn[index].className = 'current';
		animate(-index * imgWidth);
	},2500);
}


wrap.onmouseover = function() {
	clearInterval(timer);
}
wrap.onmouseout = function() {
	autoplay();
}
autoplay();



