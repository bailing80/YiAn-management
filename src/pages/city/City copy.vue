<template>
  <div>
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">{{title}}</p>
    </div>
    <div class="main">
      <div class="grabble">
        <input type="text" placeholder="请输入客户名称或序列号" v-model="context" />
        <i @click="search">
          <u></u>
        </i>
        <span @click="city">切换城市</span>
      </div>
      <div class="region">
        <p>热门城市</p>
        <ul class="regionlist">
          <li
            v-for="(tuijians,tj_index) in regionlist"
            :key="tj_index"
            @click="saixuan(tuijians)"
          >{{tuijians.title}}</li>
        </ul>
      </div>
    </div>
    <div id="city">
      <div class="boxmain">
        <ul
          class="boxlis"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
        >
          <li
            :class="{ac:indexnum%2==0}"
            @click="handleCityClick(citiesname)"
            v-for="(citiesname,indexnum) in cities"
            :key="indexnum"
          >{{citiesname.customerName}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, MessageBox, Indicator } from "mint-ui";
import Cookie from "../../api/cookie.js";
import baseUrl from "../../api/baseUrl.js"; //请求ip地址

var _this;
export default {
  data() {
    return {
      showWord: false,
      login: "登录",
      title: "选择客户",
      cities: [],
      hotCities: [],
      letter: "",

      context: "",

      iscontext: false,
      issearch: false,
      regionShow: true,

      conit: "",
      page: 1,
      rows: 10,
      total: 0, //总页数
      boolershow: false,
      regionlist: [
        { name: "A", title: "北京", val: "110100" },
        { name: "B", title: "上海", val: "310100" },
        { name: "C", title: "广州", val: "440100" },
        { name: "D", title: "深圳", val: "440300" },
        { name: "E", title: "成都", val: "510100" },
        { name: "F", title: "武汉", val: "420100" },
        { name: "G", title: "南京", val: "320100" },
        { name: "H", title: "长沙", val: "430100" }
      ]
    };
  },
  watch: {
    // context() {
    //   if (this.iscontext) {
    //     Toast({
    //       message: "数据加载中",
    //       duration: 1000
    //     });
    //     return;
    //   }
    //   if (this.context == "") {
    //     var userType = 0;
    //     if (Cookie.getCookie("avatar") == 1) {
    //       if (Cookie.getCookie("Isregistered") != 4) {
    //         this.title = "选择渠道";
    //         userType = "1";
    //       }
    //     }

    //     this.iscontext = true;
    //     //医院查询
    //     this.$Axios
    //       .post(baseUrl + "/customerAdmin/queryCustomerList", {
    //         userType: userType
    //       })
    //       .then(function(response) {
    //         //重复点击
    //         _this.iscontext = false;
    //         if (response.data.code == 200) {
    //           _this.cities = response.data.data;
    //         }
    //         if (response.data.code == -100) {
    //           Toast({
    //             message: "数据搜索失败",
    //             duration: 1000
    //           });
    //         }
    //       })
    //       .catch(function(error) {
    //         _this.iscontext = false;
    //         Toast({
    //           message: "网络开小差，请稍后重试",
    //           duration: 1000
    //         });
    //       });
    //   } else {
    //     this.search();
    //   }
    // },

    conit() {
      var userType = 0;

      if (Cookie.getCookie("avatar") == 1) {
        if (Cookie.getCookie("Isregistered") != 4) {
          this.title = "选择渠道";
          userType = "1";
        }
      }
      //医院查询  // .post(baseUrl + "/customerAdmin/queryCustomerList", {
      this.$Axios
        .post(baseUrl + "/customerAdmin/queryCustomerListForHisp", {
          userType: userType,
          city: this.conit
        })
        .then(function(response) {
          //重复点击
          _this.cities = [];
          if (response.data.code == 200) {
            _this.cities = response.data.data;
          }
        })
        .catch(function(error) {
          Toast({
            message: "网络开小差，请稍后重试",
            duration: 1000
          });
        });
    }
  },
  created() {
    _this = this;
    var userType = 0;
    if (Cookie.getCookie("avatar") == 1) {
      if (Cookie.getCookie("Isregistered") != 4) {
        this.title = "选择渠道";
        userType = "1";
      }
    }
    if (this.$route.params.conti != "") {
      this.conit = this.$route.params.conti;
    }
    this.isyiyuan(userType);
  },

  methods: {
    loadMore() {
      if (this.boolershow) {
        if (Math.ceil(this.total / this.rows) > this.page) {
          this.page = this.page + 1;
        } else {
          Toast({
            message: "数据已经加载完毕",
            duration: 1000
          });
          this.boolershow = false;
          return;
        }

        Indicator.open({
          text: "加载中，请稍后",
          spinnerType: "fading-circle"
        });

        var userType = 0;
        if (Cookie.getCookie("avatar") == 1) {
          if (Cookie.getCookie("Isregistered") != 4) {
            this.title = "选择渠道";
            userType = "1";
          }
        }
        //医院查询
        this.$Axios
          .post(baseUrl + "/customerAdmin/queryCustomerListForHisp", {
            userType: userType,
            page: this.page
          })
          .then(function(response) {
            //重复点击
            Indicator.close();
            if (response.data.code == 200) {
              for (let i = 0; i <= response.data.data.data.length - 1; i++) {
                _this.cities.push(response.data.data.data[i]);
              }
            }
          })
          .catch(function(error) {
            Indicator.close();
            Toast({
              message: "网络开小差，请稍后重试",
              duration: 1000
            });
          });
      }
    },

    handleCityClick(city) {
      if (Cookie.getCookie("avatar") == "0") {
        //医院提报工单  医院信息
        if (Cookie.getCookie("Isregistered") == 0) {
          this.$store.commit("sethistoryName", city);
          this.$router.push({
            path: "/userdetails"
          });
        } else if (Cookie.getCookie("Isregistered") == 1) {
          this.$store.commit("sethistoryName", city);
          this.$router.push({
            path: "/userupdate"
          });
        }
      } else if (Cookie.getCookie("avatar") == "1") {
        //渠道提报工单  医院信息
        if (Cookie.getCookie("Isregistered") == 2) {
          this.$store.commit("setchannelName", city);
          this.$router.push({
            path: "/registerlogin"
          });
        } else if (Cookie.getCookie("Isregistered") == 3) {
          this.$store.commit("setchannelName", city);
          this.$router.push({
            path: "/registerupdate"
          });
          //提报工单 数据
        } else if (Cookie.getCookie("Isregistered") == 4) {
          this.$store.commit("repairorderName", city);
          this.$router.push({
            path: "/repairorder"
          });
        }
      } else if (Cookie.getCookie("avatar") == "2") {
        //员工提报工单  医院信息
        this.$store.commit("repairorderName", city);
        this.$router.push({
          path: "/repairorder"
        });
      } else if (Cookie.getCookie("avatar") == "3") {
        //员工提报工单  医院信息
        this.$store.commit("repairorderName", city);
        this.$router.push({
          path: "/repairorder"
        });
      }
    },

    isyiyuan(userType) {
      Indicator.open({
        text: "加载中，请稍后",
        spinnerType: "fading-circle"
      });
      //医院查询
      this.$Axios
        .post(baseUrl + "/customerAdmin/queryCustomerListForHisp", {
          userType: userType
        })
        .then(function(response) {
          //重复点击
          Indicator.close();
          if (response.data.code == 200) {
            _this.total = response.data.data.total;
            _this.cities = response.data.data.data;
            _this.boolershow = true;
          }
        })
        .catch(function(error) {
          Indicator.close();
          Toast({
            message: "网络开小差，请稍后重试",
            duration: 1000
          });
        });
    },
    //返回上一级
    toback() {
      if (Cookie.getCookie("avatar") == "0") {
        //医院注册信息
        if (Cookie.getCookie("Isregistered") == 0) {
          this.$router.replace({
            path: "/userdetails"
          });
        } else if (Cookie.getCookie("Isregistered") == 1) {
          this.$router.replace({
            path: "/userupdate"
          });
        }
      } else if (Cookie.getCookie("avatar") == "1") {
        //渠道注册信息
        if (Cookie.getCookie("Isregistered") == 2) {
          this.$router.replace({
            path: "/registerlogin"
          });
        } else if (Cookie.getCookie("Isregistered") == 3) {
          this.$router.replace({
            path: "/registerupdate"
          });
          //报修  进入的 客户选择    Isregistered == 4
        } else if (Cookie.getCookie("Isregistered") == 4) {
          this.$router.replace({
            path: "/repairorder"
          });
        }
      } else if (Cookie.getCookie("avatar") == "2") {
        this.$router.replace({
          path: "/repairorder"
        });
      } else if (Cookie.getCookie("avatar") == "3") {
        this.$router.replace({
          path: "/repairorder"
        });
      }
    },
    city() {
      this.$router.replace({
        path: "/city"
      });
    },

    //筛选
    saixuan(data) {
      var userType = 0;
      if (Cookie.getCookie("avatar") == 0) {
        this.title = "选择医院";
        userType = "0";
      } else if (Cookie.getCookie("avatar") == 1) {
        this.title = "选择渠道";
        userType = "1";
      } else if (Cookie.getCookie("avatar") == 2) {
        this.title = "选择客户";
        userType = "0";
      }
      Indicator.open({
        text: "加载中，请稍后",
        spinnerType: "fading-circle"
      });
      //医院查询
      this.$Axios
        .post(baseUrl + "/customerAdmin/queryCustomerList", {
          userType: userType,
          city: data.val
        })
        .then(function(response) {
          //重复点击
          Indicator.close();
          if (response.data.code == 200) {
            _this.cities = response.data.data;
          }
        })
        .catch(function(error) {
          Indicator.close();
          Toast({
            message: "网络开小差，请稍后重试",
            duration: 1000
          });
          // _this.is_ajax = false;
        });
    },

    //搜索客户
    search() {
      if (this.issearch) {
        // Toast({
        //   message: "查询中，请稍后",
        //   duration: 1000
        // });
        return;
      }

      var userType = 0;
      if (Cookie.getCookie("avatar") == 0) {
        this.title = "选择医院";
        userType = "0";
      } else if (Cookie.getCookie("avatar") == 1) {
        this.title = "选择渠道";
        userType = "1";
      } else if (Cookie.getCookie("avatar") == 2) {
        this.title = "选择客户";
        userType = "0";
      }

      if (this.context == "") {
        // Toast({
        //   message: "搜索名称不能为空",
        //   duration: 1000
        // });
        return;
      }
      Indicator.open({
        text: "加载中，请稍后",
        spinnerType: "fading-circle"
      });

      this.issearch = true;
      //医院查询
      this.$Axios
        .post(baseUrl + "/customerAdmin/queryCustomerList", {
          userType: userType,
          customerName: this.context
        })
        .then(function(response) {
          //重复点击
          _this.issearch = false;
          Indicator.close();
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
            _this.cities = response.data.data;
          }
          if (response.data.code == -100) {
            Toast({
              message: "数据搜索失败",
              duration: 1000
            });
          }
        })
        .catch(function(error) {
          Indicator.close();
          _this.issearch = false;
          Toast({
            message: "网络开小差，请稍后重试",
            duration: 1000
          });
        });
    },

    handleLetterChange(letter) {
      this.letter = letter;
      this.showWord = true;
      setTimeout(() => {
        this.showWord = false;
      }, 500);
    }
  }
};
</script>

<style scoped>
#city {
  position: fixed;
  top: 5.16rem;
  width: 7.5rem;
  overflow: scroll;
  height: calc(100% - 5.1rem);
}
.boxlis li {
  width: 7rem;
  background: #fff;
  height: 1rem;
  padding-left: 0.5rem;
  line-height: 1rem;
  font-size: 0.35rem;
  color: #000;
}

.boxlis .ac {
  background: #f2f3f7;
}

.word {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}
.word span {
  display: inline-block;
  height: 60px;
  width: 60px;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.main {
  position: fixed;
  top: 1rem;
  left: 0.2rem;
}

.grabble {
  width: 100%;
  margin: 0.16rem 0;
  height: 0.96rem;
}
.grabble input {
  width: 4.45rem;
  height: 0.96rem;
  border: 0.01rem #b8b8ba solid;
  line-height: 0.96rem;
  font-size: 0.25rem;
  padding-left: 0.25rem;
  float: left;
}
.grabble i {
  display: block;
  float: left;
  width: 0.83rem;
  height: 0.98rem;
  line-height: 0.96rem;
  background: #919191;
  position: relative;
}
.grabble i u {
  display: block;
  width: 0.33rem;
  height: 0.37rem;
  position: absolute;
  top: 0.34rem;
  left: 0.26rem;
  background: url("../../assets/b_fadajing.png") no-repeat;
  background-size: 100% 100%;
}
.grabble span {
  color: #592d8d;
  font-size: 0.26rem;
  line-height: 0.96rem;
  height: 0.96rem;
  float: left;
  margin-left: 0.16rem;
}

.region {
  position: relative;
  width: 6.11rem;
  height: 1.8rem;
  background: #fff;
  padding: 0.69rem 0.34rem 0.4rem 0.34rem;
}
.region p {
  position: absolute;
  top: 0.28rem;
  left: 0.27rem;
  font-size: 0.25rem;
  color: #919191;
}
.region .regionlist li {
  width: 1.23rem;
  height: 0.62rem;
  line-height: 0.62rem;
  text-align: center;
  margin: 0.14rem;
  float: left;
  background: #dcdcdc;
  font-size: 0.25rem;
}

.ac {
  background: #f2f3f7;
}
</style>
