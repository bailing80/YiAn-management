const wx = require('weixin-js-sdk');
import Api from './index.js';
let initShare = function (path){
  let url = window.location.href.split('#')[0] + '#' + path;
  let homeUrl = 'https://chinalife.bdideal.com/chinalife/message/index.html';
  Api.get('/message/share',{url: url}, res => {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: res.data.data.appId, // 必填，公众号的唯一标识
      timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
      nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
      signature: res.data.data.signature,// 必填，签名
      jsApiList: res.data.data.jsApiList // 必填，需要使用的JS接口列表
    });
    wx.ready(function(){
      wx.onMenuShareTimeline({
        title: '国寿祝福墙',
        link: homeUrl,
        imgUrl: 'https://chinalife.bdideal.com/chinalife/message/assets/index/wxShare.jpg',
        success: function(){}
      });
      wx.onMenuShareAppMessage({
        title: '国寿祝福墙', // 分享标题
        desc: '把祝福送给你的TA，神秘礼品等你来拿！', // 分享描述
        link: homeUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'https://chinalife.bdideal.com/chinalife/message/assets/index/wxShare.jpg', // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
        // 用户点击了分享后执行的回调函数
        }
      });
    })
  }, err => {
    
  })
}
// let initShare = function(p){};
export default{
  initShare: initShare
}