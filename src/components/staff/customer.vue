<template>
  <div class="box">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">客户管理</p>
    </div>
    <div class="main">
      <div class="grabble">
        <input type="text" placeholder="请输入客户名称" v-model="pagelist.customerName" />
        <i @click="search">
          <u></u>
        </i>
        <span @click="xuanzhe(0)"></span>
      </div>
      <div class="anniu">
        <i>医院</i>
        <i>省份</i>
        <i>联系人</i>
      </div>
    </div>
    <ul
      class="list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <li
        :class="{ac:index%2==0}"
        v-for="(itme,index) in user_list"
        @click="tostaffdetail(itme.id)"
        :key="index"
      >
        <p class="wg">{{itme.customerName}}</p>
        <p>{{itme.province}}</p>
        <p>{{itme.contacts}}</p>
      </li>
    </ul>
    <div class="model" v-show="bool1">
      <div class="bg_yanse"></div>
      <div class="slots_list" :class="{demo_transform3:!bool1,demo_transform4:bool1}">
        <div class="main">
          <h2>
            <span class="tankuangqx1" @click="tankuangqx('quxiao')">取消</span>
            时间段查询
            <span class="tankuangqx" @click="tankuangqx('chaxun')">查询</span>
          </h2>
          <p @click="kaishiriqi()">
            开始日期：{{pagelist.createDateBegin}}
            <i></i>
          </p>
          <p @click="jieshuriqi()">
            结束日期：{{pagelist.createDateEnd}}
            <i></i>
          </p>
        </div>
      </div>
    </div>

    <div class="model" v-show="bool">
      <div class="bg_yanse"></div>
      <div class="slots_list" :class="{demo_transform3:!bool,demo_transform4:bool}">
        <h2>选择筛选时间</h2>
        <mt-datetime-picker
          v-show="bool"
          v-model="datetime"
          type="date"
          ref="picker1"
          cancelText="取消"
          confirmText="确定"
          year-format="{value}"
          month-format="{value}"
          date-format="{value}"
          @cancel="quxiao"
          @confirm="handleConfirm1"
        ></mt-datetime-picker>
      </div>
    </div>
  </div>
</template>

<script>
import baseUrl from "../../api/baseUrl.js";
import { Toast, Indicator } from "mint-ui";
import Cookie from "../../api/cookie.js";
var _this;
export default {
  data() {
    return {
      src1: "../assets/code.png",
      user_list: [],
      bool: false,
      bool1: false,
      time: "",
      city: [],
      PROVINCE: [],
      diqu: "",
      page: 2,
      rows: 15,
      total: 0,
      datetime: "",
      createDateBegin: "2019-08-01",
      createDateEnd: "2019-08-01",
      numid: 0,
      boolershow: false,
      pagelist: {
        userType: "",
        province: Cookie.getCookie("repaiProvince"),
        customerName: "",
        receptionDate: "",
        page: 2,
        rows: 15,
        total: 0,
        createDateBegin: "",
        createDateEnd: ""
      }
    };
  },
  created() {
    _this = this;
    //地区查询
    this.$Axios
      .post(baseUrl + "/dicCode/queryDicByMoreType?type=CITY,PROVINCE")
      .then(function(response) {
        if (response.data.code == 200) {
          // _this.city = response.data.data;
          for (let num = 0; num <= response.data.data.length - 1; num++) {
            if (response.data.data[num].type == "CITY") {
              _this.city.push(response.data.data[num]);
            }
            if (response.data.data[num].type == "PROVINCE") {
              _this.PROVINCE.push(response.data.data[num]);
            }
          }
          _this.list();
        }
      })
      .catch(function() {

        Toast({
          message: "网络开小差了，请稍后重试",
          duration: 1000
        });
      });

    // let nowYear = new Date().getFullYear().toString();
    // let nowMonth = (new Date().getMonth() + 1).toString();
    // let nowDay = new Date().getDate().toString();

    // this.pagelist.createDateBegin = nowYear + "-" + nowMonth + "-" + nowDay;
    // this.pagelist.createDateEnd = nowYear + "-" + nowMonth + "-" + nowDay;
  },
  watch: {
    // diqu() {
    //   this.list({ listname: this.diqu, listdate: "" }, "查询");
    // }
  },
  methods: {
    //下滑加载
    loadMore() {
      if (this.boolershow) {
        if (
          Math.ceil(this.pagelist.total / this.pagelist.rows) >
          this.pagelist.page
        ) {
          this.pagelist.page = this.pagelist.page + 1;
        } else {
          Toast({
            message: "数据已经加载完毕",
            duration: 1000
          });
          this.boolershow = false;
          return;
        }

        this.$Axios
          .post(
            baseUrl + "/customerAdmin/queryAdminCustomerList",
            this.pagelist
          )
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
            if (response.data.code == 200) {
              _this.pagelist.total = response.data.data.total;
              for (
                let citylist = 0;
                citylist <= response.data.data.list.length - 1;
                citylist++
              ) {
                for (
                  let citynum = 0;
                  citynum <= _this.PROVINCE.length - 1;
                  citynum++
                ) {
                  if (
                    _this.PROVINCE[citynum].value ==
                    response.data.data.list[citylist].province
                  ) {
                    response.data.data.list[citylist].province =
                      _this.PROVINCE[citynum].lable;
                  }
                }
                _this.user_list.push(response.data.data.list[citylist]);
              }
            }
          })
          .catch(function() {
            Toast({
              message: "网络开小差了，请稍后重试",
              duration: 1000
            });
          });
      }
    },

    //列表查询
    list() {
      Indicator.open({
        text: "加载中，请稍后",
        spinnerType: "fading-circle"
      });

      this.$Axios
        .post(baseUrl + "/customerAdmin/queryAdminCustomerList", this.pagelist)
        .then(function(response) {
         
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
            let arr = Object.keys(response.data.data.list);
            //空
            if (arr.length == 0) {
              _this.user_list = [];
              Toast({
                message: "未查询到客户",
                duration: 1000
              });
              return;
            } else {
              _this.pagelist.total = response.data.data.total;

              for (
                let citynum = 0;
                citynum <= _this.PROVINCE.length - 1;
                citynum++
              ) {
                for (
                  let citylist = 0;
                  citylist <= response.data.data.list.length - 1;
                  citylist++
                ) {
                  if (
                    _this.PROVINCE[citynum].value ==
                    response.data.data.list[citylist].province
                  ) {
                    response.data.data.list[citylist].province =
                      _this.PROVINCE[citynum].lable;
                  }
                }
              }
              _this.user_list = response.data.data.list;
              _this.boolershow = true;
            }
          }
        })
        .catch(function() {
          Indicator.close();
          Toast({
            message: "网络开小差了，请稍后重试",
            duration: 1000
          });
        });
    },

    toback() {
      this.$router.go(-1);
    },
    tostaffdetail(n) {
      this.$router.push({
        path: "/customerlist",
        query: { id: n }
      });
      // this.$router.push({
      //   path: "/staffdetail",
      //   query: { id: n }
      // });
    },
    //弹框
    onValuesChange(picker, values) {
      this.values = values[0] + "-" + values[1] + "-" + values[2];
    },
    search() {
      this.pagelist.page = 1;
      this.list();
    },
    xuanzhe() {
      this.pagelist.createDateBegin = "";
      this.pagelist.createDateEnd = "";
      this.bool1 = !this.bool1;
      // document.body.style.overflow = "hidden";

      var scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      document.body.style.cssText += "position:fixed;top:-" + scrollTop + "px;";
    },
    queding() {
      if (this.values) {
        this.list({ listname: "", listdate: this.values }, "查询");
      }
      this.bool = !this.bool;
    },
    //弹框
    tiaozhuan() {
      this.$router.push({
        path: "/customerAdd"
      });
    },

    dateClick1() {
      this.$refs.picker1.open();
    },
    quxiao() {
      this.bool = !this.bool;
    },
    tankuangqx(n) {
      if (n == "quxiao") {
        this.bool = false;
        this.bool1 = false;
        this.pagelist.createDateBegin = "";
        this.pagelist.createDateEnd = "";
      } else if (n == "chaxun") {
        this.bool = false;
        this.bool1 = false;
        this.list();
      }
      // document.body.style.overflow = "inherit";

      var body = document.body;
      body.style.position = "static";
      var top = body.style.top;
      document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
        top
      );
      body.style.top = "";
    },

    kaishiriqi() {
      this.bool = !this.bool;
      this.numid = 0;
      this.datetime = this.pagelist.createDateBegin;
      // document.body.style.overflow = "hidden";
    },

    jieshuriqi() {
      this.bool = !this.bool;
      this.numid = 1;
      this.datetime = this.pagelist.createDateEnd;
      // document.body.style.overflow = "hidden";
    },

    p(s) {
      return s < 10 ? "0" + s : s;
    },

    handleConfirm1(value) {
      let d = new Date(value);
      let resDate =
        d.getFullYear() +
        "-" +
        this.p(d.getMonth() + 1) +
        "-" +
        this.p(d.getDate()); //年月日

      if (this.numid == 0) {
        this.pagelist.createDateBegin = resDate;
      } else if (this.numid == 1) {
        this.pagelist.createDateEnd = resDate;
      }

      this.bool = !this.bool;
    }
  },
  beforeRouteLeave(to, from, next) {
    // document.body.style.overflow = "inherit";
    var body = document.body;
      body.style.position = "static";
      var top = body.style.top;
      document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
        top
      );
      body.style.top = "";
    next();
  }
};
</script>
<style scoped>
.box {
  position: relative;
}
.model {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 7.5rem;
  height: 100%;
  z-index: 9999;
}
.bg_yanse {
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.5;
}

.slots_list {
  width: 7.5rem;
  background: #fff;
  text-align: center;
  position: fixed;
  bottom: 4rem;
  left: 0;
}
.slots_list h2 {
  font-size: 0.4rem;
  line-height: 1rem;
  height: 1rem;
  font-weight: 500;
}
.slots_list span {
  width: 1.5rem;
  height: 0.4rem;
  font-size: 0.3rem;
  position: absolute;
  top: 0.3rem;
  right: 0;
}

.demo_transform3 {
  animation: zhankai 0.3s ease-in both;
}
.demo_transform4 {
  animation: shouqi 0.3s ease-in both;
}

.picker-slot.picker-slot-right {
  text-align: center;
}

@keyframes shouqi {
  0% {
    transform: translate(0, 9rem);
  }
  100% {
    transform: translate(0, 4rem);
  }
}
@keyframes zhankai {
  0% {
    transform: translate(0, 9rem);
  }
  100% {
    transform: translate(0, 4rem);
  }
}

.slots_list .main {
  width: 7.5rem;
  height: 4rem;
  margin: 0;
}
.slots_list .main p {
  height: 0.8rem;
  font-size: 0.32rem;
  text-align: left;
  line-height: 0.8rem;
  width: 6.6rem;
  margin: 0 0.25rem 0.5rem;
  border: 1px solid #ccc;
  padding: 0 0.2rem;
}
.slots_list .main h2 {
  position: relative;
}
.slots_list .main h2 .tankuangqx {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 0.32rem;
  height: 1rem;
  line-height: 1rem;
  color: aqua;
}
.slots_list .main h2 .tankuangqx1 {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 0.32rem;
  height: 1rem;
  line-height: 1rem;
  color: aqua;
}

.main {
  margin: 0 0.34rem;
}
.grabble {
  width: 100%;
  margin: 0.16rem 0;
  height: 0.96rem;
}
.grabble input {
  width: 4.55rem;
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
  width: 0.59rem;
  height: 0.58rem;
  float: left;
  margin: 0.23rem 0 0 0.46rem;
  background: url("../../assets/staff_icon05.png") no-repeat;
  background-size: 100% 100%;
}

.grabble .ac {
  background: url("../../assets/icon_plus_ac.png") no-repeat;
  background-size: 100% 100%;
}

.anniu {
  width: 6.8rem;
  margin: 0.4rem 0;
  height: 0.63rem;
}

.anniu i {
  display: inline-block;
  width: 1.5rem;
  height: 0.63rem;
  font-size: 0.28rem;
  line-height: 0.63rem;
  text-align: center;
  vertical-align: top;
  margin-left: 0.7rem;
}
.anniu .ac {
  background: #dcdcdc;
}

.list li {
  font-size: 0.28rem;
  height: 0.97rem;
  width: 7.5rem;
  line-height: 0.97rem;
  background: #fff;
}
.list li h3 {
  display: inline-block;
  vertical-align: top;
  width: 2rem;
  font-weight: 500;
}
.list li p {
  width: 1.38rem;
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  margin-left: 0.5rem;
}
.list .wg {
  width: 2.7rem;
}
.list .ac {
  background: #f2f3f7;
}
</style>

