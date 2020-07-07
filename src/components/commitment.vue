<template>
  <div class="box">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">售后服务</p>
    </div>
    <div class="main">
      <!-- <ul class="list01">
              <li><u></u></li>
              <li><h3>一证件</h3></li>
              <li><p>持证上门服务</p></li>
          </ul>
          <ul class="list02">
              <li><u></u></li>
              <li><h3>二公开</h3></li>
              <li><p>公开客户意见反馈<br/>公开服务监督</p></li>
          </ul>
          <ul class="list03">
              <li><h3>三到位</h3></li>
              <li><p>机器安装到位</p><p class="icon02">培训讲解到位</p><p class="icon03">服务及时到位</p></li>
          </ul>
          <ul class="list04">
              <li><h3>四不准</h3></li>
              <li><p class="icon01"></p><p class="icon02"></p><p class="icon03"></p><p class="icon04"></p></li>
          </ul>
          <ul class="list05">
              <li><h3>五个一</h3></li>
              <li><p class="icon01">一直在线</p></li>
              <li><p class="icon02">一年保修</p><p class="icon03">一小时应答</p></li>
              <li><p class="icon04">一定按时到位</p><p class="icon05">一站式服务</p></li>
      </ul> -->
      <img :src="srcImg" alt class="bgimg">
      
    </div>
  </div>
</template>

<script>
import baseUrl from "../api/baseUrl.js";
import Cookie from "../api/cookie.js";
import { Toast, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      srcImg: ""
    };
  },
  created() {
    var _this = this;
    //售后服务图片
    this.$Axios
      .post(baseUrl + "/afterServicePic/queryAfterService")
      .then(function(response) {
        if (response.data.code == 200) {
          _this.srcImg = baseUrl + response.data.data[0].picUrl;
        }
      })
      .catch(function(error) {
        Toast({
          message: "网络开小差，请稍后重试",
          duration: 1000
        });
      });
  },
  methods: {
    toback() {
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>
<style scoped>
.main .list01 {
  width: 7.5rem;
}
.main .bgimg {
  width: 7.5rem;
  height: auto;
}

.main .list01 li u{
    display: block;
    width: 3.05rem;
    height: 2.49rem;
    background: url('../assets/logo.png')no-repeat;
    background-size: 100% 100%;
    margin: 1.2rem auto .55rem;
}
.main .list01 li h3{
    color: #998bd6;
    text-align: center;
    font-size: .5rem;
    line-height: .5rem;
    height: .5rem;
    margin-bottom: .35rem;
}
.main .list01 li p{
    width: 3.5rem;
    color: #919191;
    text-align: center;
    font-size: .28rem;
    line-height: .28rem;
    height: .28rem;
    margin: 0 auto;
}
.main .list02 li u{
    display: block;
    width: 1.11rem;
    height: .95rem;
    background: url('../assets/dbuser.png')no-repeat;
    background-size: 100% 100%;
    margin: 1.4rem auto .58rem;
}
.main .list02 li h3{
    color: #998bd6;
    text-align: center;
    font-size: .5rem;
    line-height: .5rem;
    height: .5rem;
    margin-bottom: .25rem;
}
.main .list02 li p{
    width: 3.5rem;
    color: #919191;
    text-align: center;
    font-size: .28rem;
    line-height: .53rem;
    margin: 0 auto;
}



.main .list03 li h3{
    margin-top: 1.35rem;
    color: #998bd6;
    text-align: center;
    font-size: .5rem;
    line-height: .5rem;
    height: .5rem;
    margin-bottom: .55rem;
}
.main .list03 li p{
    width: 1.8rem;
    color: #919191;
    text-align: center;
    font-size: .28rem;
    line-height: .3rem;
    height: .3rem;
    display: inline-block;
    vertical-align: top ;
    padding-top: 1.5rem;
    margin: 0 .35rem;
    background: url('../assets/commit_icon01.png')no-repeat;
    background-size: 1.25rem 1.25rem;
    background-position: .37rem 0;
}
.main .list03 li .icon02{
    background: url('../assets/commit_icon02.png')no-repeat;
    background-size: 1.25rem 1.25rem;
    background-position: .37rem 0;
}
.main .list03 li .icon03{
    background: url('../assets/commit_icon03.png')no-repeat;
    background-size: 1.25rem 1.25rem;
    background-position: .37rem 0;
}
.main .list04 li h3{
    margin-top: 1.4rem;
    color: #998bd6;
    text-align: center;
    font-size: .5rem;
    line-height: .5rem;
    height: .5rem;
    margin-bottom: .6rem;
}
.main .list04 li p{
    display: inline-block;
    vertical-align: top;
    width: 1.26rem;
    height: 1.26rem;
    background: url('../assets/forbid01.png')no-repeat;
    background-size: 100% 100%;
    margin: 0 .28rem;
}
.main .list04 li .icon01{
   margin-left: .38rem;
}
.main .list04 li .icon02{
    background: url('../assets/forbid02.png')no-repeat;
    background-size: 100% 100%;
}
.main .list04 li .icon03{
    background: url('../assets/forbid03.png')no-repeat;
    background-size: 100% 100%;
}
.main .list04 li .icon04{
    background: url('../assets/forbid04.png')no-repeat;
    background-size: 100% 100%;
}
.main .list05 li h3{
    margin-top: 1.25rem;
    color: #998bd6;
    text-align: center;
    font-size: .5rem;
    line-height: .5rem;
    height: .5rem;
    margin-bottom: .55rem;
}
.main .list05 li p{
    width: 1.15rem;
    color: #919191;
    text-align: center;
    font-size: .28rem;
    line-height: .3rem;
    height: .3rem;
    display: inline-block;
    vertical-align: top ;
    padding-top: 1rem;
    margin: 0 .35rem;
    background: url('../assets/phone_icon02.png')no-repeat;
    background-size: .72rem .76rem;
    background-position: .2rem 0;
}
.main .list05 li .icon01{
    display: inherit;
    margin: 0 auto .3rem;
}
.main .list05 li .icon02{
    margin-left: 1rem;
    background: url('../assets/phone_icon05.png')no-repeat;
    background-size: .72rem .76rem;
    background-position: .2rem 0;
}
.main .list05 li .icon03{
    width: 1.45rem;
    margin-left: 2.87rem;
    background: url('../assets/phone_icon03.png')no-repeat;
    background-size: .89rem .76rem;
    background-position: .3rem 0;
}
.main .list05 li .icon04{
    width: 1.7rem;
    margin:.54rem 0 1.3rem 1.45rem;
    background: url('../assets/phone_icon04.png')no-repeat;
    background-size: .74rem .74rem;
    background-position: .54rem 0;
}
.main .list05 li .icon05{
    width: 1.4rem;
    margin:.54rem 0 1.3rem 1.25rem;
    background: url('../assets/phone_icon01.png')no-repeat;
    background-size: .44rem .75rem;
    background-position: .54rem 0;
}
</style>

