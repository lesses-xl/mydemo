window.onload = function() {
	var screenWidth = window.innerWidth;
	var screenHeight = window.innerHeight;
	var index = 0;

  	function $(ele,obj) {
    	obj = obj || document;
    	return obj.querySelectorAll(ele);
  	}

  	function sizeAuto(ele,ele2,ele3) {
  		$(ele)[0].style.width = screenWidth + 'px';
  		$(ele)[0].style.height = screenHeight + 'px';
  		$(ele2)[0].style.width = screenWidth + 'px';
  		for(var i=0; i<$(ele3)[0].children.length; i++) {
  			$(ele3)[0].children[i].style.width = screenWidth + 'px';
  		}
  		
  	}
  	sizeAuto('.header','.three','.three-img');

  	function navFixed(ele) {
  		// console.log(document.body.scrollTop,$('.header')[0].offsetHeight)
  		if(document.body.scrollTop >= $('.header')[0].offsetHeight - 70){
  			$(ele)[0].style.position = 'fixed';
  			$(ele)[0].style.top = '0';
  			$(ele)[0].style.left = '0';
  		}else {
  			$(ele)[0].style.position = 'absolute';
  			$(ele)[0].style.bottom = '0';
  			$(ele)[0].style.left = '0';
  			$(ele)[0].style.top = '';
  		}
  	}

  	navFixed('.nav')

  	window.addEventListener('resize',function() {
  		screenWidth = window.innerWidth;
		screenHeight = window.innerHeight;
		sizeAuto('.header','.three','.three-img');
  	});

  	window.addEventListener('scroll',function() {
  		navFixed('.nav');
  	})

  	document.getElementById('prev').onclick = function() {
  		index-- 
  		if(index < 0) {
  			index = 3;
  		}
  		for(var j=0; j<lis.length; j++) {
  			lis[j].setAttribute('class','');
  		}
  		var thisWidth = $('.three')[0].offsetWidth;
  		$('.three-img')[0].style.left  = -index * thisWidth + 'px';
  		lis[index].setAttribute('class','add');
  	}

  	document.getElementById('next').onclick = function() {
  		index++
  		if(index > 3) {
  			index = 0;
  		}
  		for(var j=0; j<lis.length; j++) {
  			lis[j].setAttribute('class','');
  		}
  		var thisWidth = $('.three')[0].offsetWidth;
  		$('.three-img')[0].style.left  = -index * thisWidth + 'px';
  		lis[index].setAttribute('class','add');
  	}

  	var lis = $('.choose')[0].children;

  	for(var i=0; i<lis.length ;i++) {
  		lis[i].num = i;
  		lis[i].onclick = function() {
  			index = this.num;
  			for(var j=0; j<lis.length; j++) {
  				lis[j].setAttribute('class','');
  			}
  			var thisWidth = $('.three')[0].offsetWidth;
  			$('.three-img')[0].style.left  = -this.num * thisWidth + 'px';
  			this.setAttribute('class','add');
  		}
  	}

  	document.oncontextmenu = function(e) {
		// e.returnValue=false;
	}
	var thisX = 0;
	$('.four')[0].children[0].onmousedown = function(e) {
		e.returnValue=false;
		var that = this;
		thisX = e.clientX;
		var thisL = that.offsetLeft;	
		document.onmousemove = function(e) {
			that.style.left = thisL + -thisX + e.clientX + 'px';
			console.log(that.offsetLeft)
			if(that.offsetLeft >= 0) {
				that.style.left = 0 + 'px';
			}
			if(that.offsetLeft < -2280) {
				that.style.left =  -2280 + 'px';
			} 
		}
		document.onmouseup = function() {
			document.onmousemove = null;
		}
	}


	// var timer1
	// $('.h-btn-img')[0].onclick = function() {
	// 	var speed = 30;
	// 	timer1 = setInterval(function() {
	// 		if(document.body.scrollTop >= $('.header')[0].offsetHeight + 70) {
	// 			setInterval(timer1);
	// 			speed = 30;
	// 		}else {
	// 			window.scrollTo(0,speed+=23);
				
	// 		}	
	// 		console.log(11)		
	// 	},5)	
	// }
}
