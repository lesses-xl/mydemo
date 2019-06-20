$.fn.extend({
	waterFall:function(){
		var $_this = this;

		//步骤一
		/*
			1.获得父元素宽度
			2.获得子元素宽度
			3.计算出一行的数量
			4.计算间距
		*/	

		var fatherWidth = $_this.width();
		var childWidth = $_this.children('.item').width();
		var colNum = Math.floor(fatherWidth / childWidth);
		var childMargin =( fatherWidth - childWidth * colNum ) / (colNum + 1);


		//步骤二
		/*
			循环这些子元素，确定位置
			1.准备一个高度数组
			2.循环子元素，确定top left的值
			3.改变数组中的值
		*/

		var heightArr = [];
		for(let i=0; i<colNum; i++) {
			heightArr.push(childMargin);
		}
		//[childMargin,childMargin,childMargin,childMargin];

		$_this.children('.item').each(function(index,element){
			var currentHeight = $(element).height();

			var minHeight = heightArr[0];
			var minIndex = 0;

			for(let i=0; i<heightArr.length; i++) {
				if(minHeight > heightArr[i]) {
					minHeight = heightArr[i];
					minIndex = i;
				}
			}

			$(element).css({
				top:minHeight,
				left:childMargin + ((childMargin + childWidth) *  minIndex)
			});

			heightArr[minIndex] += currentHeight;
			heightArr[minIndex] += childMargin;

			var maxHeight = heightArr[0];
			for(let i=0; i<heightArr.length; i++) {
				if(maxHeight < heightArr[i]) {
					maxHeight = heightArr[i];
				}
			}

			// $('#btn').css('top',maxHeight+30) 
			$_this.height(maxHeight);
		})

	}
})