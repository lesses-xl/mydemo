
// 绑定每个盒子的鼠标移入移除事件
$('.box').bind('mouseenter mouseleave',function(e){

	var w = $(this).width();

	var h = $(this).height();

	var x = (e.pageX - this.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);

	var y = (e.pageY - this.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);

	// console.log(x,y)

	// 判断方向
	var direction = Math.round( (((Math.atan2(y,x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
	//获得的值为0,1,2,3 分别对应上下左右

	var eventType = e.type;

	if(e.type == 'mouseenter'){
		if(direction == 0){
			$(this).find('.mask').css({'display':'block','top':-h+'px','left':'0px'}).animate({'top':'0px'});
		}else if(direction==1){
              	$(this).find('.mask').css({'display':'block','left':w+'px','top':'0px'}).animate({'left':'0px'});
        }else if(direction==2){
              	$(this).find('.mask').css({'display':'block','top':h+'px','left':'0px'}).animate({'top':'0px'});
        }else if(direction==3){
              	$(this).find('.mask').css({'display':'block','left':-w+'px','top':'0px'}).animate({'left':'0px'});
        }
	}else {
		if(direction==0){
              	$(this).find('.mask').animate({'top':-h+'px'});
        }else if(direction==1){
              	$(this).find('.mask').animate({'left':w+'px'});
        }else if(direction==2){
              	$(this).find('.mask').animate({'top':h+'px'});
        }else if(direction==3){
              	$(this).find('.mask').animate({'left':-w+'px'});
        }
	}
});