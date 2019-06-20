$.fn.extend({
	waterFall:function(){

		// 步骤一:
		/*
			1.容器的宽度 items的宽度
			2.子元素的宽度 child().width()
			3.每一行子元素的数量
			4.计算间距
		*/

		//定义$_变量
		var $_this = this;

		//父盒子宽度
		var fWidth = $_this.width();
		// console.log('父元素的宽度:'+fWidth);

		//子元素宽度
		var cWidth = $_this.children('.item').width();
		// console.log('子元素的宽度:'+cWidth);


		//每一行的个数  向下取整
		var colNum = Math.floor(fWidth / cWidth);
		// console.log('每一行的个数:'+colNum);


		//间距  (总宽度 - 个数*子元素宽度) / (个数 + 1)
		//  ( 总的页面宽度 - 子元素的宽度 * 个数 ) / (个数 + 1)
		//这里要 + 1 是因为，假如个数为4的话 那么 除去中间的间距 左右两边也有间距，所以要加一                   						   
		var cMargin = Math.floor((fWidth - cWidth * colNum) / (colNum + 1 ));
		// var cMargin = 20;
		console.log('间距:'+cMargin);


		//步骤二
		/*
			计算每一个元素的top left值
			1.准备一个数组 
			2.循环我们的所有的子元素
				获得子元素的高度
				根据获取的最小索引值计算 top left
			3.修改数组	
		*/

		//创建高度数组
		var heightArr = [];

		//循环为高度数组 并且赋值
		for(var i=0; i<colNum; i++){
			heightArr.push(cMargin);
		};

		console.log('高度数组:'+heightArr);

		//循环当前子元素 ，得到索引值和每个元素
		$_this.children('.item').each(function(index,element){

			//获取当前循环的子元素的高度
			var currentHeight = element.height();
			console.log('当前第'+index+'子元素高度:'+currentHeight)

			//计算该元素放置在哪个位置
			//先假设 索引为0的是最小值
			var minIndex = 0;
			var minHeight = heightArr[0];
			console.log('最小高度'+minHeight);
			console.log('高度数组长度'+heightArr.length);


			for(var i=0; i<heightArr.length; i++){

				//和我们定义的最小值进行比较
				if(minHeight > heightArr[i]) {
					//替换
					minHeight = heightArr[i];
					minIndex = i;
				}
			}

			//循环完毕 最小高度 以及最小的索引值

			//设置给当前的子元素
			//top高度为计算出来的最小高度
			//left 宽度*索引 + 索引*间距
			$(element).css({
				top:minHeight,
				left:cMargin+(cMargin+cWidth)*minIndex
			});
						//间距 + ((间距+一个元素的宽度) * 索引)	索引从0开始
			var cLeft = cMargin+(cMargin+cWidth)*minIndex;
			console.log('第'+index+'个元素的top:'+minHeight+'left:'+cLeft)

			// 修改 高度 数组中 对应 索引的 高度值

			heightArr[minIndex] += currentHeight;
			heightArr[minIndex] += cMargin;


			// 找到 高度数组的 最大值 设置给 我们的 父容器 这里是 $_this 
			
			// 定义变量
			var maxHeight = heightArr[0];

			for(var i=0; i<heightArr.length; i++){
				if(heightArr[i] > maxHeight) {
					maxHeight = heightArr[i];
				}
			};

			$_this.height(maxHeight);

		})
	}
})