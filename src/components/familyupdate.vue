<template>
  <div class="box xiongmao15">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">家庭用户信息</p>
    </div>

    <ul class="select xiugai">
      <li>
        <i>姓名</i>
        <input type="text" class="input" placeholder="请输入姓名" v-model="name">
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
        <input type="text" class="input" placeholder="请输入地址" v-model="address">
      </li>
    </ul>

    <ul class="select">
      <li @click="xuanzhe(0)">
        <i>产品线</i>
        <p>{{this.$store.state.letter.history.productLine}}</p>
        <u></u>
      </li>
      <li @click="xuanzhe(1)">
        <i>产品型号</i>
        <p>{{this.$store.state.letter.history.model}}</p>
        <u></u>
      </li>
      <li class="rb" @click="xuanzhe(2)">
        <i>购买日期</i>
        <p>{{this.$store.state.letter.history.buy_date.substring(0,10)}}</p>
        <u></u>
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
import cookie from "../api/cookie.js";
import { Toast, MessageBox } from "mint-ui";

var _this;
export default {
  name: "repair",
  data() {
    return {
      usetType: "0",
      sex: "",
      name: "",
      address: "",

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

    if (cookie.getCookie("sex") == 0) {
      this.sex = "男";
    } else {
      this.sex = "女";
    }
    this.name = cookie.getCookie("name");
    this.address = cookie.getCookie("personaladdress");

    //产品线
    this.$Axios
      .post(baseUrl + "/dicCode/queryDicByMoreType?type=PRODUCT_LINE")
      .then(function(response) {
        //重复点击
        if (response.data.code == 200) {
          _this.productLine = response.data.data;

          for (let num = 0; num <= response.data.data.length - 1; num++) {
            _this.productLinecont[0].values.push(response.data.data[num].lable);

            if (
              response.data.data[num].value ==
              cookie.getCookie("productLine_id")
            ) {
              _this.dictionary(response.data.data[num].id);
            }
          }
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
    //返回上一页
    toback() {
      this.$router.push({
        path: "/custser"
      });
    },

    dictionary(id) {
      this.$Axios
        .post(baseUrl + "/dicCode/queryDicTwoByType", { parentId: id })
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

          if (response.data.code == 200) {
            _this.slotsLine = response.data.data;
            _this.slots[0].values = [];
            for (let num = 0; num <= response.data.data.length - 1; num++) {
              _this.slots[0].values.push(response.data.data[num].lable);
            }
          }
        })
        .catch(function(error) {
          Toast({
            message: "网络开小差，请稍后重试",
            duration: 1000
          });
        });
    },

    tohome() {
      if (this.name === "") {
        Toast({
          message: "请核对输入的姓名",
          duration: 1000
        });
        return;
      }
      if (this.address === "") {
        Toast({
          message: "请核对输入的地址",
          duration: 1000
        });
        return;
      }
      if (this.$store.state.letter.history.model == "") {
        Toast({
          message: "请核对输入的地址",
          duration: 1000
        });
        return;
      }

      var sex_id = "";
      if (this.sex == "男") {
        sex_id = 0;
      } else {
        sex_id = 1;
      }
      var zhuanhuan = {
        userId: this.$store.state.letter.user.user_id,
        name: this.name,
        sex: sex_id,
        phone: this.$store.state.letter.user.phone,
        address: this.address,
        productLine: this.$store.state.letter.history.productLine_id,
        model: this.$store.state.letter.history.model_id,
        buyDate: this.$store.state.letter.history.buy_date.substring(0, 10)
      };

      // return;
      this.$Axios
        .post(baseUrl + "/hospital/updHospitalInfoById", zhuanhuan)
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
          if (response.data.code == 200) {
            Toast({
              message: "成功修改信息",
              duration: 1000
            });
            _this.$store.commit("setsex", sex_id);
            _this.$store.commit("setName", _this.name);
            _this.$store.commit("setCookie", zhuanhuan);
            _this.$router.replace({
              path: "/custser"
            });
          }
        })
        .catch(function(error) {
          Toast({
            message: "网络开小差，请稍后重试",
            duration: 1000
          });
        });
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
  }
};
</script>
<style>
.xiongmao15 .mint-cell {
  margin-top: 0.08rem;
  width: 1.8rem;
  float: left;
  border: none;
  background-image: none;
}
.xiongmao15 .mint-cell-wrapper {
  background-image: none;
  padding-right: 0;
}

.xiongmao15 .mint-radio-input:checked + .mint-radio-core::after {
  background-color: #998bd6;
  transform: scale(2.5);
}

.xiongmao15 .mint-radio-input:checked + .mint-radio-core {
  border-color: #998bd6;
  background-color: #fff;
  transform: scale(0.8);
}
.xiongmao15 .mint-radio-core {
  transform: scale(0.8);
}
.xiongmao15 .mint-cell:last-child {
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

