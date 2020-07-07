<template>
  <div class="box">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">维修知识</p>
    </div>
    <div class="radio" v-show="this.$route.query.video != ''">
      <div class="mengban"></div>
      <video
        id="myVideo"
        class="video-js"
        controls
        preload="none"
        data-setup="{}"
        style="height: 4.22rem;width: 100%;object-fit: fill;"
        playsinline
        webkit-playsinline="true"
        x5-playsinline
        x-webkit-airplay="allow"
      >
        <source src id="srcImg" type="video/mp4">
      </video>
    </div>
    <div class="main">
      <h3>{{productLine.title}}</h3>
      <i>2019-01-01</i>
      <div class="divlist" v-html="productLine.content">{{productLine}}</div>
      <img :src="productLine.picture" alt>
      <div class="down">
        <p class="wenjian">附件:&nbsp;&nbsp;{{fileName}}</p>
      </div>
      <div id="copyBT" v-show="bool1 && bool" style="font-size: 0.3rem;
    word-break: break-all;
    color: rgb(153, 139, 214);
    margin-bottom: 0.5rem;
    position: fixed;
    top: 0;
    opacity: 0;
    right: 1000px;
    width: 100%;
    height: auto;">{{productLine.file}}</div>
      <div class="down">
        <i>
          <a style="margin-right:1rem" v-show="bool&&!bool1" :href="productLine.file" target="_blank" download="true">下载</a>
          <a id="contentas" style="display: initial;" v-show="bool1 && bool">点击复制 - 切换浏览器下载</a>
          <a v-show="exhFlag" :href="fileExh" target="_blank" >预览</a>
        </i>
      </div>
    </div>

    <div class="sendbtn dw" @click="tosend()">维修在线指导</div>
  </div>
</template>

<script>
import baseUrl from "../api/baseUrl.js";
import Cookie from "../api/cookie.js";
import { Toast, MessageBox } from "mint-ui";
var _this;
export default {
  name: "maintain",
  data() {
    return {
      fileName:"无",
      exhFlag:true,
      fileExh:"",
      src1: require("../assets/tu_img02.png"),
      playImg: require("../assets/playImg.jpg"),
      productLine: {},
      bool: false,
      bool1: false , //判断 Android
    };
  },
  created() {
    _this = this;
    //设备号  翻译
    var u = navigator.userAgent;
    this.bool1 = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    this.$Axios
      .post(
        baseUrl +
          "/repairSkillGuidance/queryGuidanceById?id=" +
          this.$route.query.nid
      )
      .then(function(response) {
        //重复点击
        if (response.data == "loginTimeout") {
          _this
            .$confirm("登录超时，请重新登录", "提示", {
              confirmButtonText: "确定",
              showCancelButton: false,
              type: "warning"
            })
            .then(() => {
              Cookie.clearCookie();
              _this.$router.replace({
                path: "/"
              });
            });

          return;
        }
        // _this.is_ajax = false;
        if (response.data.code == 200) {
          if (response.data.data.fileName != "") {
            _this.fileName=response.data.data.fileName
             _this.bool = response.data.data.isDown == '1' ? true : false;
            response.data.data.file = baseUrl + response.data.data.file;
          } else {
            _this.exhFlag = false;
            _this.bool = false;
          }
          if (response.data.data.picture != "") {
            response.data.data.picture =
              baseUrl + response.data.data.picture.split(",")[0];
          }
          _this.productLine = response.data.data;
          let a = _this.productLine.file.substring(_this.productLine.file.lastIndexOf("."))
          if(a==".zip"){
             _this.exhFlag = false
          }
          else{
             _this.fileExh = "http://view.xdocin.com/xdoc?_xdoc="+ _this.productLine.file
          }
        }
      })
      .catch(function(error) {});
  },
  mounted() {
    if (this.$route.query.video != "") {
      document.getElementById("srcImg").src = baseUrl + this.$route.query.video;
    }
     function copyArticle() {
      const range = document.createRange();
      range.selectNode(document.getElementById("copyBT"));
      const selection = window.getSelection();
      if (selection.rangeCount > 0) selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      _this.$message({
          message: '复制成功',
          type: 'success',
          duration:700
        });
    }
    document
      .getElementById("contentas")
      .addEventListener("click", copyArticle, false);
  },
  methods: {
    toback() {
      this.$router.replace({
        path: "/guide"
      });
    },
    tosend() {
      var datelist = {};
      if (Cookie.getCookie("avatar") == 0) {
        datelist = {
          customerId: this.$store.state.letter.user.user_id,
          customerName: this.$store.state.letter.user.name,
          phone: this.$store.state.letter.user.phone,
          serviceId: 80,
          serviceTel: "谊安售后",
          productId: this.$route.query.nid,
          consultingType: 1
        };
      }
      // return;
      this.$Axios
        .post(baseUrl + "/customerService/queryContentList", datelist)
        .then(function(response) {
          // return;
          if (response.data == "loginTimeout") {
            _this
              .$confirm("登录超时，请重新登录", "提示", {
                confirmButtonText: "确定",
                showCancelButton: false,
                type: "warning"
              })
              .then(() => {
                Cookie.clearCookie();
                _this.$router.replace({
                  path: "/"
                });
              });

            return;
          }
          if (response.data.code == 200) {
            // _this.userlist = response.data.data;
            _this.$router.push({
              path: "/OnlineChat",
              query: {
                nid: _this.$route.query.nid,
                tianjiaid: response.data.data.needId
              }
            });
          }
        })
        .catch(function(error) {});
    },
    baocuo() {
      window.location.reload();
    }
  }
};
</script>
<style>
.video-js .vjs-play-control:focus {
  outline: none;
}
</style>

<style scoped>
.radio {
  width: 7.5rem;
  height: 4rem;
  position: relative;
}
.radio img {
  width: 7.5rem;
  height: 4rem;
}
.radio .btn {
  position: absolute;
  top: 1.2rem;
  left: 2.9rem;
  width: 1.4rem;
  height: 1.4rem;
  background: url("../assets/play.png") no-repeat;
  background-size: 100% 100%;
}

.main {
  background: #fff;
  padding: 0.28rem;
  margin: 0.4rem 0.35rem;
}
.main h3 {
  height: 0.32rem;
  line-height: 0.32rem;
  height: 0.32rem;
  font-size: 0.32rem;
  text-align: center;
  color: #000;
  margin: 0.1rem 0 0.4rem;
  word-break: break-all;
}
.main i {
  display: block;
  height: 0.28rem;
  line-height: 0.28rem;
  height: 0.28rem;
  font-size: 0.28rem;
  text-align: right;
  color: #919191;
  margin-bottom: 0.28rem;
  vertical-align: top;
  word-break: break-all;
}
.main p {
  font-size: 0.28rem;
  color: #919191;
  line-height: 0.5rem;
  text-indent: 2em;
  margin-bottom: 0.3rem;
}

.main img {
  width: 6.2rem;
  height: auto;
  margin-bottom: 0.3rem;
}
.main a {
  margin-bottom: 0.3rem;
  font-size: 0.28rem;
  color: #998bd6;
  text-decoration: none;
  display: inline-block;
  line-height: 0.3rem;
}

.radio {
  width: 7.5rem;
  height: 4rem;
}

.dw {
  margin: 0.5rem 0.35rem;
}

.divlist {
  font-size: 0.28rem;
  color: #919191;
  line-height: 0.5rem;
  text-indent: 2em;
  margin-bottom: 0.3rem;
}
.divlist >>> p {
  font-size: 0.28rem;
  color: #919191;
  line-height: 0.5rem;
  text-indent: 2em;
  margin-bottom: 0.3rem;
  word-break: break-all;
}
.divlist >>> p img {
  width: 100%;
}
.divlist >>> ol li {
  font-size: 0.28rem;
  color: #919191;
  line-height: 0.5rem;
  text-indent: 2em;
  margin-bottom: 0.3rem;
  word-break: break-all;
}

.wenjian a i {
  display: inline-block;
  vertical-align: top;
  font-size: 0.28rem;
  color: #919191;
  line-height: 0.5rem;
  height: 0.5rem;
  word-break: break-all;
}
.down i {
  text-align: left;
  text-indent: 2em;
  word-break: break-all;
}
</style>

