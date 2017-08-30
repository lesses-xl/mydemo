//通过以下方式绘制多边形
// var polygn = new Polygn(startX,startY,radius,side,startAngle,strokeStyle,fillStyle);
// polygn.fill(ctx);           填充
// polygn.stroke(ctx);         描边
// polygn.strokeAndFill(ctx);  填充和描边

(function() {
	var uid = 0;  //多边形id
	var Point = function(x,y) {
		this.x = x;
		this.y = y;
	};

	var Polygn = function(startX,startY,radius,side,startAngle,strokeStyle,fillStyle) {
		this.id = ++uid;
		this.x = startX;
		this.y = startY;
		this.radius = radius;
		this.side = side;
		this.startAngle = startAngle;
		this.strokeStyle = strokeStyle;
		this.fillStyle = fillStyle;
	};

	Polygn.prototype = {
		// 获得顶点
		getPoints() {
			var points = [],
				radius = this.radius,
				angle = this.startAngle,
				side = this.side;

			for(var i=0; i<side; i++) {
				points.push(new Point(this.x+(radius*Math.sin(angle)),this.y+(radius*Math.cos(angle))));
				angle += 2*Math.PI/this.side;
			}
			return points;	
		},
		// 创建多边形路径
		createPath(ctx) {
			var points = this.getPoints();
			ctx.beginPath();
			ctx.moveTo(points[0].x,points[0].y);
			for(var i=1; i<points.length; i++) {
				ctx.lineTo(points[i].x,points[i].y);
			};
			ctx.closePath();
		},
		// 多边形描边
		stroke(ctx) {
			ctx.save();
			this.createPath(ctx);
			ctx.strokeStyle = this.strokeStyle;
			ctx.stroke();
			ctx.restore();
		},
		// 多边形填充
		fill(ctx) {
			ctx.save();
			this.createPath(ctx);
			ctx.fillStyle = this.fillStyle;
			ctx.fill();
			ctx.restore();
		},
		// 描边和填充
		strokeAndFill(ctx) {
			ctx.save();
			this.createPath(ctx);
			ctx.strokeStyle = this.strokeStyle;
			ctx.fillStyle = this.fillStyle;
			ctx.stroke();
			ctx.fill();
			ctx.restore();
		},
		// 移动
		move(x,y) {
			this.x = x;
			this.y = y;
		}
	};

	window.Polygn = Polygn;
})(window);