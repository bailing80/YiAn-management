
var setCookie = function (name, value, day) {
  if(day !== 0){     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
    // var expires = day * 24 * 60 * 60 * 1000;
    var expires = day * 24 * 60  * 60 * 1000;
    // var expires = day  * 30 * 1000;
    var date = new Date(+new Date()+expires);
    document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
  }else{
    document.cookie = name + "=" + escape(value);
  }
};

var getCookie = function (name) {
  var arr;
  var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
};


var clearCookie = function(name){
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        setCookie(name, "", -1);
    }
}

//字符串替换 空格
var StringConversion = function(str,zifuchangdu){
  //字符长度
  let strlen = str.length;
  //一个放字符串截取 出来的数据
  let arrlist  = [];
  //循环截取 字符串  push 进 arrlist里     Math.ceil(strlen / zifuchangdu) 向上取整
  for(let i = 0 ; i < Math.ceil(strlen / zifuchangdu) ;i++){
    arrlist.push(str.slice(zifuchangdu*i,(i+1)*zifuchangdu))
  }
  //声明空字符串 添加空格 或 <br/>
  let objstr = '';
  //循环往后面添加空白 或 <<br/>
  for(let k = 0 ; k <arrlist.length;k++){
    if(k == arrlist.length-1){
      //判断等于最后一个  不加空白  或  <br/>
      objstr+= arrlist[k];
    }else{
      //不是最后一个
      objstr+= arrlist[k]+' ';
    }
  }
  return objstr;
}

export default {
  setCookie: setCookie,
  getCookie: getCookie,
  clearCookie:clearCookie,
  StringConversion:StringConversion,
}