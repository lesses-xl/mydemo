<?php 

	//读取json文件
	$json = file_get_contents('data.json');

	//转为php数组
	$phpJson = json_decode($json);

	//从数组中随机获取10个值 返回的是一个随机key数组
	$keys = array_rand($phpJson,10);

	//得到10个值
	//count()可以获得数组长度	

	//准备一个新的数组
	$newArr = array();
	for($i=0; $i<count($keys); $i++){
		//获取索引数组中的每一个key
		$key = $keys[$i];

		//获得对应的值
		$obj = $phpJson[$key];

		//丢到新的数组中
		$newArr[$i] = $obj;
	}

	echo json_encode($newArr);
 ?>