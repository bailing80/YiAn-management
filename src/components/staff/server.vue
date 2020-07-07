<template>
  <div class="box xiongmao17">
    <div class="header">
      <i class="icon" @click="tobackhome"></i>
      <p class="title">员工服务</p>
    </div>
    <ul class="select">
      <li @click="tocustomer">
        <i class="icon_user"></i>
        <p>客户管理</p>
        <u></u>
      </li>
      <li @click="torepairorder">
        <i class="icon_repair"></i>
        <p>提报工单</p>
        <u></u>
      </li>
      <li @click="toorderlist">
        <mt-badge type="error" size="small" v-show="porlist!=0">{{porlist}}</mt-badge>
        <i class="icon_fadajing"></i>
        <p>工单列表</p>
        <u></u>
      </li>
    </ul>
    <ul class="select mtop rb">
      <li @click="tolead">
        <i class="icon_repair"></i>
        <p>维修指导</p>
        <u></u>
      </li>
      <!-- <li @click="tomaintain"><i class="icon_book"></i><p>维修知识</p><u></u></li> -->
    </ul>
    <div class="sendbtn dw" @click="toback">退出登录</div>
  </div>
</template>

<script>
import Cookie from "../../api/cookie.js";
import baseUrl from "../../api/baseUrl.js";
import { win32 } from "path";
var _this;
export default {
  data(){
    return {
      porlist:"",
    }
  },
  created() {
    _this = this;

    //进度未读  数据
    this.$Axios
      .post(baseUrl + "/applyJob/queryStaffIdRepairReadCount", {
        staffId: this.$store.state.repairorder.repairorderId
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
           //   Cookie.clearCookie();
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
      function() {
        let adrrs = window.location.href;
        let num = adrrs.indexOf("#") + 1;
        let num1 = adrrs.indexOf("?");
        let attribute = adrrs.slice(num, num1);
        if (attribute == "/repairorder") {
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
                   // Cookie.clearCookie();

                    window.localStorage.removeItem("setApplicationType");
                    window.localStorage.removeItem("isStaffScan");
                    window.localStorage.removeItem("staffClassList");
                    window.localStorage.removeItem("ClassList");
                    window.localStorage.removeItem("isScan");
                    window.localStorage.removeItem("CodeTime");

                    WeixinJSBridge.call("closeWindow");

                    _this.$router.replace({
                      path: "/",
                      query: {
                       letuserName:Cookie.getCookie("userName"),
                       letpassword:Cookie.getCookie("password")
                
                }
                    });
                  }
                }
              })
              .catch(function() {});
          })
          .catch(() => {});
      } else {
       // Cookie.clearCookie();

        window.localStorage.removeItem("setApplicationType");
        window.localStorage.removeItem("isStaffScan");
        window.localStorage.removeItem("staffClassList");
        window.localStorage.removeItem("ClassList");
        window.localStorage.removeItem("isScan");
        window.localStorage.removeItem("CodeTime");
        _this.$router.replace({
          path: "/"
        });
      }
    },
    //客户管理
    tocustomer() {
      this.$router.push({
        path: "/customer"
      });
    },
    //进入产品报修
    torepairorder() {
      this.$router.push({
        path: "/repairorder"
      });
    },
    //工单列表
    toorderlist() {
      this.$router.push({
        path: "/orderlist"
      });
    },
    //工单列表
    tomaintain() {
      this.$router.push({
        path: "/maintain"
      });
    },
    tolead() {
      this.$router.push({
        path: "/lead"
      });
    }
  }
};
</script>
<style>
.xiongmao17 .el-message-box {
  width: 5rem;
}

.xiongmao17 .mint-badge.is-size-small {
  border-radius: 0.25rem;
  line-height: 0.48rem;
  height: 0.48rem;
  font-size: 0.28rem;
  float: right;
  margin: 0.28rem 0.6rem;
}

.xiongmao17 .el-message {
  min-width: 4.6rem;
}
.xiongmao17 .el-message-box__btns {
  border-top: 1px solid #ccc;
}

.xiongmao17 .el-button--mini,
.xiongmao17 .el-button--small {
  width: 2.3rem !important;
  background: #fff !important;
  color: #9889da !important;
  border-color: #fff !important;
}
.xiongmao17 .el-button--mini,
.xiongmao17 .el-button--small:focus {
  outline: 0;
}
</style>


<style scoped lang="less">
.select {
  width: 7.5rem;
  height: auto;
  // border-top: 0.01rem #eaeaea solid;
  // border-bottom: 0.01rem #eaeaea solid;
  background: #fff;
  li {
    height: 1.16rem;
    width: 6.54rem;
    margin-left: 0.96rem;
    position: relative;
    border-bottom: 0.01rem #eaeaea solid;
    font-size: 0.34rem;
    line-height: 1.16rem;
    i {
      display: block;
      position: absolute;
      top: 0.4rem;
      left: -0.63rem;
    }
    .icon_user {
      width: 0.38rem;
      height: 0.51rem;
      background: url("../../assets/user.png") no-repeat;
      background-size: 100% 100%;
      top: 0.34rem;
    }
    .icon_repair {
      width: 0.28rem;
      height: 0.37rem;
      background: url("../../assets/staff_icon02.png") no-repeat;
      background-size: 100% 100%;
    }

    .icon_fadajing {
      width: 0.28rem;
      height: 0.37rem;
      background: url("../../assets/staff_icon03.png") no-repeat;
      background-size: 100% 100%;
    }

    .icon_book {
      width: 0.3rem;
      height: 0.32rem;
      background: url("../../assets/staff_icon04.png") no-repeat;
      background-size: 100% 100%;
    }

    .icon_shopping {
      width: 0.4rem;
      height: 0.37rem;
      background: url("../../assets/shopping.png") no-repeat;
      background-size: 100% 100%;
    }

    .icon_pen {
      width: 0.4rem;
      height: 0.39rem;
      background: url("../../assets/pen.png") no-repeat;
      background-size: 100% 100%;
    }

    u {
      display: block;
      height: 0.28rem;
      width: 0.17rem;
      background: url("../../assets/arrow_r.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: 0.45rem;
      right: 0.35rem;
    }
  }

  .rb {
    border-bottom: none;
  }

  .mtop {
    margin: 0.16rem 0;
    border-bottom: 0.01rem #eaeaea solid;
  }
}

.dw {
  margin: 0.6rem auto;
}
</style>