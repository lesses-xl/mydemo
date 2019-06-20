$(function(){
	var timer1 = null;
	var timer2 = null;
	var timer3 = null;
	var txt = "无锡";
	var val = "无锡";
	function weather1(){
		txt = encodeURIComponent(txt);
		$.ajax({
			type:"get",
			url:"http://op.juhe.cn/onebox/weather/query?key=935d211559df108053484d0b6bb35802&dtype=jsonp&cityname=" + txt,
			dataType:"jsonp",
			success:function(data){
				// console.log(data);
				// console.log(txt);
				if(data.reason == '查询成功!') {
					$("#today").html("");
					var realtime = data.result.data.realtime;
					var city = realtime["city_name"];
					var tianqi = realtime["weather"]["info"];
					var qiwen = realtime["weather"]["temperature"];
					var fenxiang = data.result.data.realtime.wind["direct"];
					fenxiang += data.result.data.realtime.wind["power"];
					var shidu = realtime["weather"]["humidity"];
					var uptime = realtime["time"];
					var weatherdata = [city,tianqi,qiwen+"℃",fenxiang,shidu,uptime];
					var weathername = ["城市","天气","气温","风向","湿度","更新时间"];

					var afterweather = data.result.data["weather"];
					$("#day1").text(data.result.data["weather"][0]["date"]+"(今日)");
					$("#day2").text(data.result.data["weather"][1]["date"]);
					$("#day3").text(data.result.data["weather"][2]["date"]);
					// console.log(weatherdata);
					for(var i=0; i<weatherdata.length; i++){
						$("#today").append("<p>"+ weathername[i] +':'+"<span>"+ weatherdata[i] +"</span></p>")
					};
					var weathername1 = ["城市","白天天气","最高气温","风向","风力"];
					timer1 = setTimeout(function(){
						var w1 = [city,afterweather[1]["info"]["day"][1],afterweather[1]["info"]["day"][2]+"℃",afterweather[1]["info"]["day"][3],afterweather[1]["info"]["day"][4]]
						$("#tomorrow").html("");
						for(var i=0; i<w1.length; i++){
							$("#tomorrow").append("<p>"+ weathername1[i] +':'+"<span>"+ w1[i] +"</span></p>")
						};
					},600);

					timer2 = setTimeout(function(){
						var w2 = [city,afterweather[2]["info"]["day"][1],afterweather[2]["info"]["day"][2]+"℃",afterweather[2]["info"]["day"][3],afterweather[2]["info"]["day"][4]]
						$("#afterday").html("");
						for(var i=0; i<w2.length; i++){
							$("#afterday").append("<p>"+ weathername1[i] +':'+"<span>"+ w2[i] +"</span></p>")
						};
					},600);
				}else {
					alert('请输入正确的城市!')
				}
			},
			error:function(){
				console.log("出错啦~")
			}
		})
	};

	(function demo1(){
		weather1();
		$("#update").click(function(){
			clearTimeout(timer1);
			clearTimeout(timer2);
			txt = val;
			weather1();
		});

		$("#day li").click(function(item,index){
			$("#day li").removeClass();
			$(this).addClass('current');
			for(var i=0; i<2; i++){
				$("#tab>div").hide();
			};
			// console.log($(this).index());
			$("#tab>div").eq($(this).index()).show();
		});

		$("#btn1").click(function(){
			txt = $("#text1").val();
			val = $("#text1").val();
			weather1();
		});
	})();

	(function demo2(){
		var num = 0;
		timer3 = setInterval(move,2500)

		function move(){
			if(num <= 4){
				$("#circle>span").removeClass();
				num++;
				$("#pic").animate({
					left: -num*$("#pic img").width()
				});
				
				$("#circle>span").eq(num).addClass('current')
				if(num == 5){
					$("#circle>span").eq(0).addClass('current');
				}
				// console.log($("#pic img").width());

			}

			if($("#pic").css("left") == "-2900px"){
				$("#pic").css("left",0);
				num = 0;
				// console.log(num);
			}

			// console.log($("#pic").css("left"))
		}

		$("#shuff").mouseenter(function(){
			clearInterval(timer3);
		}).mouseleave(function(){
			timer3 = setInterval(move,2500);
		})

		for(var i=0; i<$("#circle>span").length; i++){
			$("#circle>span").eq(i).click(function(){
				// alert($(this).index());
				$("#circle>span").removeClass();
				num = $(this).index();
				$("#pic").animate({
					left:-num*$("#pic img").width()
				});
				$(this).addClass('current');
			})
		}
	})();
})