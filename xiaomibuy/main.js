
var btn = document.getElementsByTagName('button');

var info = document.getElementById('info');

var mybuy = document.getElementById('mybuy');

var arr = [];

var total = 0;

for(let i=0; i<btn.length; i++) {
	btn[i].onclick = function() {
		// console.log(i);
		var img = info.children[i].children[0].src;
		var text = info.children[i].children[1].innerHTML;
		var cost = info.children[i].children[2].innerHTML;
		var num = 1;

		// console.log(img,text,cost,num);

		var buy = document.createElement('li');

		var buyimg = document.createElement('img');
		buyimg.src = img;

		var buyname = document.createElement('span');
		buyname.innerHTML = text;
		buyname.className = 'one';

		var buycost = document.createElement('span');
		buycost.innerHTML = cost;
		buycost.className = 'two';

		var buynum = document.createElement('span');
		var sub = document.createElement('span');
		var add = document.createElement('span');
		var result = document.createElement('span');
		sub.innerHTML = '-';
		sub.className = 'sub';
		add.className = 'add';
		add.innerHTML = '+';
		result.innerHTML = 1;
		result.className = 'result';
		buynum.appendChild(sub);
		buynum.appendChild(result)
		buynum.appendChild(add);
		buynum.className = 'three';

		var buyclose = document.createElement('span');
		buyclose.innerHTML = '×';
		buyclose.className = 'four';


		buy.appendChild(buyimg);
		buy.appendChild(buyname);
		buy.appendChild(buycost);
		buy.appendChild(buynum);
		buy.appendChild(buyclose);

		// console.log(buy)
		mybuy.appendChild(buy);

		var twos = document.getElementsByClassName('two');
		for(var j=0; j<twos.length; j++) {
			arr[j] = twos[j].innerHTML;
		}
	}
}

var timer1 = setInterval(function() {
	var allprice = 0;
	var allnumber = 0;
	total = 0;
	var a = document.getElementById('mybuy');
	for(var i=0; i<a.children.length; i++) {
		var x = parseInt(a.children[i].children[2].innerHTML);
		allprice += x;
	}

	for(var k=0; k<arr.length; k++) {
		total += parseInt(arr[k]);
	}
	document.getElementById('allmoney').innerHTML = total;
	

	var fours = document.getElementsByClassName('four');
	for(var i=0; i<fours.length; i++) {
		fours[i].onclick = function() {
			this.parentNode.parentNode.removeChild(this.parentNode);
			arr[i-1] = 0;
		}
	}

	var threes = document.getElementsByClassName('three');
	for(var j=0; j<threes.length; j++)  {
		allnumber += parseInt(threes[j].children[1].innerHTML); 
		threes[j].children[0].onclick = function() {
			var c = this.parentNode.children[1].innerHTML;
			c--;
			if(c <= 1) {
				c = 1;
			}
			var thisprice = parseInt(this.parentNode.parentNode.children[2].innerHTML);
			total = thisprice * c;
			arr[i-1] = total;
			this.parentNode.children[1].innerHTML = c;

		}

		threes[j].children[2].onclick = function() {
			var c = this.parentNode.children[1].innerHTML;
			c++;
			if(c >= 50) {
				c = 50;
			}
			var thisprice = parseInt(this.parentNode.parentNode.children[2].innerHTML);
			total = thisprice * c;
			arr[i-1] = total;
			this.parentNode.children[1].innerHTML = c;
		}
	}

	document.getElementById('allnum').innerHTML = allnumber;
	console.log(arr);
},100);

console.log(arr);

