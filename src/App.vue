<template>
  <div id="app" v-cloak>
    <router-view></router-view>
  </div>
</template>

<script>
import Cookie from "./api/cookie.js";

var _this;
export default {
  name: "app",
  data() {
    return {};
  },
  created() {
    _this = this;
    (function(doc, win) {
      var docEl = doc.documentElement,
        resizeEvt =
          "orientationchange" in window ? "orientationchange" : "resize",
        recalc = function() {
          var clientWidth = docEl.clientWidth;
          if(clientWidth > 1024 ){
            clientWidth = 375
          }
          if (!clientWidth) return;
          docEl.style.fontSize = 100 * (clientWidth / 750) + "px";
        };
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      recalc();
    })(document, window);
    // this.$nextTick(() => {
    //    this._renderPage(1)
    //  })

    //首先要转化为字符串。利用JSON.stringify()；
    //然后person的对象你可以用JSON.parse();
   
  },
  mounted() {
    if (
      Cookie.getCookie("userId") != null &&
      Cookie.getCookie("userId") !== ""
    ) {
      if (Cookie.getCookie("avatar") == 0) {
        _this.$store.commit("Qeruyhospital", {
          position_id: Cookie.getCookie("position_id"),
          department_id: Cookie.getCookie("department_id"),
          type1: "POSITION",
          type2: "DEPARTMENT"
        });
      } else if (Cookie.getCookie("avatar") == 1) {
        //渠道的
        _this.$store.commit("Qeruyregister", {
          channelLevel_id: Cookie.getCookie("channelLevel_id"),
          position_id: Cookie.getCookie("position_id"),
          type1: "CHANNEL_LEVEL",
          type2: "CHANNEL_POSITION"
        });
      } else if (Cookie.getCookie("avatar") == 3) {
        _this.$store.commit("Qeruyfamily", {
          productLine_id: Cookie.getCookie("productLine_id"),
          model_id: Cookie.getCookie("model_id"),
          type1: "PRODUCT_LINE",
          type2: "EQUI_MODEL",
          name: "model"
        });
      }
      //其他数据
      this.$store.commit("getCookieUser");
    } else if (Cookie.getCookie("phone") != "") {
      this.$store.state.letter.user.phone = Cookie.getCookie("phone");
    }

    if (
      Cookie.getCookie("repairorderId") != null &&
      Cookie.getCookie("repairorderId") !== ""
    ) {
      this.$store.commit("getemployees");
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  -webkit-overflow-scrolling: touch;
}

a,
img,
button,
input,
textarea {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-appearance: none;
  border: none;
  vertical-align: top;
}
i {
  font-style: normal;
}

u {
  text-decoration: none;
}

input[type="radio"] {
  -webkit-appearance: radio;
  box-sizing: border-box;
}

input:focus,
textarea:focus {
  outline: none;
}

img {
  display: block;
  margin: 0 auto;
}
ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

html,
body {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
.clear:after {
  display: block;
  visibility: hidden;
  clear: both;
  height: 0;
  overflow: hidden;
  content: ".";
}

#app {
  width: 7.5rem;
  height: auto;
  background: #f2f2f2;
}

/* 提交  保存  按钮 */
.sendbtn {
  display: block;
  width: 6.8rem;
  height: 0.84rem;
  background: url("./assets/btn.png") no-repeat;
  background-size: 100% 100%;
  border-radius: 0.07rem;
  letter-spacing: 0.04rem;
  font-size: 0.33rem;
  color: #fff;
  text-align: center;
  line-height: 0.84rem;
  margin-left: 0.35rem;
}
/* 提交  保存  按钮 */

/* 头部样式 */
.header {
  height: 1rem;
  width: 7.5rem;
  background: url("./assets/login/header.jpg") no-repeat;
  background-size: 100% 100%;
}
.header .icon {
  position: absolute;
  top: 0;
  left: 0rem;
  height: 1rem;
  width: 1rem;
  background: url("./assets/arrow_l.png") no-repeat center;
  background-size: 0.17rem 0.28rem;
}
.header .title {
  font-size: 0.3rem;
  color: #fff;
  width: 7.5rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  letter-spacing: 0.02rem;
}
.el-message-box {
  height: 2.8rem !important;
  position: absolute;
  top: 34%;
  left: 20%;
  width: 4.6rem !important;
}
.el-message-box__status.el-icon-warning {
  display: none;
}
.el-message-box__header {
  display: none;
}

.el-message-box__btns {
  padding: 0 !important ;
  height: 0.86rem;
  width: 4.8rem;
  position: absolute;
  bottom: 0;
  left: 0;
  text-align: left !important;
  border-top: 1px solid #ccc;
}
.el-message-box__header {
  display: none;
}

.el-button--small,
.el-button--small.is-round {
  background: #f1f0f0;
  color: #666666;
  font-size: 0.28rem;
  line-height: 0.86rem;
  height: 0.86rem;
  width: 50%;
  display: inline-block;
  vertical-align: top;
  text-align: center;
}
.el-message-box__message p {
  background: url("./assets/tanhao.png") no-repeat;
  background-size: 0.57rem 0.57rem;
  padding-top: 1rem;
  background-position: 1.5rem 0.2rem;
  width: 4rem;
  margin-left: -0.5rem !important;
  text-align: center;
}
.el-message-box__btns button:nth-child(2) {
  margin-left: 0 !important;
  background: #f1f0f0;
  color: #666666;
  font-size: 0.28rem;
  line-height: 0.86rem;
  height: 0.86rem;
  width: 50%;
  line-height: 0.46rem !important;
  display: inline-block;
  vertical-align: top;
  text-align: center;
}

.el-button--small,
.el-button--small.is-round {
  background: #fff !important;
  color: #9889da !important;
  border-color: #fff !important;
}
.el-button--mini,
.el-button--small {
  line-height: 0.48rem !important;
}

.el-button {
  width: 2.4rem;
}

/* 头部样式 */

[v-cloak] {
  display: none !important;
}
</style>
