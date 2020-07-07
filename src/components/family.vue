<template>
  <div class="box xiongmao003">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">家庭用户信息</p>
    </div>

    <ul class="select xiugai">
      <li>
        <i>姓名</i>
        <input type="text" class="input" placeholder="请输入姓名" v-model="name" />
      </li>
      <li>
        <i>性别</i>
        <mt-radio v-model="sex" :options="['男', '女']"></mt-radio>
      </li>
    </ul>
    <ul class="select mb xiugai">
      <li>
        <i>手机号</i>
        <p>{{this.$store.state.letter.user.phone}}</p>
        <!-- <u></u> -->
      </li>
    </ul>
    <ul class="select mb xiugai">
      <li>
        <i>地址</i>
        <input type="text" class="input" placeholder="请输入地址" v-model="address" />
      </li>
    </ul>
    <ul class="select">
      <li @click="xuanzhe(0)">
        <i>产品线</i>
        <p>{{ this.$store.state.letter.history.productLine}}</p>
        <u></u>
      </li>
      <li @click="xuanzhe(1)">
        <i>产品型号</i>
        <p>{{this.$store.state.letter.history.model}}</p>
        <u></u>
      </li>
      <li class="rb" @click="xuanzhe(2)">
        <i>购买日期</i>
        <p>{{this.$store.state.letter.history.buy_date}}</p>
      </li>
    </ul>

    <div class="sendbtn mt" @click="tohome">提交</div>
    <!-- 产品线 -->
    <div class="model" v-show="bool">
      <div class="bg_yanse"></div>
      <div class="slots_list" :class="{demo_transform3:!bool,demo_transform4:bool}">
        <h2>产品线</h2>
        <span @click="quxiao(0)" class="span1">取消</span>
        <span @click="queding(0)">确定</span>
        <mt-picker :slots="productLinecont" @change="onValuesChange"></mt-picker>
      </div>
    </div>
    <!-- 型号 -->
    <div class="model" v-show="bool1">
      <div class="bg_yanse"></div>
      <div class="slots_list" :class="{demo_transform3:!bool,demo_transform4:bool}">
        <h2>型号</h2>
        <span @click="quxiao(1)" class="span1">取消</span>
        <span @click="queding(1)">确定</span>
        <mt-picker :slots="slots" @change="onValuesChange1"></mt-picker>
      </div>
    </div>

    <!-- 时间 -->
    <div class="model" v-show="bool2">
      <div class="bg_yanse"></div>
      <div class="slots_list" :class="{demo_transform3:!bool,demo_transform4:bool}">
        <h2>购买时间</h2>
        <!-- <span @click="queding(2)">确定</span> -->
        <!-- <mt-picker :slots="time" @change="onValuesChange2"></mt-picker> -->
        <mt-datetime-picker
          v-show="bool2"
          type="date"
          ref="picker1"
          cancelText="取消"
          confirmText="确定"
          year-format="{value}"
          month-format="{value}"
          date-format="{value}"
          @cancel="quxiao(2)"
          @confirm="handleConfirm1"
        ></mt-datetime-picker>
      </div>
    </div>
  </div>
</template>

<script>
import baseUrl from "../api/baseUrl.js";
import Cookie from "../api/cookie.js";
import { Toast } from "mint-ui";

var _this;
export default {
  name: "repair",
  data() {
    return {
      usernnm: "",
      title: "",
      sex: "",
      name: "",
      address: "",
      timedetale: "",
      is_ajax: false,
      bool: false,
      bool1: false,
      bool2: false,
      values: "",
      values1: "",
      values2: "",

      productLine: [],
      //产品线
      productLinecont: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        }
      ],

      //型号
      slotsLine: [],
      slots: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        }
      ]
    };
  },
  created() {
    _this = this;

    //产品线
    this.$Axios
      .post(baseUrl + "/dicCode/queryDicByMoreType?type=PRODUCT_LINE")
      .then(function(response) {
        //重复点击

        _this.productLine = response.data.data;
        if (response.data.msg == "成功查询信息") {
          for (let num = 0; num <= response.data.data.length - 1; num++) {
            _this.productLinecont[0].values.push(response.data.data[num].lable);
          }
        }
      })
      .catch(function(error) {});

    //型号
    this.$Axios
      .post(baseUrl + "/dicCode/queryDicByMoreType?type=EQUI_MODEL")
      .then(function(response) {
        //重复点击
        _this.slotsLine = response.data.data;
        if (response.data.msg == "成功查询信息") {
          for (let num = 0; num <= response.data.data.length - 1; num++) {
            _this.slots[0].values.push(response.data.data[num].lable);
          }
        }
      })
      .catch(function() {});
  },
  watch: {
    sex() {
      if (this.sex == "男") {
        this.$store.commit("setsex", "0");
      } else {
        this.$store.commit("setsex", "1");
      }
    },
    name() {
      this.$store.commit("setName", this.name);
    },
    address() {
      this.$store.commit("setaddress", this.address);
    }
  },

  methods: {
    //返回上一页
    toback() {
      this.$router.push({
        path: "/userlogin?id=3"
      });
    },
    dictionary(id) {
      this.$Axios
        .post(baseUrl + "/dicCode/queryDicTwoByType", { parentId: id })
        .then(function(response) {
          //重复点击
          // _this.is_ajax = false;
          _this.slots[0].values = [];
          if (response.data.msg == "成功查询信息") {
            for (let num = 0; num <= response.data.data.length - 1; num++) {
              _this.slots[0].values.push(response.data.data[num].lable);
            }
          }
        })
        .catch(function() {
          // _this.is_ajax = false;
        });
    },

    tohome() {
      if (_this.is_ajax) {
        Toast({
          message: "提交中，请勿重复提交",
          duration: 1000
        });
        return;
      }

      if (this.$store.state.letter.user.name === "") {
        Toast("请核对输入的姓名");
        return;
      }
      if (this.$store.state.letter.user.sex === "") {
        Toast("请核对输入的性别");
        return;
      }
      if (this.$store.state.letter.history.personaladdress === undefined) {
        Toast("请核对输入的地址");
        return;
      }
      if (this.$store.state.letter.history.productLine_id === "") {
        Toast("请核对选择的产品线");
        return;
      }
      if (this.$store.state.letter.history.model_id === "") {
        Toast("请核对选择的型号");
        return;
      }
      if (this.$store.state.letter.history.buy_date === "") {
        Toast("请核对选择的购买时间");
        return;
      }

      var hospitalType = "";
      if (Cookie.getCookie("avatar") == 0) {
        hospitalType = "0";
      } else if (Cookie.getCookie("avatar") == 3) {
        hospitalType = "1";
      }

      var datelist = {
        name: this.$store.state.letter.user.name,
        sex: this.$store.state.letter.user.sex,
        phone: this.$store.state.letter.user.phone,
        address: this.$store.state.letter.history.personaladdress,
        productLine: this.$store.state.letter.history.productLine_id,
        model: this.$store.state.letter.history.model_id,
        buyDate: this.$store.state.letter.history.buy_date,
        userType: Cookie.getCookie("userType"),
        hospitalType: hospitalType
      };

      _this.is_ajax = true;

      this.$Axios
        .post(baseUrl + "/admin/isExist", {
          phone: this.$store.state.letter.user.phone,
          userType: "0", //医院  =   0     渠道  ==  1
          hospitalType: "1" // 医院   == 0     家庭 == 1
        })
        .then(function(response) {
          if (response.data.code == 200) {
            _this.$Axios
              .post(baseUrl + "/admin/registerHospital", datelist)
              .then(function(response) {
                //重复点击
                _this.is_ajax = false;

                if (response.data.msg == "注册成功") {
                  _this.$store.commit("setCookie", response.data.data.result);
                  _this.$store.commit("settoken", response.data.data.token);

                  _this.$store.state.letter.user.user_id =
                    response.data.data.result.userId;
                  window.localStorage.removeItem("CodeTime");
                  _this.$router.push({
                    path: "/custser"
                  });
                }
              })
              .catch(function() {
                _this.is_ajax = false;
              });
          } else {
            _this.is_ajax = false;
            Toast({
              message: "当前手机号已被注册过了",
              duration: 1000
            });
          }
          //重复点击
        })
        .catch(function() {
          _this.is_ajax = false;
        });

      // return;
    },

    onValuesChange(picker, values) {
      this.values = values;
    },
    //弹框
    onValuesChange1(picker, values) {
      this.values1 = values;
    },
    //时间 弹框
    onValuesChange2(picker, values) {
      this.values2 = values;
    },
    xuanzhe(n) {
      if (n == 0) {
        this.bool = true;
      } else if (n == 1) {
        this.bool1 = true;
      } else if (n == 2) {
        this.bool2 = true;
      }
    },
    queding(n) {
      if (n == 0) {
        for (let numi = 0; numi <= this.productLine.length - 1; numi++) {
          if (this.values == this.productLine[numi].lable) {
            this.$store.commit("setproductLine", {
              productLine: this.productLine[numi].lable,
              productLine_id: this.productLine[numi].value
            });
            this.dictionary(this.productLine[numi].id);
          }
        }
        this.$store.state.letter.history.model = "";
      } else if (n == 1) {
        for (let numi = 0; numi <= this.slotsLine.length - 1; numi++) {
          if (this.values1 == this.slotsLine[numi].lable) {
            this.$store.commit("setmodelid", {
              model: this.slotsLine[numi].lable,
              model_id: this.slotsLine[numi].value
            });
          }
        }
      } else if (n == 2) {
        this.$store.commit(
          "setbuyDate",
          this.values2[0] + "-" + this.values2[1] + "-" + this.values2[2]
        );
      }

      this.bool = false;
      this.bool1 = false;
      this.bool2 = false;
    },
    //弹框

    dateClick1() {
      this.$refs.picker1.open();
    },
    quxiao(n) {
      if (n == 0) {
        this.bool = false;
      } else if (n == 1) {
        this.bool1 = false;
      } else if (n == 2) {
        this.bool2 = false;
      }
    },

    p(s) {
      return s < 10 ? "0" + s : s;
    },

    handleConfirm1(value) {
      let currentTime = new Date().getTime();
      let ClickTime = new Date(value).getTime();
      let d = new Date(value);
      let resDate =
        d.getFullYear() +
        "-" +
        this.p(d.getMonth() + 1) +
        "-" +
        this.p(d.getDate()); //年月日

      if (currentTime < ClickTime) {
        Toast({
          message: "购买不能大于当前时间",
          duration: 1000
        });
        this.bool2 = !this.bool2;
        return;
      } else {
        this.$store.commit("setbuyDate", resDate);
      }
      this.bool2 = !this.bool2;
    }
    //没有填写信息  退出 userlogin   提示
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/userlogin") {
      this.$confirm("注册尚未完成是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          next();
        })
        .catch(() => {
          next(false);
        });
    } else {
      next();
    }
  }
};
</script>
<style>

.xiongmao003 .mint-cell {
  margin-top: 0.08rem;
  width: 1.8rem;
  float: left;
  border: none;
  background-image: none;
}
.xiongmao003 .mint-cell-wrapper {
  background-image: none;
  padding-right: 0;
}

.xiongmao003 .mint-datetime-action {
  display: inline-block;
  width: 50%;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  color: #26a2ff;
}

.xiongmao003 .mint-radio-input:checked + .mint-radio-core::after {
  background-color: #998bd6;
  transform: scale(2.5);
}
.xiongmao003 .mint-radio-input:checked + .mint-radio-core {
  border-color: #998bd6;
  background-color: #fff;
}
.xiongmao003 .mint-radio-core {
  transform: scale(0.8);
}
.xiongmao003 .mint-cell:last-child {
  background-image: none;
}
</style>


<style scoped>
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
  font-size: 0.34rem;
  color: #26a2ff;
  position: absolute;
  top: 0.3rem;
  right: 0;
}
.slots_list .span1 {
  left: 0;
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

.select {
  width: 7.5rem;
  height: auto;
  border-top: 0.01rem #eaeaea solid;
  border-bottom: 0.01rem #eaeaea solid;
  background: #fff;
}
.select li {
  height: 1.16rem;
  width: 7.5rem;
  position: relative;
}
.select li p {
  height: 1.16rem;
  width: 4.35rem;
  border-bottom: 0.01rem #eaeaea solid;
  font-size: 0.28rem;
  line-height: 1.16rem;
  text-align: left;
  margin-left: 0.58rem;
  float: left;
}

.select li .input {
  width: 3.95rem;
  height: 0.32rem;
  border: 0.01rem #c5c5c5 solid;
  font-size: 0.25rem;
  line-height: 0.32rem;
  float: left;
  margin: 0.2rem 0 0 0.58rem;
  padding: 0.2rem 0.2rem;
}

.select li i {
  display: block;
  width: 2rem;
  height: 1.16rem;
  font-size: 0.28rem;
  line-height: 1.16rem;
  float: left;
  font-style: normal;
  text-align: right;
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
.mb {
  margin: 0.16rem 0;
}

.xiugai li p {
  width: 3.95rem;
}
.mt {
  margin: 2rem 0 1rem 0.35rem;
}
</style>

