/*以下某部分代码来自于
	http://blog.ilanyy.com/   */

	// 1、我们会传递给你一个包含两个数字的数组。返回这两个数字和它们之间所有数字的和
	// sumAll([66,6])
		function sumAll(arr) {
		  var min = arr.reduce(function(pre,cur){
		      return Math.min(pre,cur);
		  });
		  var max = arr.reduce(function(pre,cur){
		      return Math.max(pre,cur);
		  }); 
		  var sum = min + max;
		  for(var i=min+1; i<max; i++){
		      sum +=i;
		  }
		  return sum;
		};


	// 2、比较两个数组，然后返回一个新数组，该数组的元素为两个给定数组中所有独有的数组元素。换言之，返回两个数组的差异。
	// diff([1,2,3],[2,3,4,5])  返回4,5
		function diff(arr1,arr2){
			var newArr = [];
			var arr3 = [];
			var arr4 = [];
			for(var i=0; i<arr1.length; i++){
				if(arr2.indexOf(arr1[i]) === -1){
					arr3.push(arr1[i]);  //1,4,5
				}
			}

			for(var j=0; j<arr2.length; j++){
				if(arr1.indexOf(arr2[j]) === -1){
					arr4.push(arr2[j]);
				}
			}
			 newArr = arr3.concat(arr4);
			 alert(newArr);
		};


	// 3、先给数组排序，然后找到指定的值在数组的位置，最后返回位置对应的索引。
	// where([22,33,50,12,27,88],33)	返回1
		function where(arr,num){
			arr = arr.sort(function(a,b){
				return a-b;
			});
			var result = arr.reduce(function(prev,curr,index){
				if(prev == -1 && num <= curr){
					return index;
				}
				else{
					return prev;
				}
			},1);

			if(result == -1){
				result = arr.length;
			}
			alert(result);
		};
		where();

	// 4、金克斯的迫击炮！ 实现一个摧毁函数，第一个参数是待摧毁的数组，其余的参数是待摧毁的值。	
	// 两种方法
	// destroyer2([1,2,3,4,5,6,7,8],2,3)  返回[1,4,5,6,7,8]
	// destroyer1([1,2,3,4,5,6],2,3)
		function destroyer1(arr){
			var args = [].slice.call(arguments),arr = args.shift();
			for(var i=arr.length-1; i>=0; i--){
				args.indexOf(arr[i]) != -1 && arr.splice(i,1);
			}
			alert(arr);
		};

		function destroyer2(arr){
			var a = function(val){
			    return val!=this;
			};
			for(var i =0; i<arguments.length; i++){
			   arr = arr.filter(a,arguments[i]);
			}
			 alert(arr);
		};


	// 5、将给定的数字转化为罗马数字
	//trans(666);
		function trans(num){
			var alpha = [ 'I', 'V', 'X', 'L', 'C', 'D', 'M' ];
			var roman = "";
			var bit = 0;
			while (num > 0){  
				var tempnum = num % 10;
				switch (tempnum){  
					case 3:{   
						roman = alpha[bit] + roman;  
						tempnum--;
					}  
					case 2:{  
						roman = alpha[bit] + roman;  
						tempnum--;
					}  
					case 1:{  
						roman = alpha[bit] + roman;  
						break;  
					}  
					case 4:{  
						roman = alpha[bit + 1] + roman;
						roman = alpha[bit] + roman;  
						break;  
					}  
					case 8:{  
						roman = alpha[bit] + roman; 
						tempnum--;
					}  
					case 7:{  
						roman = alpha[bit] + roman; 
						tempnum--;
					}  
					case 6:{  
						roman = alpha[bit] + roman;  
						tempnum--;
					}  
					case 5:{  
						roman = alpha[bit + 1] + roman;  
						break;  
					}  
					case 9:{ 
						roman = alpha[bit + 2] + roman; 
						roman = alpha[bit] + roman; 
						break;  
					}  
					default:{  
						break;  
					}  
				}  
				bit += 2;  
				num = Math.floor(num / 10);  
			}  
			alert(roman);
		}

	
	// 6、写一个 function，它遍历一个对象数组（第一个参数）并返回一个包含相匹配的属性-值对（第二个参数）的所有对象的数组。如果返回的数组中包含 source 对象的属性-值对，那么此对象的每一个属性-值对都必须存在于 collection 的对象中。
	//where([{ "a": 1, "b": 2 }, { "a": 1 }, { "a": 1, "b": 2, "c": 2 }], { "a": 1, "b": 2 }) 应该返回 [{ "a": 1, "b": 2 }, { "a": 1, "b": 2, "c": 2 }]。
		function where(collection, source) {
		  var arr = [];
		  // What's in a name?
		  var keys = Object.keys(source);
		  arr = collection.filter(function(item) {
		    return keys.every(function(key) {
		      return item.hasOwnProperty(key) && item[key] === source[key];
		    });
		  }); 
		  return arr;
		}


	// 7、使用给定的参数对句子执行一次查找和替换，然后返回新句子。第一个参数是将要对其执行查找和替换的句子。第二个参数是将被替换掉的单词（替换前的单词）。第三个参数用于替换第二个参数（替换后的单词）。
	// myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped")  返回"A quick brown fox leaped over the lazy dog"
		function myReplace(str, before, after) {
		  var index = str.indexOf(before);
		  // 比较这个字母是不是大写
		  if(str[index] === str[index].toUpperCase()){
		  	// 就是把这个字符串的第一个字母选中 然后 加上第一个字母之后的内容
		    after = after.charAt(0).toUpperCase() + after.slice(1);
		  }
		  str = str.replace(before,after);
		  return str;
		}

		
	// 8、把指定的字符串翻译成 pig latin。
	// translate("consonant")   这个没有看懂;
		function translate(str) {
		  var yuan = ["a","e","i","o","u"];
		  if(yuan.indexOf(str[0]) >= 0){
		    return str + "way";
		  }
		  while(yuan.indexOf(str[0]) < 0){
		    str = str.substr(1) + str.substr(0,1);
		  }
		  return str + "ay";
		}


	// 9、DNA 链缺少配对的碱基。依据每一个碱基，为其找到配对的碱基，然后将结果作为第二个数组返回。Base pairs（碱基对） 是一对 AT 和 CG为给定的字母匹配缺失的碱基。在每一个数组中将给定的字母作为第一个碱基返回。例如，对于输入的 GCG，相应地返回 [["G", "C"], ["C","G"],["G", "C"]]
	// pair("AATTCG");
		function pair(str) {
		  var arr = [];
		  for(var i=0; i<str.length; i++){
		    if(str[i] == "T"){
		      arr.push(["T","A"]);
		    }
		    else if(str[i] == "A"){
		      arr.push(["A","T"]);
		    }
		     else if(str[i] == "G"){
		      arr.push(["G","C"]);
		    }
		    else {
		      arr.push(["C","G"]);
		    }
		  }
		  return arr;
		}


	// 10、从传递进来的字母序列中找到缺失的字母并返回它。如果所有字母都在序列中，返回 undefined。
	// fearNotLetter("abdefg")  返回c;
		function fearNotLetter(str) {
		  var arr = str.split("");
		  var temp = [];
		  var start = str.charCodeAt(0);
		  var end = str.charAt(str.length - 1).charCodeAt(0);
		  for(var i = start; i < end + 1; i++){
		    var item = String.fromCharCode(i);
		    if(arr[0] !== item){  
		      temp.push(item);
		    }else{
		      arr.shift();
		    }
		  }
		  if(temp.length === 0){
		    return undefined;
		  }else{
		    return temp.join("");
		  }  
		}


	// 11、检查一个值是否是基本布尔类型，并返回 true 或 false。
	// boo(NaN);
	// boo(1);
	// boo(false);
	// boo("a");
		function boo(bool){
			var boolean = typeof bool === "boolean";
			alert(boolean);
		}


	// 12、写一个 function，传入两个或两个以上的数组，返回一个以给定的原始数组排序的不包含重复值的新数组。换句话说，所有数组中的所有值都应该以原始顺序被包含在内，但是在最终的数组中不包含重复值。非重复的数字应该以它们原始的顺序排序，但最终的数组不应该以数字顺序排序。
	// unite([1, 3, 2], [5, 2, 1, 4], [2, 1]) 应该返回 [1, 3, 2, 5, 4]。
		function unite(arr1, arr2, arr3) {
		  var args = Array.from(arguments);
		  var arr = args.reduce(function(prev,cur,index,array){
		    return prev.concat(cur);
		  });
		  return arr.filter(function(item,index,array){
		    return array.indexOf(item) === index;
		  });
		}


	// 13、将字符串中的字符 &、<、>、"（双引号）,以及 ' （单引号）转换为它们对应的 HTML 实体。
	// convert("Dolce & Gabbana") 应该返回 Dolce &​amp; Gabbana。
		function convert(str) {
		  str = str.replace(/[&]/g,"&amp;").replace(/[<]/g,"&lt;").replace(/[>]/g,"&gt;")
		           .replace(/[']/g,"&apos;").replace(/["]/g,"&quot;");
		  return str;
		}


	// 14、将字符串转换为 spinal case。Spinal case 是 all-lowercase-words-joined-by-dashes 这种形式的，也就是以连字符连接所有小写单词。
	// spinalCase("thisIsSpinalTap") 应该返回 "this-is-spinal-tap"。
	// spinalCase("The_Andy_Griffith_Show") 应该返回 "the-andy-griffith-show"。	
		function spinalCase(str){
			str = str.replace(/_/g," ")
					 .replace(/([A-Z])/g," $1")
					 .replace(/^\s/g,"")
					 .replace(/s+/g,"-")
					 .toLowerCase();	
			return str;		 
		}


	// 15、给一个正整数num，返回小于或等于num的斐波纳契奇数之和
	// 	斐波纳契数列中的前几个数字是 1、1、2、3、5 和 8
	// 	随后的每一个数字都是前两个数字之和。例如，sumFibs(4)应该返回 5
	// 	因为斐波纳契数列中所有小于4的奇数是 1、1、3
	// 	提示：此题不能用递归来实现斐波纳契数列。因为当num较大时内存会溢出，推荐用数组来实现。
	// sumFibs(75024) 应该返回 60696。
		function sumFibs(num) {
		  var fibo = [1, 1];
		  var oddSum = 2;
		  while(true){
		    var item = fibo[0] + fibo[1];
		    if(num < item){
		      return oddSum;
		    }
		    if(item % 2){
		      oddSum += item;    
		    }
		    fibo[0] = fibo[1];
		    fibo[1] = item;
		  }
		}


	// 16、求小于等于给定数值的质数之和。
	// 	只有 1 和它本身两个约数的数叫质数。例如，2 是质数，因为它只能被 1 和 2整除。1 不是质数，因为它只能被自身整除。	
	// 	给定的数不一定是质数。
	// sumPrimes(10) 应该返回 17。
		function sumPrimes(num) {
		  var arr = [];
		  var ifPrime = function(num){
		    if(num < 2){
		      return false;
		    }
		    if(num === 2){
		      return true;
		    }
		    if(num % 2 === 0){
		      return false;
		    }
		    for(var i = 3; i <= Math.sqrt(num); i+=2){
		      if(num % i === 0){
		        return false;
		      }
		    }
		    return true;
		  };
		  for(var i = 2; i <= num; i++){
		    if(ifPrime(i)){
		      arr.push(i);
		    }
		  }
		  return arr.reduce(function(prev,cur,index,array){
		     return prev + cur;
		  },0);
		}


	// 17、找出能被两个给定参数和它们之间的连续数字整除的最小公倍数。
	// 	范围是两个数字构成的数组，两个数字不一定按数字顺序排序。
	// 	例如对 1 和 3 —— 找出能被 1 和 3 和它们之间所有数字整除的最小公倍数。
	// smallestCommons([1, 5]) 应该返回 60。
		function smallestCommons(arr) {
		  var min = Math.min(arr[0],arr[1]);
		  var max = Math.max(arr[0],arr[1]);
		  var _arr = [];
		  for(var i = min; i <= max; i++){
		    _arr.push(i);
		  }
		  var gcd = function(a,b){
		    if(b){
		      return gcd(b, a % b);
		    }
		    return a;
		  };
		  return _arr.reduce(function(prev,cur,index,array){
		    return prev*cur/gcd(prev,cur);
		  });
		}	


	// 18、写一个 function，它浏览数组（第一个参数）并返回数组中第一个通过某种方法（第二个参数）验证的元素。
	// find([1, 3, 5, 8, 9, 10], function(num) { return num % 2 === 0; }) 应该返回 8。
		function find(arr, func) {
		  return arr.filter(func)[0];
		}	


	// 19、Drop it
	// drop([1, 2, 3, 4], function(n) {return n >= 3;}) 应该返回 [3, 4]。
	// drop([0, 1, 0, 1], function(n) {return n === 1;}) 应该返回 [1, 0, 1]。
		function drop(arr, func) {
		  // Drop them elements.
		  while(!func(arr[0]) && arr.length > 0){
		    arr.shift();
		  }
		  return arr;
		}	


	// 20、对嵌套的数组进行扁平化处理。你必须考虑到不同层级的嵌套。
	// steamroller([[["a"]], [["b"]]]) 应该返回 ["a", "b"]。
	// steamroller([1, [2], [3, [[4]]]]) 应该返回 [1, 2, 3, 4]。
		function steamroller(arr) {
		  // I'm a steamroller, baby 
		  var result = [];
		  for(var i = 0; i < arr.length; i++){
		    if(Array.isArray(arr[i])){
		      result = result.concat(steamroller(arr[i]));
		    }else{
		      result.push(arr[i]);
		    }
		  }
		  return result;
		}	


	// 21、传入二进制字符串，翻译成英语句子并返回。二进制字符串是以空格分隔的。
	// binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111") 应该返回 "Aren't bonfires fun!?"	
		function binaryAgent(str) {
		  var arr = str.split(" ");
		  arr = arr.map(function(item,index,array){
		    return String.fromCharCode(parseInt(item,2));
		  });
		  
		  return arr.join("");
		}


	// 22、所有的东西都是真的！
	// 	完善编辑器中的every函数，如果集合(collection)中的所有对象都存在对应的属性(pre)，并且属性(pre)对应的值为真。函数返回ture。反之，返回false。
	// 	记住：你只能通过中括号来访问对象的变量属性(pre)。
	// 	提示：你可以有多种实现方式，最简洁的方式莫过于Array.prototype.every()。
	// every([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex") 应该返回 true。
	// every([{"user": "Tinky-Winky", "sex": "male", "age": 0}, {"user": "Dipsy", "sex": "male", "age": 3}, {"user": "Laa-Laa", "sex": "female", "age": 5}, {"user": "Po", "sex": "female", "age": 4}], "age") 应该返回 false。
		function every(collection, pre) {
		  // Is everyone being true?
		  return collection.every(function(item,index,array){
		    return item[pre];
		  });
		}


	// 23、创建一个计算两个参数之和的 function。如果只有一个参数，则返回一个 function，该 function 请求一个参数然后返回求和的结果。
	// 	例如，add(2, 3) 应该返回 5，而 add(2) 应该返回一个 function。
	// 	调用这个有一个参数的返回的 function，返回求和的结果：
	// 	var sumTwoAnd = add(2);
	// 	sumTwoAnd(3) 返回 5。
	// 	如果两个参数都不是有效的数字，则返回 undefined。
	// add(2, "3") 应该返回 undefined。
	// add(2)(3) 应该返回 5。
	// add(2, 3) 应该返回 5。
		function add() {
		  if(typeof arguments[0] !== "number" || (arguments.length > 1 && typeof arguments[1] !== "number")){
		    return undefined;
		  }
		  if(arguments.length == 1){
		    var arg0 = arguments[0];
		    return function(num){
		      if(typeof num !== "number"){
		        return undefined;
		      }
		      return arg0 + num;
		    };
		  }else{
		    return arguments[0] + arguments[1];
		  }
		}


	// 23、如果传入字符串是一个有效的美国电话号码，则返回 true
	// 	用户可以在表单中填入一个任意有效美国电话号码. 下面是一些有效号码的例子(还有下面测试时用到的一些变体写法):
	// 	555-555-5555
	// 	(555)555-5555
	// 	(555) 555-5555
	// 	555 555 5555
	// 	5555555555
	// 	1 555 555 5555	
	// 	在本节中你会看见如 800-692-7753 or 8oo-six427676;laskdjf这样的字符串. 你的任务就是验证前面给出的字符串是否是有效的美国电话号码. 区号是必须有的. 如果字符串中给出了国家代码, 你必须验证其是 1. 如果号码有效就返回 true ; 否则返回 false.
	// telephoneCheck("1 555-555-5555") 应该返回 true.
	// telephoneCheck("1(555)555-5555") 应该返回 true.
	// telephoneCheck("1 555 555 5555") 应该返回 true.
	// telephoneCheck("0 (757) 622-7382") 应该返回 false.
	// telephoneCheck("-1 (757) 622-7382") 应该返回 false.
	// telephoneCheck("2(757)622-7382") 应该返回 false.
		function telephoneCheck(str) {
		  // Good luck!
		  var re = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})$/;

		  return re.test(str);
		}