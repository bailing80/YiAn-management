<template>
  <div class="box xiong001">
    <div class="header">
      <i class="icon" @click="tobackhome"></i>
      <p class="title">{{title}}</p>
    </div>
    <ul class="select">
      <li @click="toUserDetail">
        <i class="icon_user"></i>
        <p>{{titledetail}}</p>
        <u></u>
      </li>
      <li @click="toProRepair">
        <i class="icon_repair"></i>
        <p>产品报修</p>
        <u></u>
      </li>
      <li @click="toProgress">
        <mt-badge type="error" size="small" v-show="porlist!=0">{{porlist}}</mt-badge>
        <i class="icon_fadajing"></i>
        <p>进度查询</p>
        <u></u>
      </li>
      <li @click="toproductclass">
        <i class="icon_book"></i>
        <p>产品信息</p>
        <u></u>
      </li>
      
      <!-- <li @click="toguide" v-show="bool">
        <i class="icon_repair"></i>
        <p>维修指导</p>
        <u></u>
      </li> -->
      <li @click="topurchase">
        <i class="icon_shopping"></i>
        <p>配件咨询</p>
        <u></u>
      </li>
      <li class="rb" @click="toopinio">
        <i class="icon_pen"></i>
        <p>产品意见反馈</p>
        <u></u>
      </li>
    </ul>
    <div class="sendbtn dw" @click="toback">退出登录</div>
  </div>
</template>

<script>
//mint 提示框
import Cookie from "../api/cookie.js";
import { Toast, MessageBox } from "mint-ui";

import baseUrl from "../api/baseUrl.js";
var _this;
export default {
  name: "wechatserve",
  data() {
    return {
      bool: "",
      title: "",
      titledetail: "",
      porlist: 0
    };
  },
  created() {
    _this = this;
    if (Cookie.getCookie("avatar") == "0") {
      this.title = "客户服务";
      this.titledetail = "客户信息";
      this.bool = true;
    } else if (Cookie.getCookie("avatar") == "1") {
      this.title = "渠道服务";
      this.titledetail = "渠道信息";
    } else if (Cookie.getCookie("avatar") == "3") {
      this.title = "家庭服务";
      this.titledetail = "个人信息";
      this.bool = false;
    }

    //进度未读  数据
    this.$Axios
      .post(baseUrl + "/applyJob/queryRepairReadCount", {
        userId: this.$store.state.letter.user.user_id
      })
      .then(function(response) {
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
        //重复点击
        if (response.data.code == 200) {
          _this.porlist = response.data.data;
        }
      })
      .catch(function(error) {
        Toast({
          message: "网络开小差，请稍后重试",
          duration: 1000
        });
      });

    window.addEventListener(
      "popstate",
      function(e) {
        let adrrs = window.location.href;
        let num = adrrs.indexOf("#") + 1;
        let num1 = adrrs.indexOf("?");
        let attribute = adrrs.slice(num, num1);
        if (attribute == "/custser") {
          WeixinJSBridge.call("closeWindow");
        }
      },
      false
    );
  },
  methods: {
    tobackhome() {
      WeixinJSBridge.call("closeWindow");
    },
    toback() {
      if (Cookie.getCookie("token")) {
        _this
          .$confirm("您确定要退出登录吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            _this.$Axios
              .post(baseUrl + "/admin/logout")
              .then(function(response) {
                //重复点击
                if (response.data.code == 200) {
                  if (response.data.msg == "退出成功") {
                    Cookie.clearCookie();
                    window.localStorage.removeItem("ClassList");
                    window.localStorage.removeItem("isScan");
                    window.localStorage.removeItem("CodeTime");
                    WeixinJSBridge.call("closeWindow");
                    _this.$router.replace({
                      path: "/"
                    });
                  }
                }
              })
              .catch(function(error) {});
          })
          .catch(() => {});
      } else {
        Cookie.clearCookie();
        window.localStorage.removeItem("ClassList");
        window.localStorage.removeItem("isScan");
        window.localStorage.removeItem("CodeTime");
        _this.$router.push({
          path: "/"
        });
      }
    },
    //进入个人信息
    toUserDetail() {
      if (Cookie.getCookie("avatar") == "0") {
        let name = Cookie.getCookie("hospitalName");
        this.$router.push({
          path: "/userupdate",
          query: { name: name }
        });
      } else if (Cookie.getCookie("avatar") == "1") {
        let name = Cookie.getCookie("channelName");
        this.$router.push({
          path: "/registerupdate",
          query: { name: name }
        });
      } else if (Cookie.getCookie("avatar") == "3") {
        this.$router.push({
          path: "/familyupdate"
        });
      }
    },
    //进入产品报修
    toProRepair() {
      if (Cookie.getCookie("avatar") == "0") {
        this.$router.push({
          path: "/prorepair"
        });
      } else if (Cookie.getCookie("avatar") == "1") {
        this.$router.push({
          path: "/repairorder"
        });
      } else if (Cookie.getCookie("avatar") == "3") {
        this.$router.push({
          path: "/repairorder"
        });
      }
    },
    toProgress() {
      this.$router.push({
        path: "/progress"
      });
    },
    //进入产品信息
    toproductclass() {
      if (Cookie.getCookie("avatar") == "0") {
        this.$router.push({
          path: "/productclass"
        });
      } else if (Cookie.getCookie("avatar") == "1") {
        // Toast("你还没有购买产品 ~");
        this.$router.push({
          path: "/productclass"
        });
      } else if (Cookie.getCookie("avatar") == "3") {
        this.$router.push({
          path: "/productclass"
        });
      }
    },
    //配件购买
    topurchase() {
      this.$router.push({
        path: "/purchase"
      });
    },
    toopinio() {
      this.$router.push({
        path: "/opinio"
      });
    },
    //客户维修引导
    toguide() {
      this.$router.push({
        path: "/guide"
      });
    }
  }
};
</script>

<style>
.xiong001 .mint-badge.is-size-small {
  border-radius: 0.25rem;
  line-height: 0.48rem;
  height: 0.48rem;
  font-size: 0.28rem;
  float: right;
  margin: 0.28rem 0.6rem;
}

.xiong001 .el-message-box {
  width: 5rem;
}

.xiong001 .el-message {
  min-width: 4.6rem;
}
.xiong001 .el-message-box__btns {
  border-top: 1px solid #ccc;
}

.xiong001 .el-button--mini,
.xiong001 .el-button--small {
  width: 2.3rem !important;
  background: #fff !important;
  color: #9889da !important;
  border-color: #fff !important;
  line-height: 0.48rem !important;
}
.xiong001 .el-button--mini,
.xiong001 .el-button--small:focus {
  outline: 0;
}
</style>

<style scoped>
.select {
  width: 7.5rem;
  height: auto;
  border-top: 0.01rem #eaeaea solid;
  background: #fff;
}
.select li {
  height: 1.16rem;
  width: 6.54rem;
  margin-left: 0.96rem;
  position: relative;
  border-bottom: 0.01rem #eaeaea solid;
  font-size: 0.34rem;
  line-height: 1.16rem;
}

.select li i {
  display: block;

  position: absolute;
  top: 0.4rem;
  left: -0.63rem;
}
.select li .icon_user {
  width: 0.38rem;
  height: 0.51rem;
  background: url("../assets/user.png") no-repeat;
  background-size: 100% 100%;
  top: 0.32rem;
}
.select li .icon_repair {
  width: 0.37rem;
  height: 0.37rem;
  background: url("../assets/repair.png") no-repeat;
  background-size: 100% 100%;
}
.select li .icon_fadajing {
  width: 0.33rem;
  height: 0.37rem;
  background: url("../assets/fadajing.png") no-repeat;
  background-size: 100% 100%;
}

.select li .icon_book {
  width: 0.33rem;
  height: 0.37rem;
  background: url("../assets/book.png") no-repeat;
  background-size: 100% 100%;
}

.select li .icon_shopping {
  width: 0.4rem;
  height: 0.37rem;
  background: url("../assets/shopping.png") no-repeat;
  background-size: 100% 100%;
}
.select li .icon_pen {
  width: 0.4rem;
  height: 0.39rem;
  background: url("../assets/pen.png") no-repeat;
  background-size: 100% 100%;
}

.select li u {
  display: block;
  height: 0.28rem;
  width: 0.17rem;
  background: url("../assets/arrow_r.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0.45rem;
  right: 0.35rem;
}
.select .rb {
  border-bottom: none;
}
.mtop {
  margin: 0.16rem 0;
}

.dw {
  margin: 0.6rem auto;
}
</style>