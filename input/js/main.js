var data = [{
  "color": [
    "gray",
    "red",
    "green",
    "orange"
  ],
  "text": {
    "name": [
      '必填，长度为4~16个字符',
      '名称长度错误',
      '名称可用'
    ],
    "pass": [
      '必填，长度为4~16个字符',
      '名称长度错误',
      '名称可用'
    ],
    "reppass": [
      '再次输入相同的密码',
      '输入相同的密码',
      '密码一致'
    ],
    "email": [
      '输入邮箱',
      '请输入正确的邮箱',
      '邮箱正确',
      '请输入正确格式的邮箱'
    ],
    "mobile": [
      '输入手机号',
      '请输入正确的手机号',
      '手机格式正确',
      '请输入正确格式的手机号'
    ],
  }
}

]

var label = document.getElementsByTagName('label');
var test = document.getElementsByClassName('test');

//e 传入元素
//n 所属类别 
//i 索引值
//num 
function testFirst(e, n, i, num) {
  e.style.borderColor = data[0].color[num];
  test[i].innerHTML = data[0].text[n][num];
  test[i].style.color = data[0].color[num];
}

//inex 索引值
//val 当前的值
//ele 当前元素
//n 所属类别
var password = null;
//邮箱正则验证
var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
//手机号码正则验证
var mReg = /^1[3|4|5|8][0-9]\d{4,8}$/;
//验证数组
var arr = [0,0,0,0,0];

function changeArr(index,num) {
    arr[index] = num;
}

function testsecond(index, val, ele, n) {
  // var password = null;
  if (index == 0) {
    if (val == '') {
      testFirst(ele, n, index, 1);
      changeArr(index,0);
    } else {
      if (val.length < 4) {
        testFirst(ele, n, index, 1);
        changeArr(index,0);
      }
      else if (val.length >= 4) {
        testFirst(ele, n, index, 2);
        changeArr(index,1);
      } 
      else if(val.length > 16) {
        testFirst(ele, n, index, 1);
        changeArr(index,0);
      }
    }
  } else if (index == 1) {
    if (val == '') {
      testFirst(ele, n, index, 1);
      changeArr(index,0);
    } else {
      password = val;
      if (val.length < 4) {
        testFirst(ele, n, index, 1);
        changeArr(index,0);
      }
      else if (val.length >= 4) {
        testFirst(ele, n, index, 2);
        changeArr(index,1);
      } 
      else if(val.length > 16){
        testFirst(ele, n, index, 1);
        changeArr(index,0);
      }
    }
  } else if (index == 2) {
    // console.log(password);
    if (val != password) {
      testFirst(ele, n, index, 1);
      changeArr(index,0);
    } else {
      testFirst(ele, n, index, 2);
      changeArr(index,1);
    }
  } else if (index == 3) {
    if(val == '') {
        testFirst(ele, n, index, 1);
        changeArr(index,0);
    }
    else {
        if (reg.test(val)) {
          testFirst(ele, n, index, 2);
          changeArr(index,1);
        } else {
          testFirst(ele, n, index, 3);
          changeArr(index,0);
        }
    }
  } else if (index == 4) {
    if (val == '') {
      testFirst(ele, n, index, 1);
      changeArr(index,0);
    } else {
      if (val.length == 11) {
        if(!(mReg.test(val))){ 
          testFirst(ele, n, index, 3);
          changeArr(index,0);
        }else {
          testFirst(ele, n, index, 2);   
          changeArr(index,1);  
        } 
      } 
      else {
        testFirst(ele, n, index, 1);
        changeArr(index,0);
      }
    }
  }
}


for (let i = 0; i < label.length; i++) {

  //得到焦点 提示输入内容
  label[i].getElementsByTagName('input')[0].onfocus = function () {
    if (i == 0) {
      var index = i;
      var ele = this;
      var n = "name";
      testFirst(ele, n, index, 0);
    } else if (i == 1) {
      var index = i;
      var ele = this;
      var n = "pass";
      testFirst(ele, n, index, 0);
    } else if (i == 2) {
      var index = i;
      var ele = this;
      var n = "reppass";
      testFirst(ele, n, index, 0);
    } else if (i == 3) {
      var index = i;
      var ele = this;
      var n = "email";
      testFirst(ele, n, index, 0);
    } else if (i == 4) {
      var index = i;
      var ele = this;
      var n = "mobile";
      testFirst(ele, n, index, 0);
    }
  }

  //失去焦点 提示输入内容是否正确
  label[i].getElementsByTagName('input')[0].onblur = function () {
    if (i == 0) {
      var val = this.value;
      var ele = this;
      //i 索引值
      //val 当前的值
      //ele 当前元素
      //所属类别
      testsecond(i, val, ele, 'name');
    } else if (i == 1) {
      var val = this.value;
      var ele = this;
      testsecond(i, val, ele, 'pass');
    } else if (i == 2) {
      var val = this.value;
      var ele = this;
      testsecond(i, val, ele, 'reppass');
    } else if (i == 3) {
      var val = this.value;
      var ele = this;
      testsecond(i, val, ele, 'email');
    } else if (i == 4) {
      var val = this.value;
      var ele = this;
      testsecond(i, val, ele, 'mobile');
    }
  }
}

document.getElementById('btn').onclick = function() {
    var result = arr.every(function(item,index) {
        if(item == 1) {
            return true;
        }
    });
    if(result) {
        alert('提交成功')
    }else {
        alert('提交失败')
    }
}