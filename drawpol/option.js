var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	drag = document.querySelector('#drag'),
	start = {},
	now = {},
	imgCatch,
	side = document.querySelector('#side').value,
	startAngle = 0,
	assistStyle = document.querySelector('#assistStyle').value,
	lineStyle = document.querySelector('#strokeStyle').value,
	polygnFillStyle = document.querySelector('#fillStyle').value,
	polygnStrokeStyle = "#000",
	isMouseDown = false,
	isDrag = false,
	nowPolygn,
	polygns = [];


//绘制网格
function drawGrid(color,stepX,stepY) {
	ctx.strokeStyle = color;
	for(var i=0.5+stepX; i<canvas.width; i+=stepX) {
		ctx.beginPath();
		ctx.moveTo(i,0);
		ctx.lineTo(i,canvas.height);
		ctx.stroke();
		ctx.closePath();
	}
	for(var i=0.5+stepY; i<canvas.height; i+=stepY) {
		ctx.beginPath();
		ctx.moveTo(0,i);
		ctx.lineTo(canvas.width,i);
		ctx.stroke();
		ctx.closePath();
	}
}

//移动按钮点击发生改变
drag.onchange = function() {
	isDrag = drag.checked;
}

//canvas鼠标按下
canvas.onmousedown = function(e) {
	e.preventDefault();
	if(isMouseDown)return;
	isMouseDown = true;
	start = windowToCanvas(e.clientX,e.clientY);

	//是拖动还是绘制
	if(isDrag) {
		//拖动
		//判断拖动哪个
		nowPolygn = null;
		for(var i=polygns.length; --i>=0;) {
			var len = Math.sqrt(Math.pow((start.x-polygns[i].x),2)
							   +Math.pow((start.y-polygns[i].y),2));
			if(len<polygns[i].radius) {
				//取出拖动的元素
				nowPolygn = polygns.splice(i,1)[0];
				//重绘
				reDrawAllPolygn();
				break;
			}
		}
	}else {
		//绘制
		nowPolygn = new Polygn(start.x,start.y,0,side,startAngle,polygnStrokeStyle,polygnFillStyle);
	}
	if(nowPolygn) {
		saveData();
		drawPolygn(nowPolygn);
	}
}

//canvas鼠标移动
canvas.onmousemove = function(e) {
	e.preventDefault();
        if(!isMouseDown)return;
        now = windowToCanvas(e.clientX,e.clientY);
        if(nowPolygn){
            loadData();
            if(isDrag){
                nowPolygn.move(nowPolygn.x+now.x-start.x,nowPolygn.y+now.y-start.y);
                start = now;
            }else{
                updatePolynRadiu(e);
            }
            drawPolygn(nowPolygn);
            !isDrag && drawAssist(assistStyle,start.x,start.y)
        }
}

//canvas鼠标抬起
canvas.onmouseup = function(e) {
	e.preventDefault();
        if(!isMouseDown)return;
        if(nowPolygn) {
            loadData();
            drawPolygn(nowPolygn)
            polygns.push(nowPolygn);
        }
        isMouseDown = false;
        nowPolygn = null;
        start={};
        now={};
}

//重绘
function reDrawAllPolygn() {
	if(!nowPolygn)return;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawGrid('#ccc',10,10);
	polygns.forEach((polygn) => {
		drawPolygn(polygn);
	})
}

function  updatePolynRadiu(e){
    now = windowToCanvas(e.clientX,e.clientY);
    var radius = Math.min(Math.abs(now.x-start.x),Math.abs(now.y-start.y));
    nowPolygn.radius = radius
}

function drawAssist(color,x,y){
    ctx.save();

    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x,0);
    ctx.lineTo(x,canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0,y);
    ctx.lineTo(canvas.width,y);
    ctx.stroke();
    ctx.closePath();

    ctx.stroke();
}

function windowToCanvas(x,y) {
	var bbox = canvas.getBoundingClientRect();
	return { x: x - bbox.left * (canvas.width  / bbox.width),
            y: y - bbox.top  * (canvas.height / bbox.height) };
}


function saveData() {
	imgCatch = ctx.getImageData(0,0,canvas.width,canvas.height);
}

function loadData() {
	if(imgCatch) {
		ctx.putImageData(imgCatch,0,0);
	}
}

function drawPolygn(polygn) {
	polygn.strokeAndFill(ctx);	
}


//边数选择
document.querySelector('#side').onchange = function() {
	side = this.value;
}

//边框颜色选择
document.querySelector('#strokeStyle').onchange = function() {
	polygnStrokeStyle = this.value;	
}

//填充色选择
document.querySelector('#fillStyle').onchange = function() {
	polygnFillStyle = this.value;
}

//辅助线选择
document.querySelector('#assistStyle').onchange = function() {
	assistStyle = this.value;
}

drawGrid('#ccc',10,10);

