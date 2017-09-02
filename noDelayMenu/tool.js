function sameSign(a,b) {
	return (a ^ b) >= 0;
}

function vector(a,b) {
	return {
		x:b.x - a.x,
		y:b.y - a.y
	}
}

function verctorProduct(v1,v2) {
	return v1.x * v2.y - v2.x * v1.y
}

function isPonitInTrangle(p,a,b,c) {
	var pa = vector(p,a);
	var pb = vector(p,b);
	var pc = vector(p,c);

	var t1 = verctorProduct(pa,pb);
	var t2 = verctorProduct(pb,pc);
	var t3 = verctorProduct(pc,pa);

	return sameSign(t1,t2) && sameSign(t2,t3);
}

function needDelay(ele,leftCorner,currMousePos) {
	var offset = ele.offset();

	var topLeft = {
		x: offset.left,
		y: offset.top
	}

	var bottomLeft = {
		x: offset.left,
		y: offset.top + ele.height()
	}

	return isPonitInTrangle(currMousePos,leftCorner,topLeft,bottomLeft);
}